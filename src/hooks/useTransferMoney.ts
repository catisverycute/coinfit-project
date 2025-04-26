import { useState } from 'react';
import {
  doc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

interface TransferOptions {
  fromAccount: string;
  toAccount: string;
  toName: string;
  bank: string;
  amount: number;
  memo?: string;
}

export function useTransferMoney() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const transfer = async ({
    fromAccount,
    toAccount,
    toName,
    bank,
    amount,
    memo = '',
  }: TransferOptions) => {
    setError('');
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        setError('로그인이 필요합니다.');
        setLoading(false);
        return false;
      }
      const fromAccountRef = doc(db, `users/${user.uid}/accounts`, fromAccount);
      const fromAccountSnap = await getDoc(fromAccountRef);
      const fromAccountData = fromAccountSnap.data();
      if (!fromAccountData) {
        setError('출금 계좌 정보를 찾을 수 없습니다.');
        setLoading(false);
        return false;
      }
      if (fromAccountData.balance < amount) {
        setError('계좌 잔액이 부족합니다.');
        setLoading(false);
        return false;
      }
      await updateDoc(fromAccountRef, {
        balance: fromAccountData.balance - amount,
      });
      await addDoc(collection(db, `users/${user.uid}/transactions`), {
        type: '송금',
        fromAccount,
        toAccount,
        toName,
        amount,
        date: serverTimestamp(),
        description: memo,
        bank,
      });
      setLoading(false);
      return true;
    } catch (e: any) {
      setError('송금 처리 중 오류가 발생했습니다.');
      setLoading(false);
      return false;
    }
  };

  return { transfer, error, loading };
}
