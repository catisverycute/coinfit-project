import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

const RemitSuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { amount } = location.state || {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400">
      <div className="bg-white rounded-md p-8 w-72 mt-8 flex flex-col items-center">
        <svg
          width="48"
          height="48"
          className="mb-2"
          fill="none"
          stroke="black"
          strokeWidth={2}
        >
          <circle cx="24" cy="24" r="22" />
          <path d="M16 24l6 6 10-10" />
        </svg>
        <div className="text-xl font-bold mb-2">
          {Number(amount).toLocaleString()}원
        </div>
        <div className="mb-6">송금이 완료되었습니다</div>
        <Button type="button" onClick={() => navigate('/account')}>
          확인
        </Button>
      </div>
    </div>
  );
};

export default RemitSuccessPage;
