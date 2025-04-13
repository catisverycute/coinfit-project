import React from 'react';
import Button from '../components/Button';
import InputForm from '../components/InputForm';

const SignupPage: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-xl">
        <InputForm
          id="name"
          inputName="이름"
          placeholder="이름을 입력해주세요"
        />

        <InputForm
          id="unique"
          inputName="주민번호"
          placeholder="이름을 입력해주세요"
        />
        <InputForm
          id="email"
          inputName="이메일"
          placeholder="이메일을 입력해주세요"
        />
        <InputForm
          id="phone"
          inputName="전화번호"
          placeholder="전화번호를 입력해주세요"
        />
        <label htmlFor="mobile" className="m-3">
          통신사
        </label>
        <select className="mb-3 ml-3" name="moblie" id="mobile">
          <option>통신사를 선택해주세요</option>
          <option>skt</option>
          <option>kt </option>
          <option>u+ </option>
        </select>
        <Button color="primary" className="md:w-lg m-5">
          확인
        </Button>
      </div>
      {/* <Button type="submit" className="bg-primary md:w-lg m-10 text-white">
        다음
      </Button> */}

      {/* <Button color="primary" textColor="white" className="md:w-lg m-5">
            확인
        </Button>
        <Button color="success3" textColor="black" className="md:w-lg m-5">
            확인
        </Button>
        <Button color="success3" textColor="white" className="md:w-lg m-5">
            확인
        </Button>
        <Button color="success6" textColor="black" className="md:w-lg m-5">
            확인
        </Button>
        <Button color="success6" textColor="white" className="md:w-lg m-5">
            확인
        </Button> */}
    </div>
  );
};

export default SignupPage;
