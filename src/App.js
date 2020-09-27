import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,Switch
} from 'react-router-dom';
import Index from './components/HomePage/Index';
import IndexMatch from './components/HomePage/Index';

import LoginPage from './components/LoginPage/LoginPage';
import qr_code from './components/LoginPage/qr_code';
import Register from './components/Register/Register';
import emailVerify from './components/Register/emailVerify';
import Receive from './components/Receive/Receive';
import Transactions from './components/Transactions/Transactions';
import Matchdetail from './components/HomePage/Matchdetail';
import casino from './components/HomePage/casino';
import casino_page from './components/HomePage/casino_page';
import teenpatti_t20 from './components/HomePage/teenpatti_t20';


import MatchdetailTest from './components/HomePage/MatchdetailTest';
import Teenpatti from './components/HomePage/Teenpatti';
import Dragontiger from './components/HomePage/Dragontiger';
import OneDayDragontiger from './components/HomePage/OneDayDragontiger';

import Logout from './components/LoginPage/Logout';
import AccountStatement from './components/Pages/AccountStatement';
import Unsetteledbet from './components/Pages/Unsetteledbet';
import Profitloss from './components/Pages/Profitloss';
import Bethistory from './components/Pages/Bethistory';
import MyBetList from './components/Pages/MyBetList';
import changePassword from './components/Pages/change_password';
import ChangeButtonValue from './components/Pages/ChangeButtonValue';
import qr_code_login from './components/Pages/qr_code_login';
import vip_poker from './components/HomePage/vip_poker';
import one_day_poker from './components/HomePage/one_day_poker';
import poker20 from './components/HomePage/poker20';
import teen_patti_one_day from './components/HomePage/teen_patti_one_day';

import teen_patti_t20 from './components/HomePage/teen_patti_t20';
import andar_bahar from './components/HomePage/andar_bahar';
import card_casnio_32 from './components/HomePage/32_card_casnio';
import sevensevendown from './components/HomePage/sevensevendown';
import luckyseven  from './components/HomePage/luckyseven';
import luckysevena  from './components/HomePage/luckysevena';

import one_day_teenpatti from './components/HomePage/one_day_teenpatti';
import dt_one_day from './components/HomePage/dt_one_day';
import casnio_teen_patti_t20 from './components/HomePage/casnio_teen_patti_t20';
import worli2 from './components/HomePage/worli2';
import card32a from './components/HomePage/card32a';
import card32b from './components/HomePage/card32b';


import casino_andar_bahar from './components/HomePage/casino_andar_bahar';
import aaa from './components/HomePage/aaa';
import ab2 from './components/HomePage/ab2';

import './App.css';

/* const Home = () => (
  <HomePage />
);
 */
const Login = () => (
  <LoginPage />
);



class App extends Component {
  render() {
    return (
     
      <Router>
        <div className="App">
          <Route exact path="/" component={Index} />
          <Route exact path="/matches/:id" component={IndexMatch} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
          <Route path="/receive" component={Receive} />
		   <Route path="/transactions" component={Transactions} />
		    <Route path="/accountstatement" component={AccountStatement} />
		    <Route path="/unsetteledbet" component={Unsetteledbet} />
		    <Route path="/profitloss" component={Profitloss} />
		  
		<Route path="/changebuttonvalue" component={ChangeButtonValue} />
		   <Route path="/emailverify/:vcode" component={emailVerify} />
       <Route path="/matchdetail/:id/:id1" component={Matchdetail} />
       <Route path="/matchdetail_test/:id/:id1" component={MatchdetailTest} />
       <Route path="/teenpatti" component={Teenpatti} />
       <Route path="/dragontiger" component={Dragontiger} />
	   <Route path="/OneDayDragontiger" component={OneDayDragontiger} />
	
	   
       <Route path="/bethistory" component={MyBetList} />
       <Route path="/change_password" component={changePassword} />
       <Route path="/casino/dt20" component={casino} />
	   <Route path="/casino/1dt20" component={casino} />
	   
       <Route path="/casino-page/:id" component={casino_page} />
       <Route path="/qr_code" component={qr_code} />
       <Route path="/casino/teenpatti/t20" component={teenpatti_t20} />
       <Route path="/qr_authenticator" component={qr_code_login} />
       <Route path="/vip-casino" component={vip_poker} />
       <Route path="/seven-up-seven-down" component={sevensevendown} />
       <Route path="/luckyseven" component={luckyseven} />
       <Route path="/luckysevena" component={luckysevena} />
       <Route path="/one-day-poker" component={one_day_poker} />
       
       <Route path="/teenpatti-one-day" component={teen_patti_one_day} />
       <Route path="/teenpatti-t20" component={teen_patti_t20} />

       <Route path="/andar-bahar" component={andar_bahar} />
       <Route path="/card-casnio-32" component={card_casnio_32} />
       <Route path="/casino/one-day-teenpatti" component={one_day_teenpatti} />
       <Route path="/casino/dt-one-day" component={dt_one_day} />
       <Route path="/casino/teen-patti-t20" component={casnio_teen_patti_t20} />
       <Route path="/casino/worli2" component={worli2} />
       <Route path="/casino/card32a" component={card32a} />
       <Route path="/casino/andar-bahar" component={casino_andar_bahar} />
       <Route path="/casino/aaa" component={aaa} />
       <Route path="/casino/ab2" component={ab2} />
       <Route path="/casino/card32b" component={card32b} />
	   <Route path="/casino/poker20" component={poker20} />
       
  </div>
      </Router>
      
    );
  }
}

export default App;
