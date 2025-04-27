import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const [requirePin, setRequirePin] = useState<boolean | null>(null);

  useEffect(() => {
    if (!user) {
      setRequirePin(null);
      return;
    }

    const checkPin = async () => {
      const pinDoc = await getDoc(doc(db, `users/${user.uid}/settings/pin`));
      setRequirePin(!pinDoc.exists());
    };

    checkPin();
  }, [user]);

  if (loading || (user && requirePin === null)) return <div>로딩 중...</div>;

  if (!user) return <Navigate to="/login" replace />;
  if (requirePin && window.location.pathname !== '/set-pin') {
    return <Navigate to="/set-pin" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
