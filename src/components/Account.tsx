import React from 'react';
import Button from './Button';

interface AccountProps {
  user: string;
  bankAccount: number;
  balance: number;
}

const Account: React.FC<AccountProps> = ({ user, bankAccount, balance }) => {
  return (
    <div className="flex justify-center">
      <div className=" bg-[#FCF2CD] border m-5 rounded-lg p-5 w-xl">
        <div>
          <div>{user}님의 계좌</div>
          <div>{bankAccount}</div>
          <div>{balance}원</div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="mr-3">
            충전
          </Button>
          <Button type="submit">송금</Button>
        </div>
      </div>
    </div>
  );
};

export default Account;
