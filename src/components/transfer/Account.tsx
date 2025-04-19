import React, { useState } from 'react';
import Button from '../common/Button';
import ChargeModal from './ChargeModal';
import { Link } from 'react-router-dom';

interface AccountProps {
  user: string;
  bankAccount: number;
  balance: number;
}

const Account: React.FC<AccountProps> = ({ user, bankAccount, balance }) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="flex justify-center">
      <div className=" bg-[#FCF2CD] border   m-5 rounded-lg p-5 w-xl">
        <div>
          <div>{user}님의 계좌</div>
          <div>{bankAccount}</div>
          <div>{balance}원</div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="mr-3" onClick={() => setShow(true)}>
            충전
          </Button>
          <Link to="/transfer/step1">
            <Button type="submit">송금</Button>
          </Link>
        </div>
      </div>
      {show && <ChargeModal onClose={() => setShow(false)} />}
    </div>
  );
};

export default Account;
