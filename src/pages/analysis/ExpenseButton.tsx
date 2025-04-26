import React, { useState } from 'react';
import ExpenseForm from '../../components/analysis/ExpenseForm';

const ExpenseButton: React.FC = () => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  return (
    <div>
      <button
        className="fixed bottom-40 right-6 bg-blue-500 text-white px-4 py-2 rounded-full"
        onClick={() => setShowExpenseForm(true)}
      >
        + 지출 추가
      </button>
      {showExpenseForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[300px]">
            <ExpenseForm onSaved={() => setShowExpenseForm(false)} />
            <div className="flex justify-end mt-3">
              <button
                className="ml-2 px-3 py-1 border rounded text-gray-600"
                onClick={() => setShowExpenseForm(false)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseButton;
