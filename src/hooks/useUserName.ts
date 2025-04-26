import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export function useUserName() {
  const [userName, setUserName] = useState('');
  useEffect(() => {
    if (!auth.currentUser) return;
    getDoc(doc(db, 'users', auth.currentUser.uid)).then((snap) => {
      setUserName(snap.data()?.name ?? '');
    });
  }, []);
  return userName;
}

export function useUserEmail() {
  const [email, setEmail] = useState('');
  useEffect(() => {
    if (!auth.currentUser) return;
    getDoc(doc(db, 'users', auth.currentUser.uid)).then((snap) => {
      setEmail(snap.data()?.email ?? '');
    });
  }, []);
  return email;
}
