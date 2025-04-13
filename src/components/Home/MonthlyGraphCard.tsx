import React from 'react';
import dollar from '../../assets/icons/dollarIcon.svg';

const MonthlyGraphCard: React.FC = () => {
  return (
    <div className="border m-5 p-4 rounded-lg">
      <div className="flex h-10">
        <img src={dollar} alt="dollar" />
        <div>이번 달 지출</div>
      </div>
      <div>30만원 / 70만원</div>
      <div>
        <progress id="progress" max="100" value="70" />
        <label htmlFor="progress">70%</label>
      </div>
    </div>
  );
};

export default MonthlyGraphCard;
