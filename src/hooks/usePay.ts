import { useEffect, useState } from 'react';
import { setDoc, doc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';

export function usePay() {
  const addPay = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error('로그인 필요');

    await setDoc(doc(db, `users/${user.uid}/accounts/moneyfitpay`), {
      type: 'moneyfitpay',
      balance: 0,
      createdAt: serverTimestamp(),
    });
  };
  return { addPay };
}

export function useMoneyFitPay() {
  const [pay, setPay] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setPay(null);
      setLoading(false);
      return;
    }
    const ref = doc(db, `users/${user.uid}/accounts/moneyfitpay`);
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      setPay(snapshot.exists() ? snapshot.data() : null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth.currentUser]);

  return { pay, loading };
}
