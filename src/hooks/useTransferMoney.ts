import { useState } from 'react';
import {
  doc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
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

  const findReceiverAccount = async (bank: string, accountNumber: string) => {
    const usersSnap = await getDocs(collection(db, 'users'));
    for (const userDoc of usersSnap.docs) {
      const accountsSnap = await getDocs(
        collection(db, `users/${userDoc.id}/accounts`)
      );
      for (const accDoc of accountsSnap.docs) {
        const accData = accDoc.data();
        if (accData.bank === bank && accData.accountNumber === accountNumber) {
          return {
            userId: userDoc.id,
            accountId: accDoc.id,
            balance: Number(accData.balance ?? 0),
            ownerName: userDoc.data().name ?? '',
          };
        }
      }
    }
    return null;
  };

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
      const fromBalance = Number(fromAccountData?.balance ?? 0);
      const sendAmount = Number(amount);

      if (!fromAccountData) {
        setError('출금 계좌 정보를 찾을 수 없습니다.');
        setLoading(false);
        return false;
      }
      if (fromBalance < sendAmount) {
        setError('계좌 잔액이 부족합니다.');
        setLoading(false);
        return false;
      }
      await updateDoc(fromAccountRef, {
        balance: fromBalance - sendAmount,
      });

      const receiver = await findReceiverAccount(bank, toAccount);
      if (!receiver) {
        setError('수신자 계좌를 찾을 수 없습니다.');
        setLoading(false);
        return false;
      }
      const receiverRef = doc(
        db,
        `users/${receiver.userId}/accounts`,
        receiver.accountId
      );
      await updateDoc(receiverRef, {
        balance: Number(receiver.balance ?? 0) + sendAmount,
      });

      await addDoc(collection(db, `users/${user.uid}/transactions`), {
        type: '송금',
        fromAccount,
        toAccount,
        toName,
        amount: sendAmount,
        date: serverTimestamp(),
        description: memo,
        bank,
      });

      await addDoc(collection(db, `users/${receiver.userId}/transactions`), {
        type: '입금',
        fromAccount,
        toAccount,
        fromName:
          fromAccountData.ownerName || user.displayName || user.email || '',
        amount: sendAmount,
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
