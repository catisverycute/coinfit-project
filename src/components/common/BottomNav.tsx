import React from 'react';
import home from '../../assets/icons/homeIcon.svg';
import chart from '../../assets/icons/piechartIcon.svg';
import send from '../../assets/icons/sendIcon.svg';
import menu from '../../assets/icons/hamburgerIcon.svg';

import { Link } from 'react-router-dom';

const BottomNav: React.FC = () => {
  return (
    <div className="fixed bottom-0 border-t w-full">
      <div className="flex justify-between m-5">
        <Link to="/">
          <button className="w-16">
            <img src={home} alt="home" />
            <div>홈</div>
          </button>
        </Link>
        <Link to="/analysis">
          <button className="w-16">
            <img src={chart} alt="piechart" />
            <div className="text-center">차트</div>
          </button>
        </Link>
        <Link to="/account">
          <button className="w-16">
            <img src={send} alt="sending" className="w-14 " />
            <div>송금</div>
          </button>
        </Link>
        <Link to="/menu">
          <button>
            <img src={menu} alt="menu" className="w-14 " />
            <div className="w-16">전체</div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
