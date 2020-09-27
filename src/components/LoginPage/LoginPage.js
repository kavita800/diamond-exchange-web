import React, { Component } from 'react';
var axios = require('axios');
import { Link, Redirect } from "react-router-dom";
import Url from "../configure/configure.js";


import './LoginPage.css';
const { detect } = require('detect-browser');
const browser = detect();
//import { cachedDataVersionTag } from 'v8';
const baseUrl = Url.baseUrl;
var speakeasy = require("squeakeasy");
var QRCode = require('qrcode');
var secret = speakeasy.generateSecret();

var token = speakeasy.totp({
	secret: secret.base32,
	encoding: 'base32'
  });
 
 
// Get the data URL of the authenticator URL

class LoginPage extends Component {

	constructor(props) {
		super(props);
		this.state = { respStatus: '', respMessage: "", gotoindex: false,
		browser_name:"",
		version:"",
		os:"",
		ip_address:"",
	};

	}
	componentWillMount() { 
		localStorage.clear();
		if (browser) {
			var browser_name=browser.name;
			var version=browser.version;
			var os=browser.os;
			this.setState({browser_name:browser_name,version:version,os:os})
			
			
		  }
		  axios.get('https://api.ipify.org/?format=json').then((resp) => { 
				this.setState({ip_address:resp.data.ip})
				  
			});


	}
	goToIndex = () => {
		if (this.state.gotoindex === true) {
			return (
				<Redirect to="/matches/cricket" />
			);
		}
	}
	handleSubmit = (event) => {
		event.preventDefault();
		let loginData = {
			email: this.state.email,
			password: this.state.password
		};

		
		
		axios.post(baseUrl + '/login', loginData).then((resp) => { 
			
			if(resp.data.success == false){
				
                this.setState({respStatus:false,respMessage:resp.data.message});
				setTimeout(() => {this.setState({ respStatus: "",gotoindex:false });}, 10000);
				

            }else{
				if (resp.data.message.user_status ==="Y") {
					
					if (resp.data.message.userType ===6) {
						
					if(resp.data.message.hash_new===undefined || resp.data.message.hash_new===''){
						
						    localStorage.setItem("token", resp.data.message.token);
                            localStorage.setItem("session_id", resp.data.session_id);
                            localStorage.setItem("popup", 1);
                            localStorage.setItem("qr_code_data", 1);
                            let registerData={
                                browser_name:this.state.browser_name,
                                version:this.state.version,
                                os:this.state.os,
                                ip_address:this.state.ip_address,
                            }; 
                            let headers = {
                                Authorization: "Bearer " + localStorage.getItem("token"),
                            }; 
                            axios.post(baseUrl + '/update_browser_details',registerData, {headers}).then((resp) => { 
                                console.log(resp);
                                
                                //var resp = resp.data;
                
                            });
							
                            window.location.href = "/matches/cricket";
                            return false;
					}
					else {
						
							localStorage.setItem("token", resp.data.message.token);
							localStorage.setItem("user_id", resp.data.message._id);
							localStorage.setItem("user_Type", resp.data.message.userType); 
							localStorage.setItem("session_id", resp.data.session_id);
							localStorage.setItem("change_password", 1);
							
							window.location.href = "/change_password";
							return false;
						}
						
					}else{
						this.setState({ respMessage: "Invalid Username And Password",respStatus:false });
					}
				}else{
					
					this.setState({
						respStatus:false,
						respMessage: "Something went wrong Please Contact upline",
					});
					return false;
					window.location.href="/login";
				
				}
            }
			
		});

	}

	handleChange = (event) => {
		let { name, value } = event.target;
		this.setState({ [name]: value });
	}

	responseHtml = () => { 
		if (this.state.respStatus === false) {
			return (
				<div className="alert alert-danger">
					{this.state.respMessage}
				</div>
			)
		}
		else if (this.state.respStatus === true) {
			return (
				<div className="alert alert-success">
					{this.state.respMessage}
				</div>
			)
		}
	}
	render() {

    var htmllogo1="";
	var html_logo2="";
if("demandexch99.com"!=window.location.hostname){
	var htmllogo1=	<img className="login_logo" src="/img/logo.gif"/> 
   
}
if("demandexch99.com"===window.location.hostname){
    var html_logo2=	<img className="login_logotwo" src="/img/demandexch99.png"/>    
}


		return (
			<div className="loginman">
				<div className="container">
				   
					<div className="card card-login mx-auto mmt-12 border-none">
					   
						{htmllogo1}
						{html_logo2}
						 <div className="card-header-1">Login <i className="fas fa-hand-point-down"></i></div>
						<span style={{ color: "red", padding: "0px 70px " }}></span>
						<div className="card-body">
							<form className="form loginform" onSubmit={this.handleSubmit}>
								<div className="form-group">
									<div className="form-label-group">
										<input type="text" id="inputEmail" onChange={this.handleChange} name="email" className="form-control" value={this.state.email} placeholder="User Name" required="required" />
										 <i className="fas fa-user"></i>
									</div>
								</div>
								<div className="form-group">
									<div className="form-label-group">
										<input type="password" id="inputPassword" onChange={this.handleChange} value={this.state.password} className="form-control" placeholder="Password" name="password" required="required" />
										 <i className="fas fa-key"></i>
									</div>
								</div>
								{/* <div className="form-group">
									<div className="checkbox">
										<label>
											<input className="input_mr5" type="checkbox" value="remember-me" /> 
											Remember Password
										</label>
										
									</div>
								</div>*/}
								{this.goToIndex()}
								{this.responseHtml()}
								 <div className="form-group form-label-group">
								<button type="submit" className="btn man_btn width-100">Login <i className=" ml-2 fas fa-sign-in-alt"></i></button>
								
								 </div>
                            {/*<div className="m-t-20 text-center download-apk">
					 <a href="#" className=" btn man_btn width-100">
					 <span className="newlacunch-menu">
					 <i className="fab fa-android"></i><b>Download Apk</b> </span></a>
					
					 </div>*/}
							</form>
							
						</div>
					</div>
					<div class="copy_right">© HPEXCH</div>
				</div></div>
		);
	}
}

export default LoginPage;
