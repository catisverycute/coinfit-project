import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import Button from '../../components/common/Button';

const ResetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleReset = async () => {
    if (!email) {
      setMsg('이메일을 입력해주세요.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMsg('비밀번호 재설정 메일이 발송되었습니다. 이메일을 확인하세요!');
    } catch (error: any) {
      setMsg('해당 이메일로 가입된 계정이 없습니다.');
    }
  };

  return (
    <div className="flex flex-col w-xl mx-auto">
      <div className="text-center text-2xl mb-3">비밀번호 찾기</div>
      <input
        type="email"
        placeholder="이메일을 입력하세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2 border px-2 py-1"
      />
      <Button onClick={handleReset}>비밀번호 재설정 메일 보내기</Button>
      {msg && <div className="mt-2 text-blue-600">{msg}</div>}
    </div>
  );
};

export default ResetPasswordPage;
