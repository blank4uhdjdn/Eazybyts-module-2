import React from 'react'
import NavWithoutLogin from '../navWithoutLogin/navWithoutLogin'
import StockCards from '../pages/dashboard/StockCards'

const AfterLogin = () => {
  return (
    <div>
       <NavWithoutLogin/>
       <StockCards/>
    </div>
  )
}

export default AfterLogin

