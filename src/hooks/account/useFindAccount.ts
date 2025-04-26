import { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

interface AccountOwnerResult {
  ownerId: string;
  ownerName: string;
  bank: string;
  accountNumber: string;
}

export const useFindAccount = () => {
  const [loading, setLoading] = useState(false);
  const [owner, setOwner] = useState<AccountOwnerResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const findAccount = async (bank: string, accountNumber: string) => {
    setLoading(true);
    setError(null);
    setOwner(null);
    try {
      const usersSnap = await getDocs(collection(db, 'users'));
      for (const userDoc of usersSnap.docs) {
        const accountsSnap = await getDocs(
          collection(db, `users/${userDoc.id}/accounts`)
        );
        for (const accDoc of accountsSnap.docs) {
          const accData = accDoc.data();
          if (
            accData.bank === bank &&
            accData.accountNumber === accountNumber
          ) {
            setOwner({
              ownerId: userDoc.id,
              ownerName: userDoc.data().name,
              bank: accData.bank,
              accountNumber: accData.accountNumber,
            });
            setLoading(false);
            return;
          }
        }
      }
      setError('일치하는 계좌가 없습니다.');
      setLoading(false);
    } catch (err: any) {
      setError('검색 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  return { owner, loading, error, findAccount };
};

export const useFindMainAccount = () => {
  const [mainAccount, setMainAccount] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const findMainAccount = async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const q = query(
        collection(db, `users/${userId}/accounts`),
        where('isMain', '==', true)
      );
      const snap = await getDocs(q);
      if (snap.empty) {
        setMainAccount(null);
        setError('메인 계좌가 없습니다.');
      } else {
        setMainAccount({ id: snap.docs[0].id, ...snap.docs[0].data() });
      }
      setLoading(false);
    } catch (err: any) {
      setError('메인 계좌 검색 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  return { mainAccount, loading, error, findMainAccount };
};
