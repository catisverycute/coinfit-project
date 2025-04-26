import React, { useState } from 'react';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import InputForm from '../../components/common/InputForm';
import { useSignup } from '../../hooks/useAuth';
import { usePay } from '../../hooks/usePay';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const { signup, loading, error } = useSignup();
  const { addPay } = usePay();

  const handleSignup = async () => {
    if (!email || !password || !name) {
      setErrors('모든 정보를 입력하세요.');
      return;
    }
    if (password.length < 10) {
      setErrors('비밀번호는 10자 이상이어야 합니다.');
      return;
    }
    const user = await signup(name, email, password);
    if (user) {
      await addPay();
      alert('회원가입 성공! 이제 로그인 해주세요.');
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col w-xl text-xl mx-auto">
      <div className="text-center text-3xl m-3 pb-3">회원가입</div>
      <InputForm
        id="name"
        name="name"
        inputName="이름"
        type="text"
        placeholder="이름을 입력해주세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
        errorMessage={errors && !name ? errors : undefined}
      />
      <InputForm
        id="email"
        name="email"
        inputName="이메일"
        type="email"
        placeholder="이메일을 입력해주세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        errorMessage={errors && !email ? errors : undefined}
        autoComplete="email"
      />
      <InputForm
        id="password"
        name="password"
        inputName="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        errorMessage={errors && password.length < 10 ? errors : undefined}
        autoComplete="new-password"
      />
      {error && <div className="text-red-500 my-2">{error}</div>}
      <Button
        color="primary"
        className="md:w-lg m-5"
        onClick={handleSignup}
        disabled={loading}
      >
        {loading ? '가입 중...' : '회원가입'}
      </Button>
    </div>
  );
};

export default SignupPage;
