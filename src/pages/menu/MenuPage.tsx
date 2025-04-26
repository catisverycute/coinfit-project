import React, { useState } from 'react';
import MenuItem from '../../components/menu/MenuItem';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import LogoutModal from '../../components/common/LogoutModal';
import user from '../../assets/icons/user.svg';
import { useUserEmail, useUserName } from '../../hooks/useUserName';

const MenuPage: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const userName = useUserName();
  const userEmail = useUserEmail();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowModal(false);
      navigate('/login');
    } catch (error) {
      alert('로그아웃에 실패했습니다.');
    }
  };

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 pt-6 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b">
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold">
          <img src={user} alt="user" />
        </div>
        <div>
          <div className="font-semibold">{userName}님</div>
          <div className="text-sm text-gray-500">{userEmail}</div>
        </div>
      </div>
      <div className="space-y-3 mb-6">
        <MenuItem label="계좌 관리" />
        <MenuItem label="예산/목표 관리" />
        <MenuItem label="소비 내역 전체" />
        <MenuItem label="분석 리포트" />
        <MenuItem label="카드 관리" />
      </div>

      <div className="space-y-3 border-t pt-4">
        <MenuItem label="알림 설정" />
        <MenuItem label="앱 설정" />
        <MenuItem label="고객센터/FAQ" />
        <MenuItem label="피드백/의견 보내기" />
        <MenuItem label="로그아웃" onClick={handleLogoutClick} />
      </div>
      <LogoutModal
        open={showModal}
        onConfirm={handleLogout}
        onCancel={handleModalCancel}
        message="정말로 로그아웃하시겠습니까?"
      />
    </div>
  );
};

export default MenuPage;
