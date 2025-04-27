import React, { useState } from 'react';
import PinInput from '../../components/auth/PinInput';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import sha256 from 'crypto-js/sha256';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const PinCodePage: React.FC = () => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInput = (num: string) => {
    if (pin.length < 6) {
      setPin(pin + num);
      setError('');
    }
  };


  const handleDelete = () => setPin(pin.slice(0, -1));

  const handleCheckPin = async () => {
    if (pin.length !== 6) {
      setError('6자리를 입력하세요.');
      return;
    }
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('로그인 필요');
      const docRef = doc(db, `users/${user.uid}/settings/pin`);
      const pinSnap = await getDoc(docRef);
      const savedPinHash = pinSnap.data()?.pin;
      if (sha256(pin).toString() === savedPinHash) {
        setError('');
        navigate('/account/transfer/success');
      } else {
        setError('비밀번호가 일치하지 않습니다.');
        setPin('');
      }
    } catch (e) {
      setError('인증 중 오류가 발생했습니다.');
    }
  };

  const renderKeypad = () => (
    <div className="grid grid-cols-3 gap-4 mb-4">
      {[...'12345678900←'].map((key) =>
        key === '←' ? (
          <button
            key={key}
            onClick={handleDelete}
            className="text-lg py-2 border rounded"
          >
            ←
          </button>
        ) : (
          <button
            key={key}
            onClick={() => handleInput(key)}
            className="text-lg p-2 border rounded"
          >
            {key}
          </button>
        )
      )}
    </div>
  );

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="text-2xl font-bold my-5">간편로그인</div>
      <PinInput length={6} filledLength={pin.length} />
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {renderKeypad()}
      <Button onClick={handleCheckPin} className="w-full">
        확인
      </Button>
    </div>
  );
};

export default PinCodePage;
