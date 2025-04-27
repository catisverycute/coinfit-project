import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

const ChargeSuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const amount = location.state?.amount;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center">
        <div className="text-green-600 text-3xl font-bold mb-2">충전 완료!</div>
        <div className="text-xl mb-2">
          {Number(amount).toLocaleString()}원이 충전되었습니다.
        </div>
        <Button onClick={() => navigate('/account')}>확인</Button>
      </div>
    </div>
  );
};

export default ChargeSuccessPage;
