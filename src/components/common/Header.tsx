import React from 'react';
import logo from '../../assets/icons/dollarIcon.svg';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <Link to="/">
      <div className="flex text-2xl text-center m-3 p-2">
        <img className="w-8 mr-2" src={logo} alt="logo" />
        <p>CoinFit</p>
      </div>
    </Link>
  );
};

export default Header;
