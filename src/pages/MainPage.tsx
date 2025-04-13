import React from 'react';
import SpendingCard from '../components/Home/SpendingCard';
import RecentPayCard from '../components/Home/RecentPayCard';
import MonthlyGraphCard from '../components/Home/MonthlyGraphCard';

const MainPage: React.FC = () => {
  return (
    <div>
      <MonthlyGraphCard />
      <SpendingCard />
      <RecentPayCard />
    </div>
  );
};

export default MainPage;
