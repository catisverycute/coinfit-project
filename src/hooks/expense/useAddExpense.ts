import { useState } from 'react';
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { auth, db } from '../../firebase';

interface ExpenseForm {
  amount: number;
  category: string;
  description?: string;
  date?: Date;
}

export function useAddExpense() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addExpense = async (form: ExpenseForm) => {
    setLoading(true);
    setError(null);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('로그인 필요');
      await addDoc(collection(db, `users/${user.uid}/transactions`), {
        ...form,
        type: '지출',
        date: form.date ? Timestamp.fromDate(form.date) : serverTimestamp(),
        createdAt: serverTimestamp(),
      });
      setLoading(false);
      return true;
    } catch (err: any) {
      setError(err.message || '지출 저장 실패');
      setLoading(false);
      return false;
    }
  };

  return { addExpense, loading, error };
}
