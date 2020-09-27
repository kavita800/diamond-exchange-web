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
var balnce=respNew.adminlist[0].balance +respNew.adminlist[0].profit_loss-respNew.adminlist[0].data_new;
var exposerAmount=respNew.adminlist[0].data_new;
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


	
	

    return (

		<footer className="man_footer">{/**/} {/**/} <p className="text-center">
		© Copyright2020 . All Rights Reserved. Powered By WWW.HPEXCH.COM
		{/**/}</p></footer>
				
    );
  }
}

export default Nav;