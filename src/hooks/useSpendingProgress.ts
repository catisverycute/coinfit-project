import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

export function useSpendingProgress() {
  const [goal, setGoal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const fetch = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const budgetRef = doc(db, `users/${user.uid}/settings/budget`);
      const budgetSnap = await getDoc(budgetRef);
      const budgetData = budgetSnap.data();
      setGoal(budgetData?.amount || 0);

      const now = new Date();
      const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

      const q = query(
        collection(db, `users/${user.uid}/transactions`),
        where('type', '==', '지출')
      );
      const snap = await getDocs(q);
      let sum = 0;
      snap.forEach((doc) => {
        const d = doc.data();
        if (d.date?.toDate) {
          const date = d.date.toDate();
          const ym = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          if (ym === month) sum += d.amount || 0;
        }
      });
      setCurrent(sum);
    };
    fetch();
  }, []);

  return { current, goal };
}
