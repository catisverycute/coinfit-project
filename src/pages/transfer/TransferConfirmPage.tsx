import BackButton from '../../components/common/BackButton';
import Button from '../../components/common/Button';

const TransferConfirmPage: React.FC = () => {
  return (
    <div>
      <BackButton />
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-gray-200 rounded-full mt-3 mb-1"></div>
        <div className="text-lg">가나 1231231-123412x34</div>
        <div className="m-5">
          <div className="text-2xl">김돌비님에게</div>
          <div className="text-2xl">999,999원을 보낼까요?</div>
        </div>
        <div className="text-base">
          <div>출금계좌</div>
          <div>받는 분에게 표시</div>
          <div>메모</div>
        </div>
        <div className="flex gap-3 m-5">
          <Button variant="primaryBtn">취소</Button>
          <Button variant="primaryBtn">보내기</Button>
        </div>
      </div>
    </div>
  );
};

export default TransferConfirmPage;
