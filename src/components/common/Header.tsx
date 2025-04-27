import React from 'react';
import logo from '../../../public/MF_logo.png';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <Link to="/">
      <div className="flex text-2xl text-center m-3 p-2">
        <img className="w-10 mr-2" src={logo} alt="logo" />
        <p>MoneyFit</p>
      </div>
    </Link>
  );
};

export default Header;
