import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const BudgetSettingPage: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const user = auth.currentUser;
  const now = new Date();
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    await setDoc(
      doc(db, `users/${user.uid}/settings/budget`),
      { month, amount: Number(amount) },
      { merge: true }
    );
    setSaving(false);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">이번 달 지출 목표 설정</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="지출 목표 금액(원)"
        className="border px-3 py-2 rounded w-full mb-3"
      />
      <button
        onClick={handleSave}
        disabled={saving || !amount}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        {saving ? '저장중...' : '저장'}
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-lg p-6 w-[260px] text-center shadow-lg">
            <div className="mb-4 text-lg font-semibold">저장 완료!</div>
            <div className="mb-5">이번 달 목표가 저장되었습니다.</div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleModalClose}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetSettingPage;
