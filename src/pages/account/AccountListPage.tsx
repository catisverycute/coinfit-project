import React, { useState } from 'react';
import {
  useAccount,
  AccountForm,
  Account,
} from '../../hooks/account/useAccount';
import AccountAddEditModal from '../../components/transfer/AccountAddModal';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import MoneyFitPay from '../../components/transfer/MoneyFitPay';

const AccountListPage: React.FC = () => {
  const { accounts, addAccount, updateAccount, deleteAccount } = useAccount();
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<Account | null>(null);

  const sortedAccounts = [...accounts].sort((a, b) => {
    if (a.isMain === b.isMain) {
      return (a.createdAt?.seconds ?? 0) - (b.createdAt?.seconds ?? 0);
    }
    return b.isMain ? 1 : -1;
  });

  const handleSave = async (form: AccountForm) => {
    if (editData) {
      await updateAccount(editData.id, form);
    } else {
      await addAccount(form);
    }
    setShowModal(false);
  };

  const handleDelete = async (id: string) => {
    await deleteAccount(id);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">내 계좌</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setEditData(null);
            setShowModal(true);
          }}
        >
          + 계좌 추가
        </button>
      </div>
      <MoneyFitPay />
      <ul>
        {sortedAccounts
          .filter((acc) => acc.type !== 'moneyfitpay')
          .map((acc) => (
            <li
              key={acc.id}
              className="mb-2 border px-3 py-5 rounded flex flex-col gap-3 relative"
            >
              <div className="font-bold">
                {acc.alias}{' '}
                {acc.isMain && (
                  <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                    대표
                  </span>
                )}
              </div>
              <div>
                {acc.bank} {acc.accountNumber}
              </div>
              <div className="text-gray-500">
                잔액: {acc.balance?.toLocaleString() ?? 0}원
              </div>
              <div className="flex gap-2 mt-1">
                <button
                  className="px-3 py-1 border rounded text-sm"
                  onClick={() => {
                    setEditData(acc);
                    setShowModal(true);
                  }}
                >
                  수정
                </button>
                <button
                  className="px-3 py-1 border rounded text-sm text-red-600"
                  onClick={() => handleDelete(acc.id)}
                >
                  삭제
                </button>
                <Link
                  to="/transfer/step1"
                  state={{
                    fromAccountId: acc.id,
                    fromAccountBank: acc.bank,
                    fromAccountNumber: acc.accountNumber,
                    fromAccountAlias: acc.alias,
                    fromAccountBalance: acc.balance,
                  }}
                >
                  <Button type="button">송금</Button>
                </Link>
              </div>
            </li>
          ))}
      </ul>
      <AccountAddEditModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        editData={editData ?? undefined}
      />
    </div>
  );
};

export default AccountListPage;
