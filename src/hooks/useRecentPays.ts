import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore';

export interface PayItem {
  category: string;
  amount: number;
  color: string;
}

export function useRecentPays(count: number = 5) {
  const [pays, setPays] = useState<PayItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      if (!auth.currentUser) return;
      const q = query(
        collection(db, `users/${auth.currentUser.uid}/transactions`),
        where('type', '==', '지출'),
        orderBy('date', 'desc'),
        limit(count)
      );
      const snap = await getDocs(q);
      const colorMap: Record<string, string> = {
        식비: '#58C86D',
        쇼핑: '#5C71D6',
        교통: '#F4A259',
      };
      const pays = snap.docs.map((doc) => {
        const d = doc.data();
        return {
          category: d.category,
          amount: d.amount,
          color: colorMap[d.category] || '#d1d5db',
        };
      });
      setPays(pays);
      setTotal(pays.reduce((sum, item) => sum + item.amount, 0));
      setLoading(false);
    };
    fetch();
  }, [count]);

  return { pays, total, loading };
}
