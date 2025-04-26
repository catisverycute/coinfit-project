import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

export function useAuth() {
  const [user, loading, error] = useAuthState(auth);
  return { user, loading, error };
}

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential, 'test');
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        email,
        name,
        createdAt: new Date(),
        profileImage: '',
      });

      console.log(user, 'user');
      setLoading(false);
      return user;
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
      return null;
    }
  };
  return { signup, loading, error };
};
