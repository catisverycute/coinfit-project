import { useEffect, useState } from 'react';
import {
  setDoc,
  doc,
  serverTimestamp,
  onSnapshot,
  updateDoc,
  getDoc,
} from 'firebase/firestore';
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

  const chargePay = async (amount: number) => {
    const user = auth.currentUser;
    if (!user) throw new Error('로그인 필요');
    const payRef = doc(db, `users/${user.uid}/accounts/moneyfitpay`);
    const paySnap = await getDoc(payRef);
    const before = paySnap.data()?.balance ?? 0;
    await updateDoc(payRef, {
      balance: Number(before) + Number(amount),
    });
  };

  return { addPay, chargePay };
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
