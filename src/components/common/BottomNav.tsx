import React from 'react';
import home from '../../assets/icons/homeIcon.svg';
import chart from '../../assets/icons/piechartIcon.svg';
import send from '../../assets/icons/sendIcon.svg';
import menu from '../../assets/icons/hamburgerIcon.svg';

import { Link } from 'react-router-dom';

const BottomNav: React.FC = () => {
  return (
    <div className="fixed bottom-0 border-t w-full">
      {/* <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {' '}
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M21.4498 10.275L11.9998 3.1875L2.5498 10.275L2.9998 11.625H3.7498V20.25H20.2498V11.625H20.9998L21.4498 10.275ZM5.2498 18.75V10.125L11.9998 5.0625L18.7498 10.125V18.75H14.9999V14.3333L14.2499 13.5833H9.74988L8.99988 14.3333V18.75H5.2498ZM10.4999 18.75H13.4999V15.0833H10.4999V18.75Z"
            fill="#000000"
          ></path>{' '}
        </g>
      </svg> */}
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
        <button>
          <img src={menu} alt="menu" className="w-14 " />
          <div className="w-16">전체</div>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
