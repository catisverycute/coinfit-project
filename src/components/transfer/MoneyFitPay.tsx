import React, { useEffect, useState } from 'react';
import Button from '../common/Button';
import ChargeModal from './ChargeModal';
import { Link } from 'react-router-dom';
import { useMoneyFitPay, usePay } from '../../hooks/usePay';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

const MoneyFitPay: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const { pay, loading } = useMoneyFitPay();
  const { addPay } = usePay();

  useEffect(() => {
    const createIfNotExist = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const payDoc = await getDoc(
        doc(db, `users/${user.uid}/accounts/moneyfitpay`)
      );
      if (!payDoc.exists()) {
        await addPay();
      }
    };
    createIfNotExist();
  }, []);

  return (
    <div className="flex justify-center ">
      <div className="flex items-center lg:w-full px-6 py-8 bg-[#FCF2CD] border my-5 rounded-lg w-xl">
        <div className="font-bold mr-3">MF pay</div>
        <div className="mr-3">
          {loading
            ? '잔액 불러오는 중...'
            : `${pay?.balance?.toLocaleString() ?? 0}원`}
        </div>
        <Button
          type="button"
          className="mr-3 px-4 py-2 whitespace-nowrap"
          onClick={() => setShow(true)}
        >
          충전
        </Button>
        <Link to="/pay/transfer/step1">
          <Button type="button" className="px-4 py-2 whitespace-nowrap">
            송금
          </Button>
        </Link>
      </div>
      {show && <ChargeModal onClose={() => setShow(false)} />}
    </div>
  );
};

export default MoneyFitPay;
