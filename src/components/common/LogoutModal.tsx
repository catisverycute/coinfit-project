// components/common/LogoutModal.tsx
import React from 'react';

interface LogoutModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  open,
  onConfirm,
  onCancel,
  message = '정말로 로그아웃하시겠습니까?',
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center w-80">
        <div className="mb-6 text-lg font-semibold">{message}</div>
        <div className="flex justify-center gap-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            onClick={onCancel}
          >
            취소
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
