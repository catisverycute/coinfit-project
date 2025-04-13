import React from 'react';
import Account from '../components/Account';

const AccountListPage: React.FC = () => {
  return (
    <div>
      <Account user="사용자1" bankAccount={123213} balance={1111111} />
      <Account user="사용자2" bankAccount={456456} balance={2222222} />
    </div>
  );
};

export default AccountListPage;
