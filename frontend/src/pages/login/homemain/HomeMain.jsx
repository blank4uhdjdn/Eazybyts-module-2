import React from 'react';
import Navbar from '../../navbar/Navbar';
import StockCards from '../../dashboard/StockCards';
import NavWithLogin from '../../navbar/NavWithLogin';


const HomeMain = () => {
  return (
    <div>
      <NavWithLogin/>
     <StockCards/>
    </div>
  );
};

export default HomeMain;
