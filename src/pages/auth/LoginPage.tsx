import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const handleEmailLogin = async () => {
    setMsg('');
    if (!email || !password) {
      setMsg('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMsg('로그인 성공!');
      navigate('/');
    } catch (err: any) {
      setMsg('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleGoogleLogin = async () => {
    setMsg('');
    try {
      await signInWithPopup(auth, googleProvider);
      setMsg('구글 로그인 성공!');
      navigate('/');
    } catch (err: any) {
      setMsg('구글 로그인 실패!');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="text-3xl mb-8">로그인</div>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
        <div className="mb-5">
          <label htmlFor="email" className="block font-semibold mb-1">
            이메일
          </label>
          <input
            id="email"
            className="w-full border px-3 py-2 rounded"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block font-semibold mb-1">
            비밀번호
          </label>
          <input
            id="password"
            className="w-full border px-3 py-2 rounded"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        {msg && <div className="text-red-500 text-sm mb-3">{msg}</div>}
        <Button
          color="primary"
          className="w-full mb-2"
          onClick={handleEmailLogin}
        >
          로그인
        </Button>
        <Button className="w-full mb-4" onClick={handleGoogleLogin}>
          Google 계정으로 로그인
        </Button>
        <div className="flex justify-between text-sm text-gray-700 mb-2">
          <Link to="/find-email" className="hover:underline">
            이메일 찾기
          </Link>
          <Link to="/reset-password" className="hover:underline">
            비밀번호 찾기
          </Link>
        </div>
        <div className="text-center mt-6">
          <span>아직 회원이 아니신가요? </span>
          <Link to="/signup" className="text-blue-600 hover:underline">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
