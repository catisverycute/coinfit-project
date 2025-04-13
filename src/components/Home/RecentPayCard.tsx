import React from 'react';
import Button from '../Button';

const RecentPayCard: React.FC = () => {
  return (
    <div className="border m-5 p-4 rounded-lg">
      <p>최근 소비</p>

      <Button>더보기</Button>
    </div>
  );
};

export default RecentPayCard;
