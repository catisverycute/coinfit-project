import React from 'react';
import SpendingProgress from '../analysis/SpendingProgress';
import { useSpendingProgress } from '../../hooks/useSpendingProgress';
import BudgetNotSaveCard from './BudgetNotSave';
import { useNavigate } from 'react-router-dom';

const MonthlyGraphCard: React.FC = () => {
  const navigate = useNavigate();
  const { current, goal } = useSpendingProgress();

  if (!goal || goal === 0) {
    return <BudgetNotSaveCard onClickSetBudget={() => navigate('/setting')} />;
  }

  return (
    <div className="border m-5 p-4 rounded-lg">
      <SpendingProgress current={current} goal={goal} />
    </div>
  );
};

export default MonthlyGraphCard;
