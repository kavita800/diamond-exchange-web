import React, { Component } from 'react';
import {Link,Redirect} from "react-router-dom";
import axios from "axios";
import Url from "../configure/configure.js";
const baseUrl = Url.baseUrl;

class Nav extends Component {
	constructor(props) {
		super(props);
		var accessToken = localStorage.getItem("token");
		this.state = { 
			accessToken: accessToken,
			session_id :"",
			username :"",
			balnce:0,
			exposerAmount:0,
			user_text:"",

			on_off:"",
			qr_code_data:""
		};
	}
	componentWillMount() {
		
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		
		axios.get(baseUrl + '/current',{headers}).then((resp) => {  
			
			if(resp.data.session_id!=undefined){
				if(resp.data.user_status=="N"){
					window.location.href="/login";
					return false;
				}
				
				this.setState({session_id:resp.data.session_id})

			}
			if(resp.data.qr_code_on_off!='null'){
				
				localStorage.setItem("on_off",resp.data.qr_code_on_off);
				
				
			}
			
			localStorage.setItem("qr_code_id",resp.data.qr_code_id);	
			this.setState({on_off:resp.data.qr_code_on_off,qr_code_data:resp.data.qr_code_data})	
			
		});  
	axios.get(baseUrl + '/get_admin_text_value',{headers}).then((resp) => {  
		var resps = resp.data;

			// if (resps.success === true) {
				this.setState({ user_text:resps.value.user_text });
			// }
				
			
		
	});  
		axios.get(baseUrl+ '/user_curr_balance', { headers }).then((resp) => {
			var respNew = resp.data;
			if(respNew.success === true){
				// for(var i=0;i<respNew.adminlist.length;i++) {

				// }

console.log(respNew.adminlist[0]);

var balnce=respNew.adminlist[0].balance +respNew.adminlist[0].profit_loss;
var exposerAmount=Math.abs(respNew.adminlist[0].data_new);
if(exposerAmount===undefined || exposerAmount==''){
	exposerAmount =0;
}
				this.setState({balnce:balnce,exposerAmount:exposerAmount,username:respNew.adminlist[0].username });
			}
		});

	}
  render() {
	var session_id=localStorage.getItem("session_id");
	var qr_code_data=localStorage.getItem("qr_code_data");


	if(this.state.session_id!=undefined && this.state.session_id!=""){
		
		if(session_id!=this.state.session_id){
			localStorage.clear();

			return (
				<Redirect to="/login" />
			);
		}
	}
		if(qr_code_data==''|| qr_code_data===null ){
		
		
			localStorage.clear();

			return (
				<Redirect to="/qr_code" />
			);
		
	}


	var html_logo="";
	var html_logo2="";
if("demandexch99.com"!=window.location.hostname){
	var html_logo=	<a className="navbar-brand mr-1" href="/"><i className="fas fa-home mr-1 mo_op"></i><img src="/img/logo.gif" className="logoman" /> <span>Diamond Exchange</span></a> 
   
}
if("demandexch99.com"===window.location.hostname){
    var html_logo2=	<a className="navbar-brand mr-1" href="/"><i className="fas fa-home mr-1 mo_op"></i><img src="/img/demandexch99.png" className="logoman2" /> </a>    
}
	

    return (

        <nav className="navbar navbar-expand navbar-dark static-top">
		{html_logo}
		{html_logo2}
			
			{/*<button className="btn btn-link btn-sm  order-1 order-sm-0" id="sidebarToggle" href="#">
			  <i className="fas fa-bars"></i>
  </button>*/}
		   
			<form className="d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0 marquee_box">
			  <div class="alarm_icon"><i class="fas fa-bell"></i></div>
				<marquee>{this.state.user_text}</marquee>
			 
			</form>

			
			<ul className="navbar-nav ml-auto ml-md-0 right_nav">
			
			   <li className="nav-item  no-arrow search ">
			  
				<input name="game_keyword" placeholder="All Events" autocomplete="off" type="text" className="" />
				<a href="#"><i className="fas fa-search-plus"></i></a>
				</li>
				{/*<li className="nav-item  no-arrow download-apklink">
				<div>
				<a href="#" className="rules-link m-r-5"><b>Rules</b></a></div> 
				<div>
				<a href="#"><span><b>Download Apk</b> 
				<i className="fab fa-android"></i></span></a>
				</div>
				</li>*/}
			<li className="nav-item  no-arrow ">
				<div className="mobile_dp_inline">
				<span className="re_none">Balance:</span> <i className="fas fa-university mr-1 mo_op"></i> 
				<b><span id="u_bal">{this.state.balnce}</span></b>
				</div>
				<div className="t-underline mobile_dp_inline re_none ">
				<span>Exp<span className="re_none">osure</span>:</span>
				<b><span id="expose">{this.state.exposerAmount}</span></b>
				</div>
				</li>
			  <li className="nav-item dropdown no-arrow">
			  <div className="pc-dp_none mobile_dp_inline flleft">
				<span>Exp<span className="re_none">osure</span>:</span>
				<b><span id="expose">{this.state.exposerAmount}</span></b>
				</div>
				<a className="nav-link dropdown-toggle flright" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				  <span>{this.state.username} <i className="fas fa-chevron-down fa-fw"></i></span>
				</a>
			   <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
			   <Link className="dropdown-item" to="/transactions">Account statement</Link>
					<a className="dropdown-item" href="/unsetteledbet">UnSetteled Bet</a>
					<a className="dropdown-item" href="/profitloss">Profit Loss</a>
					<Link className="dropdown-item" to="/bethistory">Bet History</Link>
				
					
					<a className="dropdown-item dpnone" href="#">Casino Report History</a>
					<a className="dropdown-item" href="/changebuttonvalue">Set Button Values </a>
					<a className="dropdown-item dpnone" href="/change_password">Change Password</a>
					<span className="dropdown-item dpnone" >Balance  
					<div className="custom-control custom-checkbox dropdown_checkbox" >
					<input type="checkbox" class="custom-control-input" id="customCheck" name="example1" />
					<label className="custom-control-label" for="customCheck"></label>
				  </div>
				  </span>
					<span className="dropdown-item dpnone" href="#">Exposure
					<div className="custom-control custom-checkbox dropdown_checkbox" >
					<input type="checkbox" class="custom-control-input" id="customCheck" name="example1" />
					<label className="custom-control-label" for="customCheck"></label>
				  </div>
					</span>
					<a className="dropdown-item dpnone" href="#">Rules</a>
					
					{/* <a className="dropdown-item" href="/qr_authenticator">Google Authenticator  </a> */}
					{/*<a className="dropdown-item" href="change-password.html">Change Password </a> */}
					   <hr />
					 <Link className="text-danger" to="/logout" ><i className="fa fa-sign-out fa-fw"></i>  Logout</Link> 
				</div>
			  </li>
			</ul>
			
		  </nav>
				
    );
  }
}

export default Nav;