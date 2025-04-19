import React from 'react';
import SpendingCard from '../components/home/SpendingCard';
import RecentPayCard from '../components/home/RecentPayCard';
import MonthlyGraphCard from '../components/home/MonthlyGraphCard';

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
