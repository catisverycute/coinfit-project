import React, { useState } from 'react';
import { useAddExpense } from '../../hooks/expense/useAddExpense';

interface ExpenseFormProps {
  onSaved?: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSaved }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');
  const { addExpense, loading, error } = useAddExpense();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;
    const sendDate = date ? new Date(date) : undefined;
    const success = await addExpense({
      amount: Number(amount),
      category,
      description: desc,
      date: sendDate,
    });
    if (success) {
      setAmount('');
      setCategory('');
      setDesc('');
      setDate('');
      if (onSaved) onSaved();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="금액"
        type="number"
        className="border rounded px-2 py-1"
      />
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="카테고리"
        className="border rounded px-2 py-1"
      />
      <input
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="설명(선택)"
        className="border rounded px-2 py-1"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border rounded px-2 py-1"
      />
      <div className="flex justify-between items-center mt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          저장
        </button>
        {error && <div className="text-red-500 text-sm ml-2">{error}</div>}
      </div>
    </form>
  );
};

export default ExpenseForm;
