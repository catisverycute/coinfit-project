import React from 'react';
import back from '../../assets/icons/leftarrow.svg';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Button variant="back" onClick={handleBack}>
        <img src={back} alt="backArrow" className="w-8" />
      </Button>
    </div>
  );
};

export default BackButton;
