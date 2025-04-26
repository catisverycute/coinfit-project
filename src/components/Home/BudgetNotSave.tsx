import React from 'react';
import Button from '../common/Button';

interface BudgetNotSetCardProps {
  onClickSetBudget?: () => void;
}

const BudgetNotSaveCard: React.FC<BudgetNotSetCardProps> = ({
  onClickSetBudget,
}) => {
  return (
    <div className="border m-5 p-4 rounded-lg flex flex-col items-center">
      <div className="text-xl font-bold mb-2">
        예산이 설정되어 있지 않습니다.
      </div>
      <div className="mb-2">이번 달 지출 목표를 설정해주세요.</div>
      <Button onClick={onClickSetBudget}>지출 목표 설정하기</Button>
    </div>
  );
};

export default BudgetNotSaveCard;
