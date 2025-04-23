// import React, { useState } from 'react';
// import { User } from '../user.type';
// import InputForm from '../../components/common/InputForm';
// import Button from '../../components/common/Button';

// const initUser: User = {
//   name: '',
//   rnumber: '',
//   email: '',
//   phone: '',
//   password: '',
// };

// const SignupPage: React.FC = () => {
//   const [user, setUser] = useState<User>(initUser);
//   const [errors, setErrors] = useState<Partial<User>>({});

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     setUser((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     switch (name) {
//       case 'name':
//         setErrors((prev) => ({
//           ...prev,
//           name:
//             value.trim().length < 2 || value.trim().length > 10
//               ? '이름을 2자 이상 10자 이하로 입력해주세요.'
//               : '',
//         }));
//         break;

//       case 'rnumber':
//         setErrors((prev) => ({
//           ...prev,
//           rnumber: /^\d{6}-\d{7}$/.test(value)
//             ? ''
//             : '주민번호는 000000-0000000 형식으로 입력해주세요.',
//         }));
//         break;

//       case 'email':
//         setErrors((prev) => ({
//           ...prev,
//           email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
//             ? ''
//             : '올바른 이메일 형식이 아닙니다.',
//         }));
//         break;

//       case 'phone':
//         setErrors((prev) => ({
//           ...prev,
//           phone: /^\d{3}-\d{3,4}-\d{4}$/.test(value)
//             ? ''
//             : '전화번호 형식이 잘못되었습니다.',
//         }));
//         break;

//       case 'password':
//         setErrors((prev) => ({
//           ...prev,
//           password:
//             value.length < 10 ? '비밀번호는 10자 이상이어야 합니다.' : '',
//         }));
//         break;
//     }
//   };

//   return (
//     <div className="flex justify-center">
//       <div className="flex flex-col w-xl text-xl">
//         <div className="text-center text-3xl m-3 pb-3">회원가입</div>

//         <InputForm
//           id="name"
//           name="name"
//           type="text"
//           inputName="이름"
//           placeholder="이름을 입력해주세요"
//           value={user.name}
//           onChange={handleChange}
//           errorMessage={errors.name}
//         />

//         <InputForm
//           id="rnumber"
//           name="rnumber"
//           type="text"
//           inputName="주민번호"
//           placeholder="주민번호를 입력해주세요"
//           value={user.rnumber}
//           onChange={handleChange}
//           errorMessage={errors.rnumber}
//         />

//         <InputForm
//           id="email"
//           name="email"
//           type="email"
//           inputName="이메일"
//           placeholder="이메일을 입력해주세요"
//           value={user.email}
//           onChange={handleChange}
//           errorMessage={errors.email}
//         />

//         <InputForm
//           id="phone"
//           name="phone"
//           type="tel"
//           inputName="전화번호"
//           placeholder="전화번호를 입력해주세요"
//           value={user.phone}
//           onChange={handleChange}
//           errorMessage={errors.phone}
//         />

//         <InputForm
//           id="password"
//           name="password"
//           type="password"
//           inputName="비밀번호"
//           placeholder="비밀번호를 입력해주세요"
//           value={user.password}
//           onChange={handleChange}
//           errorMessage={errors.password}
//         />

//         <label htmlFor="mobile" className="m-3">
//           통신사
//         </label>
//         <select className="mb-3 ml-3" name="mobile" id="mobile">
//           <option>통신사를 선택해주세요</option>
//           <option>skt</option>
//           <option>kt</option>
//           <option>u+</option>
//         </select>

//         <Button color="primary" className="md:w-lg m-5">
//           확인
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;

import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password || !name) {
      setError('모든 정보를 입력하세요.');
      return;
    }
    if (password.length < 10) {
      setError('비밀번호는 10자 이상이어야 합니다.');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('회원가입 성공! 이제 로그인 해주세요.');
      navigate('/login');
    } catch (err: any) {
      setError('회원가입 실패: ' + err.message);
    }
  };

  return (
    <div className="flex flex-col w-xl text-xl mx-auto">
      <div className="text-center text-3xl m-3 pb-3">회원가입</div>
      <label htmlFor="name">이름</label>
      <input
        id="name"
        type="text"
        placeholder="이름을 입력해주세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-2 border"
      />
      <label htmlFor="email">이메일</label>
      <input
        id="email"
        type="email"
        placeholder="이메일을 입력해주세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2 border"
        autoComplete="email"
      />
      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2 border"
        autoComplete="new-password"
      />
      {error && <div className="text-red-500 my-2">{error}</div>}
      <Button color="primary" className="md:w-lg m-5" onClick={handleSignup}>
        회원가입
      </Button>
    </div>
  );
};

export default SignupPage;
