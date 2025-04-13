import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* <div className="flex">
        <InputForm id="이메일" inputName="이메일" />
      </div>
      <div className="flex">
        <InputForm id="비밀번호" inputName="비밀번호" />
      </div> */}
      <div className="mt-5 mb-5">
        <div className="mb-5">
          <label htmlFor="email">이메일</label>
          <input id="email" className="w-xl ml-7 border" type="email" />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input id="password" className="w-xl ml-3 border" type="password" />
        </div>
      </div>
      <Button color="primary" className="w-xl">
        로그인
      </Button>
      <div className="mt-5 mb-5">
        <Link to="/">
          <button>이메일 찾기</button>
        </Link>{' '}
        |{' '}
        <Link to="/">
          <button>비밀번호 찾기</button>
        </Link>
      </div>
      <Link to="/signup" className="mb-5">
        <button>회원가입</button>
      </Link>
      <div className="text-center">
        간편로그인
        <hr className="w-xl mt-2" />
      </div>
    </div>
  );
};

export default LoginPage;
