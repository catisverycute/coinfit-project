import React from 'react';
import SpendingProgress from '../analysis/SpendingProgress';

const MonthlyGraphCard: React.FC = () => {
  return (
    <div className="border m-5 p-4 rounded-lg">
      <SpendingProgress current={500000} goal={700000} />
    </div>
  );
};

export default MonthlyGraphCard;
