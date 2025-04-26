import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

export function useExpenses() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      if (!auth.currentUser) {
        setExpenses([]);
        setLoading(false);
        return;
      }
      const q = query(
        collection(db, `users/${auth.currentUser.uid}/transactions`),
        where('type', '==', '지출'),
        orderBy('date', 'desc')
      );
      const snap = await getDocs(q);
      setExpenses(snap.docs.map((doc) => doc.data()));
      setLoading(false);
    };
    fetch();
  }, [auth.currentUser]);

  return { expenses, loading };
}
