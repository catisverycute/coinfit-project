import React, { useState, useEffect } from 'react';
import { AccountForm } from '../../hooks/account/useAccount';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: AccountForm) => void;
  editData?: AccountForm | null;
}

const AccountAddEditModal: React.FC<Props> = ({
  open,
  onClose,
  onSave,
  editData,
}) => {
  const [form, setForm] = useState<AccountForm>({
    bank: '',
    accountNumber: '',
    alias: '',
    balance: 0,
    isMain: false,
  });

  useEffect(() => {
    if (editData) setForm(editData);
    else
      setForm({
        bank: '',
        accountNumber: '',
        alias: '',
        balance: 0,
        isMain: false,
      });
  }, [editData, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'balance'
            ? Number(value)
            : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.bank || !form.accountNumber || !form.alias) return;
    onSave(form);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs"
        onSubmit={handleSubmit}
      >
        <h3 className="text-lg font-semibold mb-4">
          {editData ? '계좌 수정' : '계좌 추가'}
        </h3>
        <input
          name="bank"
          className="border rounded px-3 py-2 mb-2 w-full"
          placeholder="은행명"
          value={form.bank}
          onChange={handleChange}
        />
        <input
          name="accountNumber"
          className="border rounded px-3 py-2 mb-2 w-full"
          placeholder="계좌번호"
          value={form.accountNumber}
          onChange={handleChange}
        />
        <input
          name="alias"
          className="border rounded px-3 py-2 mb-2 w-full"
          placeholder="별칭 (예: 생활비 통장)"
          value={form.alias}
          onChange={handleChange}
        />
        <input
          name="balance"
          type="number"
          min={0}
          className="border rounded px-3 py-2 mb-2 w-full"
          placeholder="잔액"
          value={form.balance}
          onChange={handleChange}
        />
        <label className="flex items-center mb-3">
          <input
            name="isMain"
            type="checkbox"
            checked={form.isMain}
            onChange={handleChange}
            className="mr-2"
          />
          대표 계좌로 설정
        </label>
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            {editData ? '수정' : '추가'}
          </button>
          <button
            type="button"
            className="border px-4 py-2 rounded w-full"
            onClick={onClose}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountAddEditModal;
