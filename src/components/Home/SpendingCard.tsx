import React from 'react';
import Button from '../Button';


const SpendingCard: React.FC = () => {
  return (
    <div className="border m-5 p-4 rounded-lg">
      <p>소비 내역</p>

      <Button>더보기</Button>
    </div>
  );
};

export default SpendingCard;
