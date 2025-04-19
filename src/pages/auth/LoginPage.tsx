import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-3xl">로그인</div>
      <div className="mt-50 mb-5">
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
      <div className="flex flex-row mt-5 mb-5 p-3 w-full justify-center ">
        <Link to="/">
          <button>이메일 찾기</button>
        </Link>
        <div className="divider divider-horizontal"></div>
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
        {/* <button className="w-16">
          <NaverIcon />
        </button> */}
      </div>
    </div>
  );
};

export default LoginPage;
