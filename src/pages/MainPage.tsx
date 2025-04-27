import React, { useEffect } from 'react';
import MonthlyGraphCard from '../components/home/MonthlyGraphCard';
import RecentPayCard from '../components/home/RecentPayCard';
import MainAccountCard from '../components/home/MainAccountCard';
import { useRecentPays } from '../hooks/useRecentPays';
import { usePay } from '../hooks/usePay';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import MoneyFitPay from '../components/transfer/MoneyFitPay';

const MainPage: React.FC = () => {
  const { pays, total, loading } = useRecentPays();
  const { addPay } = usePay();

  useEffect(() => {
    const createPayIfNotExist = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const payDoc = await getDoc(
        doc(db, `users/${user.uid}/accounts/moneyfitpay`)
      );
      if (!payDoc.exists()) {
        await addPay();
      }
    };
    createPayIfNotExist();
  }, []);

  return (
    <div>
      <MonthlyGraphCard />
        <div className="mx-6">
          <MoneyFitPay />
        </div>
      <MainAccountCard />
      {loading ? (
        <div>최근 소비 불러오는 중...</div>
      ) : (
        <RecentPayCard pays={pays} total={total} />
      )}
    </div>
  );
};

export default MainPage;
