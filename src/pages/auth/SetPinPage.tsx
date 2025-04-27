import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PinInput from '../../components/auth/PinInput';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import Button from '../../components/common/Button';
import sha256 from 'crypto-js/sha256';

const SetPinPage: React.FC = () => {
  const [step, setStep] = useState<'enter' | 'confirm'>('enter');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const KEYPAD = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', '←'],
  ];

  const handleInput = (num: string) => {
    if (step === 'enter' && pin.length < 6 && num !== '←') {
      setPin(pin + num);
      setError('');
    }
    if (step === 'confirm' && confirmPin.length < 6 && num !== '←') {
      setConfirmPin(confirmPin + num);
      setError('');
    }
  };

  const handleDelete = () => {
    if (step === 'enter') setPin(pin.slice(0, -1));
    if (step === 'confirm') setConfirmPin(confirmPin.slice(0, -1));
  };

  const handleNext = () => {
    if (pin.length !== 6) {
      setError('6자리를 입력하세요.');
      return;
    }
    setStep('confirm');
    setError('');
  };

  const handleSave = async () => {
    if (confirmPin.length !== 6) {
      setError('6자리를 입력하세요.');
      return;
    }
    if (pin !== confirmPin) {
      setError('입력한 비밀번호가 다릅니다.');
      setConfirmPin('');
      return;
    }
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('로그인 필요');
      await setDoc(doc(db, `users/${user.uid}/settings/pin`), {
        pin: sha256(pin).toString(),
      });
      alert('비밀번호가 설정되었습니다.');
      navigate('/');
    } catch (e) {
      setError('저장 중 오류가 발생했습니다.');
    }
  };

  const renderKeypad = () => (
    <div className="grid grid-cols-3 gap-4 mb-5 w-72">
      {KEYPAD.flat().map((key, idx) => {
        if (key === '') return <div key={idx} />;
        if (key === '←')
          return (
            <button
              key={idx}
              onClick={handleDelete}
              className="text-xl px-5 py-3 border rounded"
              tabIndex={-1}
            >
              ←
            </button>
          );
        return (
          <button
            key={idx}
            onClick={() => handleInput(key)}
            className="text-xl px-5 py-3 border rounded"
          >
            {key}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col justify-center items-center mt-30 bg-white">
      <div className="text-2xl font-bold my-5">
        비밀번호 {step === 'enter' ? '설정' : '확인'}
      </div>
      <PinInput
        length={6}
        filledLength={step === 'enter' ? pin.length : confirmPin.length}
      />
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {renderKeypad()}
      {step === 'enter' ? (
        <Button onClick={handleNext} className="w-72 mt-2">
          다음
        </Button>
      ) : (
        <Button onClick={handleSave} className="w-72 mt-2">
          저장
        </Button>
      )}
    </div>
  );
};

export default SetPinPage;
