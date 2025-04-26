import React from 'react';

interface SpendingProgressProps {
  current: number;
  goal: number;
}

const SpendingProgress: React.FC<SpendingProgressProps> = ({
  current,
  goal,
}) => {
  const percentage = Math.min((current / goal) * 100, 100);

  return (  
    <div className="w-full max-w-lg">
      <div className="flex items-center mb-2">
        <span className="text-xl font-semibold">이번 달 지출 목표</span>
        <span>D-8</span>
      </div>
      <div className="text-md font-medium mb-1">
        {current.toLocaleString()}원 / {goal.toLocaleString()}원
      </div>
      <div className="flex items-center">
        <div className="relative w-full h-4 bg-gray-300 rounded mr-2">
          <div
            className="h-4 rounded bg-green-600"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm font-semibold">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
};

export default SpendingProgress;
