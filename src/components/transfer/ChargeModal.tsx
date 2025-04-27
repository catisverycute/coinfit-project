import React, { useEffect, useState } from 'react';
import closeLg from '../../assets/icons/closeIcon.svg';
import Button from '../common/Button';
import { auth, db } from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { Account } from '../../hooks/account/useAccount';
import InsufficientModal from './InsufficientModa';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  onClose: () => void;
}

const ChargeModal: React.FC<ModalProps> = ({ onClose }) => {
  const money = ['100', '50', '30', '20', '10'];
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string>('');
  const [showInsufficient, setShowInsufficient] = useState<boolean>(false);

  useEffect(() => {
    if (!auth.currentUser) return;
    const q = collection(db, `users/${auth.currentUser.uid}/accounts`);
    const unsub = onSnapshot(q, (snap) => {
      setAccounts(
        snap.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as Account
        )
      );
    });
    return unsub;
  }, []);

  const handleAmountClick = (amount: number) => {
    const selectedAccount = accounts.find(
      (acc) => acc.id === selectedAccountId
    );
    if (!selectedAccount) return;
    if (Number(selectedAccount.balance) < amount * 10000) {
      setShowInsufficient(true);
    } else {
      navigate('/account/charge', {
        state: {
          selectedAmount: amount * 10000,
          selectedAccountId,
        },
      });
    }
  };

  return (
    <div className="border rounded-t-xl h-3/4 bg-white w-full fixed left-0 bottom-0 z-50">
      <div className="pt-10 pb-10 pr-4 pl-4">
        <div className="flex justify-between *:mb-8 ml-4 text-3xl">
          얼마나 충전할까요?
          <Button className="bg-white border-none ml-5" onClick={onClose}>
            <img className="w-8" src={closeLg} alt="닫기" />
          </Button>
        </div>
        <select
          className="select select-xl ml-4"
          value={selectedAccountId}
          onChange={(e) => setSelectedAccountId(e.target.value)}
        >
          <option value="">계좌 선택</option>
          {accounts
            .filter((acc) => acc.accountNumber && acc.bank)
            .map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.bank} {acc.accountNumber.slice(-4)}
              </option>
            ))}
        </select>
        <div className="flex flex-col items-start ml-2 my-8 text-lg">
          {money.map((i) => (
            <Button
              variant="text"
              key={i}
              onClick={() =>
                handleAmountClick(Number(i.replace(/[^0-9]/g, '')))
              }
              disabled={!selectedAccountId}
            >
              {i}만원
            </Button>
          ))}
          <Button
            variant="text"
            onClick={() =>
              navigate('/account/charge', {
                state: {
                  selectedAccountId,
                },
              })
            }
            disabled={!selectedAccountId}
          >
            직접 입력
          </Button>
        </div>
      </div>
      {showInsufficient && (
        <InsufficientModal
          onClose={onClose}
          onChangeAmount={() => setShowInsufficient(false)}
        />
      )}
    </div>
  );
};

export default ChargeModal;
