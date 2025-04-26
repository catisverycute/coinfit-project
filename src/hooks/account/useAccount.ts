import { useEffect, useState, useCallback } from 'react';
import { auth, db } from '../../firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

export interface AccountForm {
  bank: string;
  accountNumber: string;
  alias: string;
  balance: number;
  isMain: boolean;
  type?: string;
}

export interface Account extends AccountForm {
  id: string;
  createdAt?: any;
}

export function useAccount() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    if (!auth.currentUser) return;
    const q = collection(db, `users/${auth.currentUser.uid}/accounts`);
    const unsub = onSnapshot(q, (snap) => {
      setAccounts(
        snap.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as Account
        )
      );
    });
    return unsub;
  }, []);

  const setOnlyOneMainAccount = async () => {
    if (!auth.currentUser) return;
    const q = query(
      collection(db, `users/${auth.currentUser.uid}/accounts`),
      where('isMain', '==', true)
    );
    const snap = await getDocs(q);
    snap.forEach(async (docu) => {
      await updateDoc(
        doc(db, `users/${auth.currentUser!.uid}/accounts/${docu.id}`),
        { isMain: false }
      );
    });
  };

  const addAccount = useCallback(async (form: AccountForm) => {
    if (!auth.currentUser) return;
    if (form.isMain) {
      await setOnlyOneMainAccount();
    }
    await addDoc(collection(db, `users/${auth.currentUser.uid}/accounts`), {
      ...form,
      createdAt: serverTimestamp(),
    });
  }, []);

  const updateAccount = useCallback(async (id: string, form: AccountForm) => {
    if (!auth.currentUser) return;
    if (form.isMain) {
      await setOnlyOneMainAccount();
    }
    await updateDoc(doc(db, `users/${auth.currentUser.uid}/accounts/${id}`), {
      ...form,
    });
  }, []);

  const deleteAccount = useCallback(async (id: string) => {
    if (!auth.currentUser) return;
    await deleteDoc(doc(db, `users/${auth.currentUser.uid}/accounts/${id}`));
  }, []);

  return {
    accounts,
    addAccount,
    updateAccount,
    deleteAccount,
  };
}
