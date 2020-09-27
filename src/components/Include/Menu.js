import React, { Component } from 'react';
import {Link,Redirect} from "react-router-dom";


class Menu extends Component {
  render() {
	var htmlcasino="";
	var table_tannis="";
	var html_darts="";
	var table_badminton="";
	var table_basketball="";
	var table_volleyball="";
	var html_baccarat="";
	var html_Lucky7="";
	var html_poker="";
	var html_instant_worli="";
	var html_teenpatti20="";
	var teenpattioneday1="";
	var teenpattioneday2="";
if("demandexch99.com"!=window.location.hostname){
	var htmlcasino=	<li className="nav-item newlacunch-menu"><a href="/vip-casino" ><i><img src="/img/darts.png"/></i>Vip Casino</a></li>
    var table_tannis=<li className="nav-item "><a href="/matches/Table-Tennis" ><i className="fas fa-table-tennis"></i>Table Tennis</a></li>
	var html_darts=<li className="nav-item "><a href="/matches/Darts"><i><img src="/img/darts.png"/></i>Darts</a></li> 
	var table_badminton=<li className="nav-item "><a href="/matches/Badminton"><i><img src="/img/badminton.png"/></i>Badminton</a></li>
	var table_basketball=<li className="nav-item "><a href="/matches/Basketball"><i><img src="/img/darts.png"/></i>Basketball</a></li> 
	var table_volleyball=<li className="nav-item "><a href="/matches/volleyball"><i className="fas fa-volleyball-ball"></i>Volleyball</a></li>
	var html_baccarat=<li className="nav-item "><a href="/matches/Baccarat"><i><img src="/img/baccarat.png"/></i>Baccarat</a></li>
	var html_Lucky7=<li className="nav-item "><a href="/luckyseven"><i><img src="/img/7.png"/></i>Lucky 7</a></li>
    var teenpattioneday1= <li className="nav-item "><a href="/casino/one-day-teenpatti" ><i><img src="/img/3-cards.png"/></i>Teenpatti</a></li>	
	
}
if("demandexch99.com"===window.location.hostname){
	var html_poker=	<li className="nav-item"><a href="/matches/poker"><i><img src="/img/darts.png"/></i>Poker</a></li>
	var html_instant_worli=	<li className="nav-item"><a href="/casino/worli2"><i><img src="/img/darts.png"/></i>Instant Worli</a></li>
	var html_teenpatti20= <li className="nav-item"><a href="/casino/teen-patti-t20"><i><img src="/img/darts.png"/></i>Teenpatti-T20</a></li>
	var teenpattioneday2= <li className="nav-item "><a href="/casino/one-day-teenpatti" ><i><img src="/img/3-cards.png"/></i>Teenpatti One Day</a></li>
   
	
}

		  
    return (
        <div>

<ul className="nav nav-tabs nav_top_mobile">
        <li className="nav-item">
		<a href="#" className="nav-link router-link-exact-active router-link-active active">
            In-play
        </a></li> 
		<li className="nav-item"><a href="#" className="nav-link">
            Sports
        </a></li> 
		<li className="nav-item"><a href="/vip-casino" className="nav-link">
            Casino + Slot
        </a></li> 
		<li className="nav-item"><a href="#" className="nav-link">
            Others
        </a></li>
</ul>

    <div className="menu2">
			  
		   <ul className="nav">
			  <li className="nav-item "> 
				<a href="/matches/cricket" ><i className="fas fa-home"></i>Home</a> 
			  </li>
			  <li className="nav-item "> 
	        <a href="/matches/cricket"><i><img src="/img/cricket.png"/></i>Cricket</a> 
			  </li>
			  <li className="nav-item "> 
				<a href="/matches/tennis" ><i class="fas fa-baseball-ball"></i>Tennis</a> 
			  </li>
			  <li className="nav-item "> 
				<a href="/matches/soccer" ><i className="fas fa-futbol"></i>Football</a> 
			  </li> 
			  {table_tannis}
			  {html_darts}
			  {table_badminton}
			  {table_basketball}
			  {table_volleyball}
				{htmlcasino}
				{html_baccarat}


{html_teenpatti20}
{teenpattioneday1}
{teenpattioneday2}

<li className="nav-item "><a href="/casino/dt-one-day" ><i><img src="/img/dragon-tiger.png"/></i>Dragon Tiger</a></li>

<li className="nav-item "><a href="/casino/card32a" ><i><img src="/img/3-cards.png"/></i>32 Cards</a></li> 
{html_poker}

<li className="nav-item "><a href="/casino/andar-bahar" ><i><img src="/img/darts.png"/></i>Andar Bahar</a></li>

{html_Lucky7}
{html_instant_worli}
			</ul>
		  </div>
          </div>
    );
  }
}

export default Menu;