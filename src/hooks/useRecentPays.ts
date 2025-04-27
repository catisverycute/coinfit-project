import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore';

export interface PayItem {
  category: string;
  amount: number;
  color: string;
}

export function useRecentPays() {
  const [pays, setPays] = useState<PayItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, `users/${auth.currentUser.uid}/transactions`),
      where('type', '==', '지출'),
      orderBy('date', 'desc'),
      limit(3)
    );

    const colorMap: Record<string, string> = {
      식비: '#58C86D',
      쇼핑: '#5C71D6',
      교통: '#F4A259',
    };

    const unsub = onSnapshot(q, (snap) => {
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
    });

    return () => unsub();
  }, []);

  return { pays, total, loading };
}
