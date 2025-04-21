import React from 'react';
import MonthlyGraphCard from '../components/Home/MonthlyGraphCard';
import SpendingCard from '../components/Home/SpendingCard';
import RecentPayCard from '../components/Home/RecentPayCard';

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
