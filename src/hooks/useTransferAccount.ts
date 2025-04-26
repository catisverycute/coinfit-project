import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

interface TransferAccount {
  toAccount: string;
  toName: string;
  bank: string;
}

export const useTransferAccount = (limitCount = 10) => {
  const [transferAccounts, setTransferAccounts] = useState<TransferAccount[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      if (!auth.currentUser) {
        setTransferAccounts([]);
        setLoading(false);
        return;
      }
      const q = query(
        collection(db, `users/${auth.currentUser.uid}/transactions`),
        orderBy('date', 'desc'),
        limit(limitCount)
      );
      const snap = await getDocs(q);

      const seen = new Set();
      const recents: TransferAccount[] = [];
      snap.docs.forEach((doc) => {
        const tx = doc.data();
        if (tx.toAccount && !seen.has(tx.toAccount)) {
          seen.add(tx.toAccount);
          recents.push({
            toAccount: tx.toAccount,
            toName: tx.toName || '',
            bank: tx.bank || '',
          });
        }
      });
      setTransferAccounts(recents);
      setLoading(false);
    };
    fetchAccounts();
  }, [auth.currentUser, limitCount]);

  return { transferAccounts, loading };
};
