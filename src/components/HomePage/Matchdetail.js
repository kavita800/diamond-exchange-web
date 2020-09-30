import React, { Component } from 'react';
import Nav from '../Include/Nav';
import Menu from '../Include/Menu';
import Footer from '../Include/footer';
import Sidebar from '../Include/Sidebar';
import Url from "../configure/configure.js";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Moment from 'moment';
import NumberFormat from 'react-number-format';
import Loading from 'react-fullscreen-loading';
import { useClearCache } from "react-clear-cache";
import Modal from "react-bootstrap-modal";
import socketIOClient from "socket.io-client";
import $ from "jquery";

require("react-bootstrap-modal/lib/css/rbm-complete.css");
const baseUrl = Url.baseUrl;

class Index extends Component {

	constructor(props) {
		super(props);
		var accessToken = localStorage.getItem("token");
		var user_id = localStorage.getItem("user_id");
		this.state = {
			accessToken: accessToken, 
			collapsed: false,
			draw:false,
			getFirstLay: false, 
			getSecondBack: false, 
			user_id: user_id, 
			oddsfirstlay: "",
			matchids: "", 
			BatAmount_second: "", 
			proFitfirstval: "", 
			proFitsecondval: "", 
			getFancybet: false, 
			getFancySecondbet: false,
			pancypickCall:false,
			stake_amount:"",
			respStatus:"",
			respMessage:"",
			emptyField:false,
			loading:true,
			team_profit1:"",
			team_profit2:"",
			new_array : {},
			stackAmount_team1:"",
			stackAmount_team2:"",
			profit22:"",
			profit_team:"",
			loss_team:"",
			profit12:0,
			profit13:0,
			profit14:0,
			loss:0,
			maxminBet:"",
			fancyDataFound:false,
			getFancyResults:"",
			betClick1:false,
			headname:"",
			SessInptNo:"",
			no:"",
			yes:"",
			status:"",
			buttonvalue_new:"",
			min_bookmaker       : "",
			max_bookmaker: "",
			bookmaker_team_a: "",
			bookmaker_back_1: "",
			bookmaker_back_2: "",
			bookmaker_back_3: "",
			bookmaker_lay_2:"",
			bookmaker_lay_3: "",
			bookmaker_b_back_1: "",
			bookmaker_b_back_2: "",
			bookmaker_b_back_3: "",
			bookmaker_b_lay_2: "",
			bookmaker_b_blay_3: "",
			bookmaker_b_status :  "",
			no_data_model:"",yes_data_model:"",color_data_model:"",showUserAmountPopup:false,
			key_index:"",
			bookmaker_draw:false,
			bookmakerFirstTeamFound:false,
			bookmakerSecondTeamFound:false,
			fancyMatchSuspend:false,
			oddsMatchSuspend:false,
			showVideo:false,
			showVideoFromAdmin:false,
			currentMatchId : this.props.match.params.id,
			getFancyResultsHide:"",
			showBookMakerLiveApiData:true,
			max_bookmaker_limit:'N/A',
			min_bookmaker_limit:'N/A',
			max_fancy_limit:'N/A',
			min_fancy_limit:'N/A',
			profit15:0,
			profit16:0,
			profit17:0,
			Newdate:0,
			buttonValue111:""
		};
		this.emailInput = React.createRef();
		this.currentUserDetail();
		this.callBookmakerFromAdminApi();

	}
	
	fnum=(x)=> {
		if(isNaN(x)) return x;

		if(x < 999) {
			return x;
		}
		
		if(x < 1000000) {
			return (x/1000).toFixed(2) + "K";
		}
		if( x < 10000000) {
			return (x/1000000).toFixed(2) + "M";
		}

		if(x < 1000000000) {
			return Math.round((x/1000000)) + "M";
		}

		if(x < 1000000000000) {
			return Math.round((x/1000000000)) + "B";
		}

		return "1T+";
	}

	onFirstLayClick = () => {
		const { getFirstLay } = this.state;
		this.setState(() => ({
			getFirstLay: !getFirstLay
		}));
	};

	onSecondLayClick = () => {
		const { getSecondBack } = this.state;
		this.setState(() => ({
			getSecondBack: !getSecondBack
		}));
	};

	currentUserDetail = () => {
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		}; 
		axios.get(baseUrl + '/current',{headers}).then((resp) => {  
			var resp= resp.data;
			
			this.setState({userData:resp})
		});  
	}	
	getUserCurrentBalance = () => {
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		}; 
		axios.get(baseUrl + '/maxbet_minbet/'+this.props.match.params.id,{headers}).then((resp) => {  
			var resp= resp.data;
			var innerData = resp.adminlist;
			var min_fancy_limit = innerData.fancy_minimum_bet_limit!==undefined ? innerData.fancy_minimum_bet_limit : 'N/A';
			var max_fancy_limit = innerData.fancy_maximum_bet_limit!==undefined ? innerData.fancy_maximum_bet_limit : 'N/A';
			
			this.setState({maxminBet:resp,min_fancy_limit:min_fancy_limit,max_fancy_limit:max_fancy_limit})
		});  
	}

	getFancybet = () => {
		if (this.state.getFancybet === true) {
			return (<tr style={{ background: "#F3DCE2" }}>
				<td className="text-center"><a href="#" className="text-danger"> <i className="fa fa-times"></i> </a></td>
				<td id="team_nm">{this.state.teamname1}</td>
				<td style={{ width: "75px" }} >
					<div className="form-group">
						<input value={this.state.amountFancybetBal} name="amountFancybetBal" className="amountint" onChange={this.handleChange} type="number" style={{ float: "left", width: "45px", verticalAlign: "middle" }} id="odds" readOnly required="required" />
					</div>
				</td>
				<td>
					<div className="form-group bet-stake">
						<input value={this.state.amountFancybetFirst} name="amountFancybetFirst" type="text" onChange={this.handleChange} id="btn_val" style={{ width: "52px" }} maxLength="10" required="required" />
					</div>
				</td>  </tr>);
		}
	}
	getFancybetPoint = () => {

		if (this.state.getFancybet === true) {

			return (<tr style={{ background: "#F3DCE2" }}>
				<td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
					<button className="btn btn-success btn_dyn" value="4" onClick={e => this.onTestClickFancyFirst(e)}>4</button>
					<button className="btn btn-success btn_dyn" value="20" onClick={e => this.onTestClickFancyFirst(e)}>20</button>
					<button className="btn btn-success btn_dyn" value="30" onClick={e => this.onTestClickFancyFirst(e)}>30</button>
					<button className="btn btn-success btn_dyn" value="50" onClick={e => this.onTestClickFancyFirst(e)}>50</button>
					<button className="btn btn-success btn_dyn" value="500" onClick={e => this.onTestClickFancyFirst(e)}>500</button>
					<button className="btn btn-success btn_dyn" value="1000" onClick={e => this.onTestClickFancyFirst(e)}>1000</button>
				</td></tr>);
		}
	}


	getFirstLayPoint = () => {

		if (this.state.getFirstLay === true) {
			

			return (<tr style={{ background: "#F3DCE2" }}>
				<td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
					<button className="btn btn-success btn_dyn" value="4" onClick={e => this.onTestClick(e)}>4</button>
					<button className="btn btn-success btn_dyn" value="20" onClick={e => this.onTestClick(e)}>20</button>
					<button className="btn btn-success btn_dyn" value="30" onClick={e => this.onTestClick(e)}>30</button>
					<button className="btn btn-success btn_dyn" value="50" onClick={e => this.onTestClick(e)}>50</button>
					<button className="btn btn-success btn_dyn" value="500" onClick={e => this.onTestClick(e)}>500</button>
					<button className="btn btn-success btn_dyn" value="1000" onClick={e => this.onTestClick(e)}>1000</button>
				</td></tr>);
		}
	}
	// getFirstLayLiability = () => {

	// 	if (this.state.getFirstLay === true) {

	// 		return (<tr style={{ background: "#F3DCE2" }}>
	// 			<td></td><td></td><td></td><td>Liability</td>
	// 			<td> {this.state.proFitfirstval}</td></tr>);
	// 	}
	// }
	getSecondLayPoint = () => {

		if (this.state.getSecondBack === true) {

			return (<tr style={{ background: "#BEDDF4" }}>
				<td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
					<button className="btn btn-success btn_dyn" value="4" onClick={e => this.onTestClickSecond(e)}>4</button>
					<button className="btn btn-success btn_dyn" value="20" onClick={e => this.onTestClickSecond(e)}>20</button>
					<button className="btn btn-success btn_dyn" value="30" onClick={e => this.onTestClickSecond(e)}>30</button>
					<button className="btn btn-success btn_dyn" value="50" onClick={e => this.onTestClickSecond(e)}>50</button>
					<button className="btn btn-success btn_dyn" value="500" onClick={e => this.onTestClickSecond(e)}>500</button>
					<button className="btn btn-success btn_dyn" value="1000" onClick={e => this.onTestClickSecond(e)}>1000</button>
				</td></tr>);
		}
	}
	getSecondFancybetPoint = () => {

		if (this.state.getFancySecondbet === true) {

			return (<tr style={{ background: "#BEDDF4" }}>
				<td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
					<button className="btn btn-success btn_dyn" value="4" onClick={e => this.onTestClickFancySecond(e)}>4</button>
					<button className="btn btn-success btn_dyn" value="20" onClick={e => this.onTestClickFancySecond(e)}>20</button>
					<button className="btn btn-success btn_dyn" value="30" onClick={e => this.onTestClickFancySecond(e)}>30</button>
					<button className="btn btn-success btn_dyn" value="50" onClick={e => this.onTestClickFancySecond(e)}>50</button>
					<button className="btn btn-success btn_dyn" value="500" onClick={e => this.onTestClickFancySecond(e)}>500</button>
					<button className="btn btn-success btn_dyn" value="1000" onClick={e => this.onTestClickFancySecond(e)}>1000</button>
				</td></tr>);
		}
	}
	// getSecondLayLiability = () => {
	// 	if (this.state.getSecondBack === true) {
	// 		return (<tr style={{ background: "#BEDDF4" }}>
	// 			<td></td><td></td><td></td><td>Liability</td>
	// 			<td>{this.state.proFitsecondval}</td></tr>);
	// 	}
	// }

	getFirstLay = () => {
		if (this.state.getFirstLay === true) {
			return (<tr style={{ background: "#F3DCE2" }}>
				<td className="text-center"><a href="#" className="text-danger"> <i className="fa fa-times"></i> </a></td>
				<td id="team_nm">{this.state.teamname1}</td>
				<td style={{ width: "75px" }} >
					<div className="form-group">
						<input value={this.state.lastPriceTraded1} name="lastPriceTraded1" className="amountint" onChange={this.handleChange} type="text" style={{ float: "left", width: "45px", verticalAlign: "middle" }} id="odds" required="required" readOnly/>
					</div>
				</td>
				<td>
					<div className="form-group bet-stake">
						<input value={this.state.amountshowFirst} name="amountshowFirst" type="text" onChange={this.handleChange} id="btn_val" style={{ width: "52px" }} maxLength="10" required="required" />
					</div>
				</td> <td id="prft" className="text-right"><input value={this.state.proFitfirstval} name="proFitsecondval" onChange={this.handleChange} type="text" readOnly style={{ float: "left", width: "45px", verticalAlign: "middle" }} /></td></tr>);
		}
	}
	getSecondBack = () => {
		if (this.state.getSecondBack === true) {
			return (<tr style={{ background: "#BEDDF4" }}>
				<td className="text-center"><a href="#" className="text-danger"> <i className="fa fa-times"></i> </a></td>
				<td id="team_nm">{this.state.teamname2}</td>
				<td style={{ width: "75px" }} >
					<div className="form-group">
						<input value={this.state.lastPriceTraded2} name="lastPriceTraded2" className="amountint" onChange={this.handleChange} type="number" required="required" maxLength="4" style={{ float: "left", width: "45px", verticalAlign: "middle" }} id="odds" />
					</div>
				</td>
				<td>
					<div className="form-group bet-stake">
						<input id="btn_val" style={{ width: "52px" }} maxLength="10" value={this.state.amountshowSecond} type="text" onChange={this.handleChange} required="required" />
					</div>
				</td>
				<td id="prft" className="text-right"><input value={this.state.proFitsecondval} name="proFitsecondval" onChange={this.handleChange} type="text" readOnly style={{ float: "left", width: "45px", verticalAlign: "middle" }} /></td></tr>);
		}
	}
	getFancySecondbet = () => {
		if (this.state.getFancySecondbet === true) {
			return (<tr style={{ background: "#BEDDF4" }}>
				<td className="text-center"><a href="#" className="text-danger"> <i className="fa fa-times"></i> </a></td>
				<td id="team_nm">{this.state.teamname2}</td>
				<td style={{ width: "75px" }} >
					<div className="form-group">
						<input value={this.state.amountFancybetBalSecond} name="lastPriceTraded2" className="amountint" onChange={this.handleChange} type="number" required="required" maxLength="4" style={{ float: "left", width: "45px", verticalAlign: "middle" }} id="odds" readOnly />
					</div>
				</td>
				<td>
					<div className="form-group bet-stake">
						<input id="btn_val" style={{ width: "52px" }} maxLength="10" value={this.state.amountFancybetSecond} type="text" onChange={this.handleChange} required="required" />
					</div>
				</td> </tr>);
		}
	}

	onTestClick(e) {
		e.preventDefault();
		const buttonValue = e.target.value;
		var minusone = (this.state.lastPriceTraded1 - 1);
		var multiplyval = (minusone * buttonValue);
		var numValue = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2 }).format(multiplyval);

		this.setState({
			amountshowFirst: buttonValue,
			proFitfirstval: numValue
		})
	}
	onTestClickSecond(e) {
		e.preventDefault();
		const buttonValue = e.target.value;
		var minusone = (this.state.lastPriceTraded2 - 1);
		var multiplyval = (minusone * buttonValue);
		var numValue = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2 }).format(multiplyval);
 
		this.setState({
			amountshowSecond: buttonValue,
			proFitsecondval: numValue
		})
	}

	onTestClickFancyFirst(e) {
		e.preventDefault();
		const buttonValue = e.target.value;
		var minusone = (this.state.lastPriceTraded1 - 1);
		var multiplyval = (minusone * buttonValue);
		var numValue = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2 }).format(multiplyval);

		this.setState({
			amountFancybetFirst: buttonValue 
		})
	}
	onTestClickFancySecond(e) {
		e.preventDefault();
		const buttonValue = e.target.value;
		var minusone = (this.state.lastPriceTraded1 - 1);
		var multiplyval = (minusone * buttonValue);
		var numValue = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2 }).format(multiplyval);

		this.setState({
			amountFancybetSecond: buttonValue 
		})
	}
	cancelCourse = () => {
		window.location = "/matchdetail/" + this.state.matchids;
		//this.setState({ amountshowFirst: "", amountshowSecond: "", proFitfirstval: "", proFitsecondval: "" });
	}

	handleSubmit = (event) => {
	
		event.preventDefault();
		
		
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		
		let matchid = this.props.match.params.id;
		let compareMainAmount = "";
		let current_market_odds = "";
		let type = "unmatch";
		let betOn = this.state.betOn;
		if(this.state.betMatchType==="teamone" && this.state.type==="back"){
			 compareMainAmount = (betOn==="bookmaker") ? this.state.bookmaker_a_back_1 : this.state.teamOneFirstBack;
			 current_market_odds = (betOn==="bookmaker") ? this.state.bookmaker_a_back_1 : this.state.teamOneFirstBack;
		}
		else if(this.state.betMatchType==="teamone" && this.state.type==="lay"){
			 compareMainAmount = (betOn==="bookmaker") ? this.state.bookmaker_a_lay_1 : this.state.teamOneFirstLay;
			 current_market_odds = (betOn==="bookmaker") ? this.state.bookmaker_a_lay_1 : this.state.teamOneFirstLay;
		}
		else if(this.state.betMatchType==="teamtwo" && this.state.type==="back"){
			 compareMainAmount = (betOn==="bookmaker") ? this.state.bookmaker_b_back_1 : this.state.teamTwoFirstBack;
			 current_market_odds = (betOn==="bookmaker") ? this.state.bookmaker_b_back_1 : this.state.teamTwoFirstBack;
		}
		else if(this.state.betMatchType==="teamtwo" && this.state.type==="lay"){
			 compareMainAmount = (betOn==="bookmaker") ? this.state.bookmaker_b_lay_1 : this.state.teamTwoFirstLay;
			 current_market_odds = (betOn==="bookmaker") ? this.state.bookmaker_b_lay_1 : this.state.teamTwoFirstLay;
		}
		else if(this.state.betMatchType==="draw" && this.state.type==="back"){
			 compareMainAmount = (betOn==="bookmaker") ? this.state.bookmaker_d_back_1 : this.state.drawFirstBack;
			 current_market_odds = (betOn==="bookmaker") ? this.state.bookmaker_d_back_1 : this.state.drawFirstBack;
		}
		else if(this.state.betMatchType==="draw" && this.state.type==="lay"){
			 compareMainAmount = (betOn==="bookmaker") ? this.state.bookmaker_d_lay_1 : this.state.drawFirstLay;
			 current_market_odds = (betOn==="bookmaker") ? this.state.bookmaker_d_lay_1 : this.state.drawFirstLay;
		}
		
		if(this.state.betOn==="manual_bookmaker") {
			if(this.state.betMatchType==="teamone" && this.state.type==="back"){
				 compareMainAmount = this.state.bookMakerAdminData.first_team_back;
				 current_market_odds = this.state.bookMakerAdminData.first_team_back;
			}
			else if(this.state.betMatchType==="teamone" && this.state.type==="lay"){
				 compareMainAmount = this.state.bookMakerAdminData.first_team_lay;
				 current_market_odds = this.state.bookMakerAdminData.first_team_lay;
			}
			else if(this.state.betMatchType==="teamtwo" && this.state.type==="back"){
				 compareMainAmount = this.state.bookMakerAdminData.second_team_back;
				 current_market_odds = this.state.bookMakerAdminData.second_team_back;
			}
			else if(this.state.betMatchType==="teamtwo" && this.state.type==="lay"){
				 compareMainAmount = this.state.bookMakerAdminData.second_team_lay;
				 current_market_odds = this.state.bookMakerAdminData.second_team_lay;
			}
			else if(this.state.betMatchType==="draw" && this.state.type==="back"){
				 compareMainAmount = this.state.bookMakerAdminData.draw_back;
				 current_market_odds = this.state.bookMakerAdminData.draw_back;
			}
			else if(this.state.betMatchType==="draw" && this.state.type==="lay"){
				 compareMainAmount = this.state.bookMakerAdminData.draw_lay;
				 current_market_odds = this.state.bookMakerAdminData.draw_lay;
			}
		}
		
		
		
		
		
		if(compareMainAmount === this.state.oddVal){
			type = "match";
		}

		var loss="";
		var new_array=[];
		var loss_team="";
		var newpath =0;
		if(this.state.betMatchType=="teamone"){
			 // ////////////console.logthis.state.stackAmount_team2);
			loss=this.state.stackAmount_team2;
			if(this.state.stackAmount_team2!=undefined){
				 newpath=Math.abs(this.state.stackAmount_team2);
			}	
			
			loss_team="teamtwo";
		}
		 if(this.state.betMatchType=="teamtwo"){
			loss=this.state.stackAmount_team1;
			if(this.state.stackAmount_team1!=undefined){
				 newpath=Math.abs(this.state.stackAmount_team1);
					
					
			}	
			
			
			loss_team="teamone";
		}

		
		
		
		if(isNaN(parseInt(this.state.oddVal)) || this.state.oddVal<=0){
			this.setState({emptyField:true,errMsg:"Enter Valid Odds"});
			return false;
		}
		if(isNaN(parseInt(this.state.stake_amount)) || this.state.stake_amount<=0){
			this.setState({emptyField:true,errMsg:"Enter Stake"});
			return false;
		}		
		
		if(this.state.betOn=="bookmaker"){
			var data123=this.state.oddVal
				if(Number.isInteger(parseFloat(this.state.oddVal))==true){
				var data123=parseFloat(this.state.oddVal)/parseFloat(100);
					var data123=parseFloat(1)+data123
				}else{
					var data123=parseFloat(this.state.oddVal)-parseFloat(1)
				}
			}else{
				var data123=this.state.oddVal;
			}
			var exposure=0;
			if(Math.sign(this.state.team_profit1)==-1){
				exposure=this.state.team_profit1;
			}
			if(Math.sign(this.state.team_profit2)==-1){
				exposure=this.state.team_profit2;
			}

			if(Math.sign(this.state.team_profit3)==-1){
				exposure=this.state.team_profit3;
			}

			if(Math.sign(this.state.stackAmount_team1)==-1){
				exposure=this.state.stackAmount_team1;
			}
			if(Math.sign(this.state.stackAmount_team2)==-1){
				exposure=this.state.stackAmount_team2;
			}
			if(Math.sign(this.state.stackAmount_team3)==-1){
				exposure=this.state.stackAmount_team3;
			}

			if(Math.sign(this.state.team_profit4)==-1){
				exposure=this.state.team_profit4;
			}
			if(Math.sign(this.state.team_profit5)==-1){
				exposure=this.state.team_profit5;
			}

			if(Math.sign(this.state.team_profit6)==-1){
				exposure=this.state.team_profit6;
			}

			if(Math.sign(this.state.stackAmount_team4)==-1){
				exposure=this.state.stackAmount_team4;
			}
			if(Math.sign(this.state.stackAmount_team5)==-1){
				exposure=this.state.stackAmount_team5;
			}
			if(Math.sign(this.state.stackAmount_team6)==-1){
				exposure=this.state.stackAmount_team6;
			}






		let savebet = {
			event_id: this.props.match.params.id,
			event_name: this.state.eventName,
			odds: parseFloat(data123).toFixed(2),
			stake: this.state.stake_amount,
			profit: this.state.profit,
			bet_type: this.state.type,
			type: type,
			team_name: this.state.teamName,
			selection_id: this.state.betSelectionId,
			market_id: this.state.betMarketId,
			current_market_odds:current_market_odds,
			profit_team:this.state.betMatchType,
			loss_team:loss_team,
			loss:newpath,
			color:this.state.color,
			event_type:this.props.match.params.id1,
			type1:"odds",
			bet_on:this.state.betOn,
			exposure:exposure

		}; 
		var delay_time=this.state.userData.cricket_delay*1000
		if(this.state.betOn=="bookmaker"){
			var delay_time=0
		}
		
		$(".blockUI").show();
	
		setTimeout(
			() => axios.post(baseUrl + '/createbetuser', savebet,{headers}).then((resp) => {
				var resp = resp.data;
				if(resp.success === true){
					this.setState({
						respStatus: resp.success,
						respMessage:resp.message,
						oddVal:"",
						stake_amount:"",
						profit:"",
						team_profit1:"",
						stackAmount_team1:"",
						team_profit2:"",
						stackAmount_team2:"",
						stackAmount_team3:"",
						team_profit3:"",
						stackAmount_team4:"",
						stackAmount_team5:"",
						stackAmount_team6:"",
						team_profit4:"",
						team_profit5:"",
						team_profit6:"",
					});

					this.getUserCurrentBalance();
					this.showTableHtml();
					$(".blockUI").hide();
				setTimeout(() => {this.setState({ respStatus: "",betClick1:false,betClick:false ,betClick2:false});}, 3000);
				} else {
					this.setState({
						respStatus: resp.success,
						respMessage:resp.message,
						
					});
					$(".blockUI").hide();
					setTimeout(() => {this.setState({ respStatus: "",betClick1:false,betClick:false ,betClick2:false});}, 3000);
				}
				this.callUserBetListApi();
				$(".blockUI").hide();
			})
	, 
	delay_time
		  );
	
		
	}
	handleSubmitSession = (event) => {
	
		event.preventDefault();
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		
		let matchid = this.props.match.params.id;
		var yes_amount="";
		var no_amount ="";
		var new_value="";
		
		var no_amount1="";
		if(this.state.no==="no"){
			new_value =this.state.session_input;
			no_amount=this.state.session_input;
			var no_amount1=this.state.no;
		}
		if(this.state.no==="yes"){
			new_value =this.state.session_input;
			no_amount=this.state.session_input;
			var no_amount1=this.state.no;
		}
		var exposure="-"+this.state.stake_amount;
		
		let savebet = {
			event_id: this.props.match.params.id,
			event_name: this.state.eventName,
			yes: this.state.yes,
			no: no_amount1,
			market_id: this.state.betMarketId,
			type:"match",
			no_amount: this.state.session_input,
			stake:this.state.stake_amount,
			headname:this.state.headname,
			team_name:this.state.headname,
			odds:new_value,
			bet_type:"fancy",
			color:this.state.color,
			key_index:this.state.key_index,
			event_type:this.props.match.params.id1,
			type1:"fancy",
			yes_no_stake:this.state.yes_no_STAKE,
			bet_on:'fancy',
			lay_price:this.state.layPrice,
			lay_size:this.state.laySize,
			back_price:this.state.backPrice,
			back_size:this.state.backSize,
			exposure:exposure,
		}; 
		
		

		axios.post(baseUrl + '/createbetuser', savebet,{headers}).then((resp) => {
			var resp = resp.data;
			if(resp.success === true){
				this.setState({
					respStatus: resp.success,
					respMessage:resp.message,
					oddVal:"",
					stake_amount:"",
					profit:"",
					team_profit1:"",
					stackAmount_team1:"",
					team_profit2:"",
					stackAmount_team2:"",
					
				});
				this.getUserCurrentBalance();
				this.showTableHtml();
				setTimeout(() => {this.setState({ respStatus: "" ,betClick1:false,betClick:false});}, 6000);
			} else {
				this.setState({
					respStatus: resp.success,
					respMessage:resp.message,
									});
				setTimeout(() => {this.setState({ respStatus: "",betClick1:false,betClick:false });}, 6000);
			}
			this.callUserBetListApi();
		});

	}
	
	responseHtml = () =>{ 
      if(this.state.respStatus === false) {
          return (
          <div className="alert alert-danger">
          {this.state.respMessage}
          </div>
          )
        }
        else if(this.state.respStatus === true) {
           return (
            <div className="alert alert-success">
            {this.state.respMessage}
            </div>
           )
        }
     } 
  
   emptyHtml = () =>{
	
      if(this.state.emptyField === true) {
         return (
          <div className="alert alert-danger">
          {this.state.errMsg}
          </div>
         )
      }
   }
	
	
	handleFancybetSubmit = (event) => {

		event.preventDefault();
		let savebet = {
			event_id: this.props.match.params.id,
			user_id: this.state.user_id,
			team_id: this.state.teamid1,
			team_id_second: this.state.teamid2,
			matchids: this.state.matchids,
			eventName: this.state.eventName,
			Odds: this.state.marketName,
			odds_first_lay: this.state.amountFancybetBal,
			odds_second_lay: this.state.amountFancybetBalSecond,
			teamname: this.state.teamname1,
			teamname_second: this.state.teamname2,
			BatAmount: this.state.amountFancybetFirst*this.state.amountFancybetBal,
			BatAmount_second: this.state.amountFancybetSecond*this.state.amountFancybetBalSecond,
			eventTypeId: this.state.eventTypeId,
			color:this.state.color,
			event_type:this.props.match.params.id1,
			type1:"bookmaker"
		};
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		axios.post(baseUrl + '/createbetuser', savebet,{headers}).then((resp) => {
			if (resp.data.success != false) {
				this.setState({
					respStatus: resp.success,
					stake_amount:"",
					profit4:"",
					team_profit1:"",
					stackAmount_team4:"",
					team_profit5:"",
					stackAmount_team5:"",
					stackAmount_team6:"",
					team_profit6:"",
					
				});
				setTimeout(() => {this.setState({ respStatus: "",betClick1:false,betClick:false });}, 6000);
				window.location.href = "/matchdetail/" + resp.data.result.matchids;
			} else {
				this.setState({
					
					respMessage: resp.data.message,
				});
				setTimeout(() => {this.setState({ respStatus: "",betClick1:false,betClick:false });}, 6000);
			}
		});

	}


	componentWillMount() {
		
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		if(this.props.location.state!=undefined){
			const { Newdate } = this.props.location.state

			localStorage.setItem("mytime", Newdate);
			this.setState({Newdate111:Newdate})
			}
		
		else{
			var Newdate111 = localStorage.getItem('mytime');
			this.setState({Newdate111:Newdate111})


		}
		
		// $(".blockUI").show();
		//this.callMatchOddsApi();
		const ENDPOINT = "http://18.159.217.229:4004/";
		 let matchid = this.props.match.params.id;
		//  const socket = socketIOClient(ENDPOINT);
		//  socket.on("FromAPI4", data => {
		//    //setResponse(data);
		//  ////console.logdata);
		// //   this.setState({casinodt20:data.data1.data})
		// //   this.callMatchOddsApi(data.data);
		//  });
		
		 	const socket=	socketIOClient(ENDPOINT, {query: `match_id=${this.props.match.params.id}&sport_type=${this.props.match.params.id1}&`});
			socket.on("FromAPI4", data => {
				
			 if(data.success===false) {
				 

				$("#dyn_bind").remove();
				$(".coupon-table").remove();
				$(".bet-info").remove();
				$("#div_fancy").remove();
			}
			else { 
			//console.log(data);
				this.callMatchOddsApi(data.data,data.suspendcount,data.fancyInActiveList,data.fancySuspendList,data.unmatchOddStatus);
			}
			
		 //   this.setState({casinodt20:data.data1.data})
		 //   this.callMatchOddsApi(data.data);
		  });
		
		axios.get(baseUrl + '/button_value', { headers }).then((resp) => {
			var resps = resp.data;

			if (resps.success === true) {
				this.setState({ buttonValue111: resps.value });
			}
		});
		// $(".blockUI").hide();
		this.getUserCurrentBalance();
		this.callUserBetListApi();
		this.callFancyListApi();
	
		//let counterFancy = setInterval(this.callFancyListApi , 6000);
		//let counter = setInterval(this.callMatchOddsApi , 6000);
	}
	
	
	callFancyListApi =()=>{
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		
		 let matchid = this.props.match.params.id;
		// this.callMatchOddsApi()
		axios.get(baseUrl + '/fancyapi/'+matchid, { headers }).then((resp) => {
			var matchSuspendFromAdmin = (resp.data.suspendcount===0) ? false : true; 
			this.setState({ getFancyResults: resp.data.alldata.data, fancyDataFound: true,fancyMatchSuspend:matchSuspendFromAdmin });
		});
		// axios.get(baseUrl + '/fancy_result_admin/1/'+matchid, { headers }).then((respFancy) => {
		// 	//////console.logrespFancy);
		// 	this.setState({ getFancyResultsHide: respFancy.data.hide_show,  });
		// });
		$(".blockUI").hide();
	}
	handleModelShow =(id,no,yes,no_stake,yes_stake)=>{
		//////console.logno);
		//////console.logyes);
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		let savebet = {
		
			match_id:this.props.match.params.id,
			match_name:id,
			}
		
		// this.callMatchOddsApi()
		axios.post(baseUrl + '/userbetdata',  savebet,{headers}).then((resp) => {
			this.setState({no_data_model:resp,showUserAmountPopup:true,})
			
		});
	}
	
	
	showFancyApiHtml = () => {
		if (this.state.fancyDataFound === true) {
			const html = [];
			var new_array=[];
			var new_array1=[];
			var new_array2=[];
			
			if(this.state.getResults!=undefined){
				for(var i=0;i<this.state.getResults.length;i++){
					if(this.state.getResults[i].bet_type=="fancy"){
						if(this.state.getResults[i].key_index!=null && this.state.getResults[i].key_index!=undefined){
							new_array[this.state.getResults[i].key_index]=(this.state.getResults[i].key_index);
							new_array1[this.state.getResults[i].key_index]=(this.state.getResults[i].stake);
							new_array2[this.state.getResults[i].key_index]=(this.state.getResults[i]._id);
						}
							
							
							
						
					}
				
				}
			}
			
			
			
		
			
			if(this.state.getFancyResultsHide!==undefined){
			
				var index=0;
				var i=0;
				var hideMatchArr1=["demo"];
				//////console.logthis.state.getFancyResultsHide);
				if(this.state.getFancyResultsHide!==null){
					
					if(this.state.getFancyResultsHide!=undefined && this.state.getFancyResultsHide!=null && this.state.getFancyResultsHide!='' ){
						for(var bn=0;bn<this.state.getFancyResultsHide.length;bn++){
							if(this.state.getFancyResultsHide[bn].hide=='suspended' || this.state.getFancyResultsHide[bn].hide=="suspend"){
								hideMatchArr1.push(this.state.getFancyResultsHide[bn].market_id);
							}
							
						}
					}
					
				}
			
				if(this.state.getFancyResults!=undefined){
					for(let fancyNewData of Object.values(this.state.getFancyResults))
					{
						
						var blockHtml='';
						//////console.loghideMatchArr1.indexOf(fancyNewData.market_id));
						if(hideMatchArr1.indexOf(fancyNewData.market_id) !='-1'){ 
		
							var blockHtml= <div className="bet-info suspendedfancy row"><span>SUSPENDED</span></div>;
						}
					
						var new_value="";
						var new_value1="";
					
						

						if(this.state.fancyMatchSuspend && hideMatchArr1.indexOf(fancyNewData.market_id) =='-1'){
							var blockHtml= <div className="bet-info suspendedfancy row"><span>SUSPENDED</span></div>;
						}
						else if(hideMatchArr1.indexOf(fancyNewData.market_id) =='-1') {
							var blockHtml= (fancyNewData.DisplayMsg!="") ? <div className="bet-info suspendedfancy row"><span>{fancyNewData.DisplayMsg}</span></div> : "";
						}
						
						if(fancyNewData.market_id==new_array[fancyNewData.market_id]){
						
							if(fancyNewData.SessInptNo !==undefined && fancyNewData.SessInptYes!==undefined){
								
								//if(fancyNewData.DisplayMsg!="SUSPENDED"){
									html.push(<tr>
										<td className="fb_64">< a href="#"
										 > {fancyNewData.headname} 
										  &nbsp;(-{new_array1[fancyNewData.market_id]} )</a>
										  <button className="tableman_btn" onClick={this.handleModelShow.bind(this,fancyNewData.market_id,fancyNewData.SessInptNo,fancyNewData.SessInptYes,)}>Book</button>
										 </td>
										<td  className="box-w1 lay-color fb_td">{blockHtml}
										<button className="bet-sec lay" value={i} onClick={this.handleBidClickSession.bind(this, '#faa9ba',fancyNewData.headname,"no",this.state.marketId,fancyNewData.SessInptNo,"",fancyNewData.market_id)}><span className="odd layprice"> {fancyNewData.SessInptNo}</span>{fancyNewData.NoValume}</button></td>
								 		
									
										<td  className="box-w1 back-color fb_td">
										<button value={i} onClick={this.handleBidClickSession.bind(this, '#72bbef',fancyNewData.headname,"yes",this.state.marketId,fancyNewData.SessInptYes,"",fancyNewData.market_id)} className="bet-sec lay"><span className="odd layprice"> {fancyNewData.SessInptYes}</span>{fancyNewData.YesValume}</button></td>
				
				
				
				
										<td className="fb_td" style={{ textAlign: "center" }}> Min {this.state.min_fancy_limit} <br/> Max {this.state.max_fancy_limit}  </td>
									</tr>);
								//}
							}
						 }else{
							if(fancyNewData.SessInptNo !==undefined && fancyNewData.SessInptYes!==undefined){
								
								//if(fancyNewData.DisplayMsg!="SUSPENDED"){
									html.push(<tr>
										<td className="fb_64"> {fancyNewData.headname}  
										
										 </td>
										<td  className="box-w1 lay-color"> {blockHtml}
										<button className="bet-sec lay" value={i} onClick={this.handleBidClickSession.bind(this, '#faa9ba',fancyNewData.headname,"no",this.state.marketId,fancyNewData.SessInptNo,"",fancyNewData.market_id,fancyNewData.SessInptYes)}><span className="odd layprice"> {fancyNewData.SessInptNo}</span>{fancyNewData.NoValume}</button></td>
										
									
										<td  className="box-w1 back-color fb_td">
										<button value={i} onClick={this.handleBidClickSession.bind(this, '#72bbef',fancyNewData.headname,"yes",this.state.marketId,fancyNewData.SessInptYes,"",fancyNewData.market_id,fancyNewData.SessInptNo)} className="bet-sec lay"><span className="odd layprice"> {fancyNewData.SessInptYes}</span>{fancyNewData.YesValume}</button></td>
				
				
				
										<td className="fb_td" style={{ textAlign: "center" }}>  Min {this.state.min_fancy_limit} <br/> Max {this.state.max_fancy_limit}    </td>
									</tr>);
								//}
							}
						}
						
						
						//if(fancyNewData.SessInptNo > 0 && fancyNewData.SessInptYes>0) {
							
						//}
						index++
						i++;
					
				}
				}
				//getFancyResultsHide
			
			
				
		}
			
	
			return <table className="coupon-table table table-bordered">
				<thead>
					<tr>
						<th> &nbsp;</th>
						<th className="text-center  box-w1 lay"> No </th>
						<th className="text-center  box-w1 back" style={{backgroundColor:'#72BBEF'}} > Yes </th>
						<th className="box-w2"> &nbsp; </th>
						
					</tr>
				</thead>
				<tbody>{html}</tbody>
			</table>;
		}
	}
	
	
	
	
	callUserBetListApi=()=>{
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		
		 let matchid = this.props.match.params.id;
		// this.callMatchOddsApi()
		axios.get(baseUrl + '/userbetlist/'+matchid, { headers }).then((resp) => {
			var resps = resp.data;
			var profit12=0;
			var profit13=0;
			if (resps.success === true) {
				this.setState({ getResults: resps.Betlist, betDataFound: true });
			}
		});
	}
	
	callMatchOddsApi=(data,isSuspend,fancyInActiveList,fancySuspendList,unmatchOddStatus)=>{
	
	
		 const new_array = {};
		//////console.logdata);
		//var getResult1 = data.data
		 // var matchOpenDate = data.data1[0].open_date;
		  // this.setState({getResult11:resp,openMatchDate:matchOpenDate})
		 
		  //new_array['bookmaker_min']=bookmaker[0]
		 // ////////////console.logbookmaker.t2[0]);
			
			
			



		// var matchSuspendFromAdmin = (data.suspendcount===0) ? false : true
		// var showVideoFromAdminCheck = (data.show_tv===0) ? false : true
		
		
		// new_array['oddsMatchSuspend']=matchSuspendFromAdmin;
		// new_array['showVideoFromAdmin']=showVideoFromAdminCheck;

	
			
		// 	Object.values(getResult1[0]).forEach(getResult => {
				
		// 	//////console.logresp2[0].match_name);
		// 	//////console.loggetResult);
		// 	var explode = resp2[0].match_name.split(" v ");
		// 	let headers = {
		// 		Authorization: "Bearer " + this.state.accessToken,
		// 	};
			// if(getResult.status==="SUSPENDED") {
			// 	axios.get(baseUrl + '/savematchresult/'+getResult.marketId, {headers}).then((respMain) => {
			// 		// // ////////////console.logrespMain);
			// 	});
			// }
			
			new_array['unmatchOddStatus']=unmatchOddStatus;
			new_array['fancyInActiveList']=fancyInActiveList;
			new_array['fancySuspendList']=fancySuspendList;
			new_array['isSuspend']=isSuspend;
			new_array['eventName']=data.market[0].events[0].RunnerName+" v "+data.market[0].events[1].RunnerName;
			// new_array['firstTeamName']=  explode[0];
			// new_array['status']=  getResult.status
			// new_array['secondTeamName']= explode[1];
			new_array['marketId']=data.market[0].marketId;
			new_array['teamOneFirstBack']=    data.market[0].events[0].BackPrice1;
			new_array['teamOneFirstBackSize']=    data.market[0].events[0].BackSize1;
		// 	if(getResult.runners!=undefined){


		// 	if(getResult.runners[0]!=undefined){
		// 		new_array['teamOneSelectionId']=   getResult.runners[0].selectionId;
		// 		if(getResult.runners[0].ex.availableToBack!=undefined){

			
			new_array['firstTeamName']=data.market[0].events[0].RunnerName;
			new_array['secondTeamName']=data.market[0].events[1].RunnerName
			if(this.state.teamOneFirstBack!=data.market[0].events[0].BackPrice1){
				$("#blockin1").css("transition", "1s");
				$("#blockin1").css("background", "#ffc107");
				 setTimeout(function () {
					$("#blockin1").css("background", "#b2d6f0");
				  },400);
			}
			
			if(this.state.teamOneFirstBackSize!=data.market[0].events[0].BackSize1){
				$("#blockin1").css("transition", "1s");
				$("#blockin1").css("background", "#ffc107");
				 setTimeout(function () {
					$("#blockin1").css("background", "#b2d6f0");
				  },400);
			}
			new_array['teamOneMiddleBack']=   data.market[0].events[0].BackPrice2;
			if(this.state.teamOneMiddleBack!=data.market[0].events[0].BackPrice2){
				$("#blockin2").css("transition", "1s");
				$("#blockin2").css("background", "#ffc107");
				 setTimeout(function () {
					$("#blockin2").css("background", "#92c9f0");
				  },400);
			}

			

			new_array['teamOneMiddleBackSize']=   data.market[0].events[0].BackSize2;

			if(this.state.teamOneMiddleBackSize!=data.market[0].events[0].BackSize2){
				$("#blockin2").css("transition", "1s");
				$("#blockin2").css("background", "#ffc107");
				 setTimeout(function () {
					$("#blockin2").css("background", "#92c9f0");
				  },400);
			}


			new_array['teamOneLastBack']=  data.market[0].events[0].BackPrice3;
			if(this.state.teamOneLastBack!= data.market[0].events[0].BackPrice3){
				$("#blockin3").css("transition", "1s");
				$("#blockin3").css("background", "#ffc107");
				 setTimeout(function () {
					$("#blockin3").css("background", "#72bbef");
				  },400);
			}

			new_array['teamOneLastBackSize']=    data.market[0].events[0].BackSize3;

			if(this.state.teamOneLastBackSize!=data.market[0].events[0].BackSize3){
				$("#blockin3").css("transition", "1s");
				$("#blockin3").css("background", "#ffc107");
				 setTimeout(function () {
					$("#blockin3").css("background", "#72bbef");
				  },400);
			}
			new_array['teamOneFirstLay']=   data.market[0].events[0].LayPrice1;

			if(this.state.teamOneFirstLay!= data.market[0].events[0].LayPrice1){
				$("#blockin4").css("transition", "1s");
				$("#blockin4").css("background", "#ffc107");
				 setTimeout(function () {
					$("#blockin4").css("background", "#faa9ba");
				  },400);
			}
			
			new_array['teamOneFirstLaySize']=   data.market[0].events[0].LaySize1;
			if(this.state.teamOneFirstLaySize!= data.market[0].events[0].LaySize1){
				$("#blockin4").css("transition", "1s");
				$("#blockin4").css("background", "#ffc107");
				 setTimeout(function () {
					$("#blockin4").css("background", "#faa9ba");
				  },400);
			}

		

			new_array['teamOneMiddleLay']=     data.market[0].events[0].LayPrice2;

			if(this.state.teamOneMiddleLay!=  data.market[0].events[0].LayPrice2){
				$("#blockin5").css("transition", "1s");
				$("#blockin5").css("background", "#ffc107");
				 setTimeout(function () {
					$("#blockin5").css("background", "#f8bbc8");
				  },400);
			}


			new_array['teamOneMiddleLaySize']=  data.market[0].events[0].LaySize2;
			if(this.state.teamOneMiddleLay!=data.market[0].events[0].LaySize2){
				$("#blockin5").css("transition", "1s");
				$("#blockin5").css("background", "#ffc107");
				 setTimeout(function () {
					$("#blockin5").css("background", "#f8bbc8");
				  },400);
			}
			new_array['teamOneLastLay']=      data.market[0].events[0].LayPrice3;
			
			if(this.state.teamOneLastLay!=  data.market[0].events[0].LayPrice3){
				$("#blockin6").css("transition", "1s");
				$("#blockin6").css("background", "#ffc107");
				 setTimeout(function () {
					$("#blockin6").css("background", "#f6cdd6");
				  },400);
			}
			
			new_array['teamOneLastLaySize']=    data.market[0].events[0].LaySize3;

			if(this.state.teamOneLastLaySize!=data.market[0].events[0].LaySize3){
				$("#blockin6").css("transition", "1s");
				$("#blockin6").css("background", "#ffc107");
				 setTimeout(function () {
					$("#blockin6").css("background", "#f6cdd6");
				  },400);
			}
				
			
		

		// 	new_array['teamTwoSelectionId']=  getResult.runners[1].selectionId;
		// 	if(getResult.runners[1].ex.availableToBack!=undefined){
			new_array['teamTwoFirstBack']=    data.market[0].events[1].BackPrice1;
			
			if(this.state.teamTwoFirstBack!=  data.market[0].events[1].BackPrice1){
				$("#blockin7").css("transition", "1s");
				$("#blockin7").css("background", "#ffc107");
				 setTimeout(function () {
					$("#blockin7").css("background", "#b2d6f0");
				  },400);
			}
			new_array['teamTwoFirstBackSize']=  data.market[0].events[1].BackSize1;

			if(this.state.teamTwoFirstBackSize!=data.market[0].events[1].BackSize1){
				$("#blockin7").css("transition", "1s");
				$("#blockin7").css("background", "#ffc107");
				 setTimeout(function () {
					$("#blockin7").css("background", "#b2d6f0");
				  },400);
			}
			new_array['teamTwoMiddleBack']=    data.market[0].events[1].BackPrice2;
			
			if(this.state.teamTwoMiddleBack!=  data.market[0].events[1].BackPrice2){
				$("#blockin8").css("transition", "1s");
				$("#blockin8").css("background", "#ffc107");
				 setTimeout(function () {
					$("#blockin8").css("background", "#92c9f0");
				  },400);
			}

			new_array['teamTwoMiddleBackSize']= data.market[0].events[1].BackSize2;

			if(this.state.teamTwoMiddleBackSize!=data.market[0].events[1].BackSize2){
				$("#blockin8").css("transition", "1s");
				$("#blockin8").css("background", "#ffc107");
				 setTimeout(function () {
					$("#blockin8").css("background", "#92c9f0");
				  },400);
			}
			
			new_array['teamTwoLastBack']=     data.market[0].events[1].BackPrice3
			if(this.state.teamTwoLastBack!=  data.market[0].events[1].BackPrice3){
				$("#blockin9").css("transition", "1s");
				$("#blockin9").css("background", "#ffc107");
				 setTimeout(function () {
					$("#blockin9").css("background", "#72bbef");
				  },400);
			}

			new_array['teamTwoLastBackSize']=    data.market[0].events[1].BackSize3;
			if(this.state.teamTwoLastBackSize!=data.market[0].events[1].BackSize3){
				$("#blockin9").css("transition", "1s");
				$("#blockin9").css("background", "#ffc107");
				 setTimeout(function () {
					$("#blockin9").css("background", "#72bbef");
				  },400);
			}
			new_array['teamTwoFirstLay']=     data.market[0].events[1].LayPrice1;
			if(this.state.teamTwoFirstLay!=  data.market[0].events[1].LayPrice1){
				$("#blockin10").css("transition", "1s");
				$("#blockin10").css("background", "#ffc107");
				 setTimeout(function () {
					$("#blockin10").css("background", "#faa9ba");
				  },400);
			}
			
			new_array['teamTwoFirstLaySize']=   data.market[0].events[1].LaySize1;
			if(this.state.teamTwoFirstLaySize!=data.market[0].events[1].LaySize1){
				$("#blockin10").css("transition", "1s");
				$("#blockin10").css("background", "#ffc107");
				 setTimeout(function () {
					$("#blockin10").css("background", "#faa9ba");
				  },400);
			}
			new_array['teamTwoMiddleLay']=    data.market[0].events[1].LayPrice2
			if(this.state.teamTwoMiddleLay!=  data.market[0].events[1].LayPrice2){
				$("#blockin11").css("transition", "1s");
				$("#blockin11").css("background", "#ffc107");
				 setTimeout(function () {
					$("#blockin11").css("background", "#f8bbc8");
				  },400);
			}
			new_array['teamTwoMiddleLaySize']=  data.market[0].events[1].LaySize2;
			
			if(this.state.teamTwoFirstLaySize!=data.market[0].events[1].LaySize2){
				$("#blockin11").css("transition", "1s");
				$("#blockin11").css("background", "#ffc107");
				 setTimeout(function () {
					$("#blockin11").css("background", "#f8bbc8");
				  },400);
			}
			new_array['teamTwoLastLay']=       data.market[0].events[1].LayPrice3;
			if(this.state.teamTwoLastLay!=  data.market[0].events[1].LayPrice3){
				$("#blockin12").css("transition", "1s");
				$("#blockin12").css("background", "#ffc107");
				 setTimeout(function () {
					$("#blockin12").css("background", "#f6cdd6");
				  },400);
			}
			new_array['teamTwoLastLaySize']=    data.market[0].events[1].LaySize3;
			if(this.state.teamTwoLastLaySize!= data.market[0].events[1].LaySize3){
				$("#blockin12").css("transition", "1s");
				$("#blockin12").css("background", "#ffc107");
				 setTimeout(function () {
					$("#blockin12").css("background", "#f6cdd6");
				  },400);
			}
				

		// 	}




		// 	if(getResult.runners[2]!=undefined){
		// 	new_array['draw']= true,

			
		
			//new_array['drawSelectionId']= getResult.runners[2].selectionId;
			if(data.market[0].events[2]!=undefined){
				
				new_array['draw']= true;
				new_array['drawTeamName']= "The Draw";
				new_array['drawFirstBack']=  data.market[0].events[2].BackPrice1;
			new_array['drawFirstBackSize']=  data.market[0].events[2].BackSize1;


			new_array['drawMiddleBack']= data.market[0].events[2].BackPrice2
			new_array['drawMiddleBackSize']=  data.market[0].events[2].BackSize1;
		
		
			new_array['drawLastBack']= data.market[0].events[2].BackPrice3;
			new_array['drawLastBackSize']=  data.market[0].events[2].BackSize3;



			new_array['drawFirstLay']= data.market[0].events[2].LayPrice1;
			new_array['drawFirstLaySize']=  data.market[0].events[2].LaySize1;
		
		
			new_array['drawMiddleLay']= data.market[0].events[2].LayPrice2;
			new_array['drawMiddleLaySize']=  data.market[0].events[2].LaySize2;


			new_array['drawLastLay']= data.market[0].events[2].LayPrice3
			new_array['drawLastLaySize']=  data.market[0].events[2].LaySize3;
			}
			

		// 	new_array['status']=  getResult.status
		
		if(data.bookmake[0].runners!=undefined){
			new_array['bookmakerFirstTeamFound']=true;
			var backPrice1 =0
			if(data.bookmake[0].runners[0].BackPrice1!=0  && data.bookmake[0].runners[0].BackPrice1!=undefined){
				backPrice1=data.bookmake[0].runners[0].BackPrice1.split(".");
				if(backPrice1!=undefined && backPrice1!=0){
					backPrice1=backPrice1[1];
				}
			}
			var backPrice2=0
			if(data.bookmake[0].runners[0].BackPrice2!=0  && data.bookmake[0].runners[0].BackPrice2!=undefined){
				backPrice2=data.bookmake[0].runners[0].BackPrice2.split(".");
				if(backPrice2!=undefined && backPrice2!=0){
					backPrice2=backPrice2[1];
				}
			}
			var backPrice3=0
			if(data.bookmake[0].runners[0].BackPrice3!=0 &&  data.bookmake[0].runners[0].BackPrice3!=undefined){
				backPrice3=data.bookmake[0].runners[0].BackPrice3.split(".");
				if(backPrice3!=undefined && backPrice3!=0){
					backPrice3=backPrice3[1];
				}
			}
			var layPrice1=0
			if(data.bookmake[0].runners[0].LayPrice1!=0 &&  data.bookmake[0].runners[0].LayPrice1!=undefined){
				layPrice1=data.bookmake[0].runners[0].LayPrice1.split(".");
				if(layPrice1!=undefined && layPrice1!=0){
					layPrice1=layPrice1[1];
				}
			}
			
			var layPrice2=0
			if(data.bookmake[0].runners[0].LayPrice2!=0 && data.bookmake[0].runners[0].LayPrice2!=undefined){
				layPrice2=data.bookmake[0].runners[0].LayPrice2.split(".");
				if(layPrice2!=undefined && layPrice2!=0){
					layPrice2=layPrice1[1];
				}
			}
			
			var layPrice3=0;

			
			if(data.bookmake[0].runners[0].layPrice3!=0 && data.bookmake[0].runners[0].layPrice3!=undefined){
				layPrice3=data.bookmake[0].runners[0].layPrice3.split(".");
				if(layPrice3!=undefined && layPrice3!=0){
					layPrice3=layPrice3[1];
				}
			}
		
		
			//new_array['bookmaker_team_a']=       bookmaker[i].nat;
			new_array['bookmaker_a_back_1']  		= backPrice1;
			new_array['bookmaker_a_back_2']      	=backPrice2;
			new_array['bookmaker_a_back_3'] 		=backPrice3;
			new_array['bookmaker_a_lay_1']			=layPrice1;
			new_array['bookmaker_a_lay_2']			=layPrice2;
			new_array['bookmaker_a_lay_3']			=layPrice3;
			//new_array['bookmaker_a_status']     	=bookmaker[i].s;
			new_array['bookmaker_a_back_4']       	=data.bookmake[0].runners[0].BackSize1;
			new_array['bookmaker_a_back_5']       	=data.bookmake[0].runners[0].BackSize2;
			new_array['bookmaker_a_back_6']        	=data.bookmake[0].runners[0].BackSize3;
			new_array['bookmaker_a_lay_4']          =data.bookmake[0].runners[0].LaySize1;
			new_array['bookmaker_a_lay_5']          =data.bookmake[0].runners[0].LaySize2;
			new_array['bookmaker_a_lay_6']			=data.bookmake[0].runners[0].LaySize3;
		}
		
		 if(data.bookmake[0].runners !=undefined){
			
			
			if(data.bookmake[0].runners[1]!=undefined){
				new_array['bookmakerSecondTeamFound']=true;
				// new_array['min_bookmaker']=bookmaker[i].min;
				// new_array['max_bookmaker']=bookmaker[i].max;
				// new_array['bookmaker_team_b']=bookmaker[i].nat;
				// new_array['bookmaker_b_back_1']=bookmaker[i].b1;
				// new_array['bookmaker_b_back_4']=this.fnum(bookmaker[i].bs1);
				// new_array['bookmaker_b_back_2']=bookmaker[i].b2;
				// new_array['bookmaker_b_back_5']=this.fnum(bookmaker[i].bs2);
				// new_array['bookmaker_b_back_3']=bookmaker[i].b3;
				// new_array['bookmaker_b_back_6']=this.fnum(bookmaker[i].bs3);
				// new_array['bookmaker_b_lay_1']=bookmaker[i].l1;
				// new_array['bookmaker_b_lay_2']=bookmaker[i].l2;
				// new_array['bookmaker_b_lay_3']=bookmaker[i].l3;
				// new_array['bookmaker_b_lay_4']=this.fnum(bookmaker[i].ls1);
				// new_array['bookmaker_b_lay_5']=this.fnum(bookmaker[i].ls2);
				// new_array['bookmaker_b_lay_6']=this.fnum(bookmaker[i].ls3);
				// new_array['bookmaker_b_status']=bookmaker[i].s;
				var backPrice44 =0
				if(data.bookmake[0].runners[1].BackPrice1!=0  &&  data.bookmake[0].runners[1].BackPrice1!=undefined){
					backPrice44=data.bookmake[0].runners[1].BackPrice1.split(".");
					if(backPrice44!=undefined && backPrice44!=0){
						backPrice44=backPrice44[1];
					}
				}
				var backPrice45=0
				if(data.bookmake[0].runners[0].BackPrice2!=0 &&  data.bookmake[0].runners[1].BackPrice2!=undefined){
					backPrice45=data.bookmake[0].runners[1].BackPrice2.split(".");
					if(backPrice45!=undefined && backPrice45!=0){
						backPrice45=backPrice45[1];
					}
				}

				var backPrice46=0
				if(data.bookmake[0].runners[0].BackPrice3!=0 && data.bookmake[0].runners[1].BackPrice3!=undefined){
					backPrice46=data.bookmake[0].runners[1].BackPrice3.split(".");
					if(backPrice46!=undefined && backPrice46!=0){
						backPrice46=backPrice46[1];
					}
				}
				var layPrice44=0;
				
				if(data.bookmake[0].runners[0].LayPrice1!=0 &&  data.bookmake[0].runners[1].LayPrice1!=undefined){
					layPrice44=data.bookmake[0].runners[1].LayPrice1.split(".");
					if(layPrice44!=undefined && layPrice44!=0){
						layPrice44=layPrice44[1];
					}
				}
				
				var layPrice45=0
				if(data.bookmake[0].runners[0].LayPrice2!=0  && data.bookmake[0].runners[1].LayPrice2!=undefined){
					layPrice45=data.bookmake[0].runners[1].LayPrice2.split(".");
					if(layPrice45!=undefined && layPrice45!=0){
						layPrice45=layPrice45[1];
					}
				}
				
				var layPrice46=0
				if(data.bookmake[0].runners[0].layPrice3!=0  && data.bookmake[0].runners[1].layPrice3!=undefined){
					layPrice46=data.bookmake[0].runners[1].layPrice3.split(".");
					if(layPrice46!=undefined && layPrice46!=0){
						layPrice46=layPrice46[1];
					}
				}
			
			
			new_array['bookmaker_b_back_1']  		= data.bookmake[0].runners[1].BackPrice1;
			new_array['bookmaker_b_back_2']      	= data.bookmake[0].runners[1].BackPrice2;
			new_array['bookmaker_b_back_3'] 		=data.bookmake[0].runners[1].BackPrice3;
			new_array['bookmaker_b_lay_1']			=data.bookmake[0].runners[1].LayPrice1;
			new_array['bookmaker_b_lay_2']			=data.bookmake[0].runners[1].LayPrice2;
			new_array['bookmaker_b_lay_3']			=data.bookmake[0].runners[1].LayPrice3
			new_array['bookmaker_b_back_4']       	=data.bookmake[0].runners[1].BackSize1;
			new_array['bookmaker_b_back_5']       	=data.bookmake[0].runners[1].BackSize2;
			new_array['bookmaker_b_back_6']        	=data.bookmake[0].runners[1].BackSize3;
			new_array['bookmaker_b_lay_4']          =data.bookmake[0].runners[1].LaySize1;
			new_array['bookmaker_b_lay_5']          =data.bookmake[0].runners[1].LaySize2;
			new_array['bookmaker_b_lay_6']			=data.bookmake[0].runners[1].LaySize3;
			}
		}
		 if(data.bookmake[0].runners!=undefined){
			if(data.bookmake[0].runners[2]!=undefined){
				var backPrice47 =0
				if(data.bookmake[0].runners[1].BackPrice1!=0  && data.bookmake[0].runners[2].BackPrice1!=undefined){
					backPrice47=data.bookmake[0].runners[2].BackPrice1.split(".");
					if(backPrice47!=undefined && backPrice47!=0){
						backPrice47=backPrice47[1];
					}
				}
				var backPrice48=0
				if(data.bookmake[0].runners[0].BackPrice2!=0 && data.bookmake[0].runners[2].BackPrice2!=undefined){
					backPrice48=data.bookmake[0].runners[2].BackPrice2.split(".");
					if(backPrice48!=undefined && backPrice48!=0){
						backPrice48=backPrice48[1];
					}
				}

				var backPrice49=0
				if(data.bookmake[0].runners[0].BackPrice3!=0 && data.bookmake[0].runners[2].BackPrice3!=undefined){
					backPrice49=data.bookmake[0].runners[2].BackPrice3.split(".");
					if(backPrice49!=undefined && backPrice49!=0){
						backPrice49=backPrice49[1];
					}
				}
				var layPrice47=0
				if(data.bookmake[0].runners[0].LayPrice1!=0  && data.bookmake[0].runners[2].LayPrice1!=undefined){
					layPrice47=data.bookmake[0].runners[2].LayPrice1.split(".");
					if(layPrice47!=undefined && layPrice47!=0){
						layPrice47=layPrice47[1];
					}
				}
				
				var layPrice48=0
				if(data.bookmake[0].runners[0].LayPrice2!=0 && data.bookmake[0].runners[2].LayPrice2!=undefined){
					layPrice48=data.bookmake[0].runners[2].LayPrice2.split(".");
					if(layPrice48!=undefined && layPrice48!=0){
						layPrice48=layPrice1[1];
					}
				}
				
				var layPrice49=0
				if(data.bookmake[0].runners[0].layPrice3!=0 &&  data.bookmake[0].runners[2].layPrice3!=undefined){
					layPrice49=data.bookmake[0].runners[2].layPrice3.split(".");
					if(layPrice49!=undefined && layPrice49!=0){
						layPrice49=layPrice1[1];
					}
				}
				
			
			new_array['bookmaker_c_back_1']  		= backPrice47;
			new_array['bookmaker_c_back_2']      	= backPrice48;
			new_array['bookmaker_c_back_3'] 		=backPrice49;
			new_array['bookmaker_c_lay_1']			=data.bookmake[0].runners[2].LayPrice1
			new_array['bookmaker_c_lay_2']			=data.bookmake[0].runners[2].LayPrice2;
			new_array['bookmaker_c_lay_3']			=data.bookmake[0].runners[2].LayPrice3;
			new_array['bookmaker_c_back_4']       	=data.bookmake[0].runners[2].BackSize1;
			new_array['bookmaker_c_back_5']       	=data.bookmake[0].runners[2].BackSize2;
			new_array['bookmaker_c_back_6']        	=data.bookmake[0].runners[2].BackSize3;
			new_array['bookmaker_c_lay_4']          =layPrice47;
			new_array['bookmaker_c_lay_5']          =layPrice48;
			new_array['bookmaker_c_lay_6']			=layPrice49;
			}
		
		}

		this.setState(new_array)
		this.setState({sessiondata:data.session});
		//Fancy Api Data
		
		// 	this.setState({buttonvalue_new:buttonvalue_new});
		var teamOneSelectionId=this.state.teamOneSelectionId;
		var teamTwoSelectionId=this.state.teamTwoSelectionId;
		var profit12=0;
		var profit13 =0;
		var profit14 =0;
		var profit15=0;
		var profit17 =0;
		var profit16 =0;
		var NewProfit =0;
		var NewProfit1=0;
		var NewProfit2=0;
		var new_array1=[];
		var new_array2=[];
		var new_array3=[];
		var new_arrayfancy=[];
		var new_arrayfancy1=[];
		var new_arrayfancy2=[];
		var index=0;
		 ////////console.logthis.state.getResults);
		if(this.state.getResults!=undefined){
			////console.logthis.state.getResults);
			
			for(let i=0;i<this.state.getResults.length;i++){
				
				if(this.state.getResults[i].profit_team=="teamone" && this.state.getResults[i].team_name!="The Draw" && this.state.getResults[i].bet_on==="odds"){
					
					if(this.state.getResults[i].bet_type!="lay"){
					
						profit12= parseFloat(profit12)+parseFloat(this.state.getResults[i].profit);

					}else{
						
						var data123=parseFloat(this.state.getResults[i].odds)-1
						var new_data=parseFloat(this.state.getResults[i].profit)*parseFloat(data123);
						NewProfit=new_data;
						profit12= parseFloat(profit12)-parseFloat(NewProfit);
					
						
					}
						
					
					
					if(this.state.getResults[i].loss!=undefined){
						if(this.state.getResults[i].bet_type!="lay"){
							profit13=parseFloat(profit13)-parseFloat(this.state.getResults[i].loss)
							profit14=parseFloat(profit14)-parseFloat(this.state.getResults[i].loss)
							
						}else{
							

							profit13=parseFloat(profit13)+parseFloat(this.state.getResults[i].loss)
							profit14=parseFloat(profit14)+parseFloat(this.state.getResults[i].loss)
							
						}
						
						

						
					}
					
				}
				else if(this.state.getResults[i].profit_team=="teamtwo"  && this.state.getResults[i].team_name!="The Draw" &&  this.state.getResults[i].bet_on==="odds"){
					
					if(this.state.getResults[i].bet_type!="lay"){
						

						profit13= parseFloat(profit13)+parseFloat(this.state.getResults[i].profit);
					}else{
						
						var data124=parseFloat(this.state.getResults[i].odds)-parseFloat(1)
						var new_data1=parseFloat(this.state.getResults[i].profit)*parseFloat(data124);
						
						NewProfit1=new_data1;
						profit13= parseFloat(profit13)-parseFloat(NewProfit1);
						
					}




					if(this.state.getResults[i].loss!=undefined){
						if(this.state.getResults[i].bet_type!="lay"){
							profit12=parseFloat(profit12)-parseFloat(this.state.getResults[i].loss)
							profit14=parseFloat(profit14)-parseFloat(this.state.getResults[i].loss)
						}else{
							profit12=parseFloat(profit12)+parseFloat(this.state.getResults[i].loss);
							profit14=parseFloat(profit14)+parseFloat(this.state.getResults[i].loss)
						}


						
						
					}
				}
				else {
					if( this.state.getResults[i].bet_on==="odds"
					){

						if(this.state.getResults[i].bet_type!="lay"){
							profit14= parseFloat(profit14)+parseFloat(this.state.getResults[i].profit);
							
						}else{
							var data125=parseFloat(this.state.getResults[i].odds)-parseFloat(1)
							var new_data122=parseFloat(this.state.getResults[i].profit)*parseFloat(data125);
							
							
							NewProfit2=new_data122;
							profit14= parseFloat(profit14)-NewProfit2;
						}





					
						if(this.state.getResults[i].loss!=undefined){
							
							if(this.state.getResults[i].bet_type!="lay"){
								
								profit12=parseFloat(profit12)-parseFloat(this.state.getResults[i].stake)
								
								profit13=parseFloat(profit13)-parseFloat(this.state.getResults[i].stake)
							
								
							}else{
								profit12=parseFloat(profit12)+parseFloat(this.state.getResults[i].stake)
								profit13=parseFloat(profit13)+parseFloat(this.state.getResults[i].stake)
							}
							
							
							
							
						}
					}
					
				}
				
				if(this.state.getResults[i].profit_team=="teamone" && this.state.getResults[i].team_name!="The Draw" && this.state.getResults[i].bet_on==="bookmaker"){
					
					if(this.state.getResults[i].bet_type!="lay"){
					
						profit15= parseFloat(profit15)+parseFloat(this.state.getResults[i].profit);

					}else{
						var data123=this.state.getResults[i].odds
						if(Number.isInteger(parseFloat(data123))==true){

							var data123=parseFloat(data123)/parseFloat(100);
						}else{
							var data123=parseFloat(this.state.getResults[i].odds)-parseFloat(1)
						}
						
						var new_data=parseFloat(this.state.getResults[i].profit)*parseFloat(data123);
						NewProfit=new_data;
						profit15= parseFloat(profit15)-parseFloat(NewProfit);
					
						
					}
						
					
					
					if(this.state.getResults[i].loss!=undefined){
						if(this.state.getResults[i].bet_type!="lay"){
						
							


							profit16=parseFloat(profit16)-parseFloat(this.state.getResults[i].stake)
							profit17=parseFloat(profit17)-parseFloat(this.state.getResults[i].stake)
							
						}else{
							profit16=parseFloat(profit16)+parseFloat(this.state.getResults[i].stake)
							profit17=parseFloat(profit17)+parseFloat(this.state.getResults[i].stake)
							
						}
						
						

						
					}
					
				}
				else if(this.state.getResults[i].profit_team=="teamtwo"  && this.state.getResults[i].team_name!="The Draw" &&  this.state.getResults[i].bet_on==="bookmaker"){
					//console.logthis.state.getResults[i]);
					if(this.state.getResults[i].bet_type!="lay"){
						

						profit16= parseFloat(profit16)+parseFloat(this.state.getResults[i].profit);
					}else{
						var data124=this.state.getResults[i].odds
						if(Number.isInteger(parseFloat(data124))==true){
							data124=parseFloat(data124)/parseFloat(100);
						}else{
							var data124=parseFloat(this.state.getResults[i].odds)-parseFloat(1)
						}
						var new_data1=parseFloat(this.state.getResults[i].profit)*parseFloat(data124);
						
						NewProfit1=new_data1;
						profit16= parseFloat(profit16)-NewProfit1;
						
					}




					if(this.state.getResults[i].loss!=undefined){
						if(this.state.getResults[i].bet_type!="lay"){
							profit15=parseFloat(profit15)-parseFloat(this.state.getResults[i].stake)
							profit17=parseFloat(profit17)-parseFloat(this.state.getResults[i].stake)
						}else{
							profit15=parseFloat(profit15)+parseFloat(this.state.getResults[i].stake);
							profit17=parseFloat(profit17)+parseFloat(this.state.getResults[i].stake)
						}


						
						
					}
				}
				else {
					if( this.state.getResults[i].bet_on==="bookmaker"
					){

						if(this.state.getResults[i].bet_type!="lay"){
							profit17= parseFloat(profit17)+parseFloat(this.state.getResults[i].profit);
							
						}else{
							var data125=this.state.getResults[i].odds
							if(Number.isInteger(parseFloat(data125))==true){
								data125=parseFloat(data125)/parseFloat(100);
							}else{
								var data125=parseFloat(this.state.getResults[i].odds)-parseFloat(1)
							}

							
							var new_data122=parseFloat(this.state.getResults[i].profit)*parseFloat(data125);
							
							
							NewProfit2=new_data122;
							profit17= parseFloat(profit17)-parseFloat(NewProfit2);
						}





					
						if(this.state.getResults[i].loss!=undefined){
							
							if(this.state.getResults[i].bet_type!="lay"){
								
								profit15=parseFloat(profit15)-parseFloat(this.state.getResults[i].stake)
								
								profit16=parseFloat(profit16)-parseFloat(this.state.getResults[i].stake)
							
								
							}else{
								profit15=parseFloat(profit15)+parseFloat(this.state.getResults[i].stake)
								profit16=parseFloat(profit16)+parseFloat(this.state.getResults[i].stake)
							}
							
							
							
						}
					}
					
				}
				
			
				
				if(this.state.getResults[i].bet_on=="fancy"){

					if(this.state.getResults[i].bet_on!=null && this.state.getResults[i].bet_on!=undefined){
						new_arrayfancy.push(this.state.getResults[i].headname);
					}
						
						
						
					
				}











				
			
			}
			
		}
	
		this.setState({profit13:profit13.toFixed(2),profit12:profit12.toFixed(2),profit14:profit14.toFixed(2),
			profit15:profit15.toFixed(2),profit16:profit16.toFixed(2),profit17:profit17.toFixed(2),
			fancydata:new_arrayfancy,fancydata1:new_arrayfancy1,fancydata1:new_arrayfancy2
		})

		}	
	
	
	
    callBookmakerApi=()=>{
		
		// if(this.state.showBookMakerLiveApiData===false){
		// 	return false;
		// }
		// let new_array={};
		// let headers = {
		// 	Authorization: "Bearer " + this.state.accessToken,
		// };
		// let matchid = this.props.match.params.id;
		
		// axios.get(baseUrl + '/bookmaker/'+matchid, {headers}).then((resp) => {
		// 	var bookmaker =resp.data.data;
			
		// 	if(bookmaker!=undefined ){
		// 		for(var i=0; i<bookmaker.length;i++){
					
		// 				if(bookmaker[i].sid==1){
		// 					new_array['bookmakerFirstTeamFound']=true;
		// 					new_array['bookmaker_team_a']=       bookmaker[i].nat;
		// 					new_array['bookmaker_a_back_1']      =bookmaker[i].b1;
		// 					new_array['bookmaker_a_back_2']      =bookmaker[i].b2;
		// 					new_array['bookmaker_a_back_3'] 		=bookmaker[i].b3;
		// 					new_array['bookmaker_a_lay_1']			=bookmaker[i].l1;
		// 					new_array['bookmaker_a_lay_2']			=bookmaker[i].l2;
		// 					new_array['bookmaker_a_lay_3']			=bookmaker[i].l3;
		// 					new_array['bookmaker_a_status']     =bookmaker[i].s;
		// 					new_array['bookmaker_a_back_4']       =this.fnum(bookmaker[i].bs1);
		// 					new_array['bookmaker_a_back_5']       =this.fnum(bookmaker[i].bs2);
		// 					new_array['bookmaker_a_back_6']           =this.fnum(bookmaker[i].bs3);
		// 					new_array['bookmaker_a_lay_4']            =this.fnum(bookmaker[i].ls1);
		// 					new_array['bookmaker_a_lay_5']            =this.fnum(bookmaker[i].ls2);
		// 					new_array['bookmaker_a_lay_6']			=this.fnum(bookmaker[i].ls3);
		// 				}
		// 				else if(bookmaker[i].sid==2){
		// 						new_array['bookmakerSecondTeamFound']=true;
		// 						new_array['min_bookmaker']=bookmaker[i].min;
		// 						new_array['max_bookmaker']=bookmaker[i].max;
		// 						new_array['bookmaker_team_b']=bookmaker[i].nat;
		// 						new_array['bookmaker_b_back_1']=bookmaker[i].b1;
		// 						new_array['bookmaker_b_back_4']=this.fnum(bookmaker[i].bs1);
		// 						new_array['bookmaker_b_back_2']=bookmaker[i].b2;
		// 						new_array['bookmaker_b_back_5']=this.fnum(bookmaker[i].bs2);
		// 						new_array['bookmaker_b_back_3']=bookmaker[i].b3;
		// 						new_array['bookmaker_b_back_6']=this.fnum(bookmaker[i].bs3);
		// 						new_array['bookmaker_b_lay_1']=bookmaker[i].l1;
		// 						new_array['bookmaker_b_lay_2']=bookmaker[i].l2;
		// 						new_array['bookmaker_b_lay_3']=bookmaker[i].l3;
		// 						new_array['bookmaker_b_lay_4']=this.fnum(bookmaker[i].ls1);
		// 						new_array['bookmaker_b_lay_5']=this.fnum(bookmaker[i].ls2);
		// 						new_array['bookmaker_b_lay_6']=this.fnum(bookmaker[i].ls3);
		// 						new_array['bookmaker_b_status']=bookmaker[i].s;
		// 				}
		// 				else if(bookmaker[i].sid==3){
							
		// 					new_array['bookmaker_draw']=true;
		// 					new_array['bookmaker_team_b']=bookmaker[i].nat;
		// 					new_array['bookmaker_d_back_1']=bookmaker[i].b1;
		// 					new_array['bookmaker_d_back_2']=bookmaker[i].b2;
		// 					new_array['bookmaker_d_back_3']=bookmaker[i].b3;
		// 					new_array['bookmaker_d_status']=bookmaker[i].s;
		// 					new_array['bookmaker_d_back_4']=this.fnum(bookmaker[i].bs1);
		// 					new_array['bookmaker_d_back_5']=this.fnum(bookmaker[i].bs2);
		// 					new_array['bookmaker_d_back_6']=this.fnum(bookmaker[i].bs3);
		// 					new_array['bookmaker_d_lay_1']=bookmaker[i].l1;
		// 					new_array['bookmaker_d_lay_2']=bookmaker[i].l2;
		// 					new_array['bookmaker_d_lay_3']=bookmaker[i].l3;
		// 					new_array['bookmaker_d_lay_4']=this.fnum(bookmaker[i].ls1);
		// 					new_array['bookmaker_d_lay_5']=this.fnum(bookmaker[i].ls2);
		// 					new_array['bookmaker_d_lay_6']=this.fnum(bookmaker[i].ls3);
					
					
						
		// 				}

		// 		}
			
		// 	}
		// 	this.setState(new_array);
			
			/* if(bookmaker!=undefined ){
				if(bookmaker.t2!=undefined){
					
						if(bookmaker.t2[0]!=undefined && bookmaker.t2[0]!=''){
							for(var i=0; i<bookmaker.t2[0].length;i++){
								if(bookmaker.t2[0][i].sid==1){
									new_array['bookmakerFirstTeamFound']=true;
									new_array['bookmaker_team_a']=       bookmaker.t2[0][i].nat;
									new_array['bookmaker_a_back_1']      =bookmaker.t2[0][i].b1;
									new_array['bookmaker_a_back_2']      =bookmaker.t2[0][i].b2;
									new_array['bookmaker_a_back_3'] 		=bookmaker.t2[0][i].b3;
									new_array['bookmaker_a_lay_1']			=bookmaker.t2[0][i].l1;
									new_array['bookmaker_a_lay_2']			=bookmaker.t2[0][i].l2;
									new_array['bookmaker_a_lay_3']			=bookmaker.t2[0][i].l3;
									new_array['bookmaker_a_status']     =bookmaker.t2[0][i].s;
									new_array['bookmaker_a_back_4']       =bookmaker.t2[0][i].bs1;
									new_array['bookmaker_a_back_5']       =bookmaker.t2[0][i].bs2;
									new_array['bookmaker_a_back_6']           =bookmaker.t2[0][i].bs3;
									new_array['bookmaker_a_lay_4']            =bookmaker.t2[0][i].ls1;
									new_array['bookmaker_a_lay_5']            =bookmaker.t2[0][i].ls2;
									new_array['bookmaker_a_lay_6']			=bookmaker.t2[0][i].ls3;
								}
								else if(bookmaker.t2[0][i].sid==2){
										new_array['bookmakerSecondTeamFound']=true;
										new_array['min_bookmaker']=bookmaker.t2[0][i].min;
										new_array['max_bookmaker']=bookmaker.t2[0][i].max;
										new_array['bookmaker_team_a']=bookmaker.t2[0][i].nat;
										new_array['bookmaker_b_back_1']=bookmaker.t2[0][i].b1;
										new_array['bookmaker_b_back_4']=bookmaker.t2[0][i].bs1;
										new_array['bookmaker_b_back_2']=bookmaker.t2[0][i].b2;
										new_array['bookmaker_b_back_5']=bookmaker.t2[0][i].bs2;
										new_array['bookmaker_b_back_3']=bookmaker.t2[0][i].b3;
										new_array['bookmaker_b_back_6']=bookmaker.t2[0][i].bs3;
										new_array['bookmaker_b_lay_1']=bookmaker.t2[0][i].l1;
										new_array['bookmaker_b_lay_2']=bookmaker.t2[0][i].l2;
										new_array['bookmaker_b_lay_3']=bookmaker.t2[0][i].l3;
										new_array['bookmaker_b_lay_4']=bookmaker.t2[0][i].ls1;
										new_array['bookmaker_b_lay_5']=bookmaker.t2[0][i].ls2;
										new_array['bookmaker_b_lay_6']=bookmaker.t2[0][i].ls3;
										new_array['bookmaker_b_status']=bookmaker.t2[0][i].s;
								}
								else if(bookmaker.t2[0][i].sid==3){
									
									new_array['bookmaker_draw']=true;
									new_array['bookmaker_team_b']=bookmaker.t2[0][i].nat;
									new_array['bookmaker_d_back_1']=bookmaker.t2[0][i].b1;
									new_array['bookmaker_d_back_2']=bookmaker.t2[0][i].b2;
									new_array['bookmaker_d_back_3']=bookmaker.t2[0][i].b3;
									new_array['bookmaker_d_status']=bookmaker.t2[0][i].s;
									new_array['bookmaker_d_back_4']=bookmaker.t2[0][i].bs1;
									new_array['bookmaker_d_back_5']=bookmaker.t2[0][i].bs2;
									new_array['bookmaker_d_back_6']=bookmaker.t2[0][i].bs3;
									new_array['bookmaker_d_lay_1']=bookmaker.t2[0][i].l1;
									new_array['bookmaker_d_lay_2']=bookmaker.t2[0][i].l2;
									new_array['bookmaker_d_lay_3']=bookmaker.t2[0][i].l3;
									new_array['bookmaker_d_lay_4']=bookmaker.t2[0][i].ls1;
									new_array['bookmaker_d_lay_5']=bookmaker.t2[0][i].ls2;
									new_array['bookmaker_d_lay_6']=bookmaker.t2[0][i].ls3;
							}

						}

					}
				}
			
			} */

			
		//});
		
	}
	
	callBookmakerFromAdminApi = () =>{
		
		let new_array={};
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		let matchid = this.props.match.params.id;
		
		axios.get(baseUrl + '/getbookmarketbymatchid/'+matchid, {headers}).then((resp) => {
			var resp = resp.data;
			var showBookMakerLiveApiData = true;
			if(resp.success===true){
				showBookMakerLiveApiData = (resp.data.status==="enable") ? false: true;
				if(resp.data.status==="enable"){
					this.setState({bookMakerAdminDataFound:true,
								   bookMakerAdminData:resp.data,
								   max_bookmaker_limit:resp.data.max_bookmaker_limit,
								   min_bookmaker_limit:resp.data.min_bookmaker_limit});
				}
			}
			this.setState({showBookMakerLiveApiData:showBookMakerLiveApiData});
			
		});
	
	}
	
	showBookmakerAdmindataHtml=()=>{
		
	////console.logthis.state.stackAmount_team4);
	////console.logthis.state.stackAmount_team5);
	////console.logthis.state.stackAmount_team6);
		if(this.state.bookMakerAdminDataFound===true){
			var firstTeamSuspended =(this.state.bookMakerAdminData.first_team_suspend==="true") ? "bet-info suspended row" : "bet-info row";
				var returnHtml = [];
		
			returnHtml.push(
							<div className="row">
								<div className="col-6">Total Match: {this.state.twoteamtotalmatch}</div>
								<div className="col-1 box-w1">&nbsp;</div>
								<div className=" col-1 box-w1">&nbsp;</div>
								<div className="col-1 back box-w1">Back</div>
								<div className="col-1 lay box-w1">Lay</div>
								<div className="col-1 box-w1">&nbsp;</div>
								<div className="col-1 box-w1">&nbsp;</div>
							</div>);
			returnHtml.push(<div className={firstTeamSuspended}>
								<div className="team-name nation col-6" id="10301">
									<span><strong>{this.state.firstTeamName}</strong></span>
									<p className="box-w4"><span className="float-right book" id="book_10301" style={{ color: "black" }}>  {this.state.stackAmount_team2}</span> <span className="float-right profit" id="profit_10301" style={{ color: "black" }}></span></p>
									<p className="box-w4"><span className="float-left book"  style={{ color: "black" }}> 
									</span> <span className="float-left  profit" style={{ color: "black" }} ></span></p>
								</div>
								<div className="box-w1 back-color col-1" style={{backgroundColor:'#B2D6F0'}}>{status}
									<span>&nbsp;</span>
								</div>
								<div className="box-w1 back-color col-1" style={{backgroundColor:'#92C9F0'}}>{status}
									<span>&nbsp;</span>
								</div>
								
								<div className="box-w1 back-color col-1">{status}
									<button className="bet-sec back "  onClick={this.handleBidClick.bind(this,this.state.firstTeamName,this.state.bookMakerAdminData.first_team_back,'#72bbef',"back",this.state.teamOneSelectionId,this.state.marketId,'teamone',this.state.status,'manual_bookmaker',"betmatch")} > <span className="odd backprice">{this.state.bookMakerAdminData.first_team_back}</span> </button>
								</div>
								
								
								
								<div className="box-w1 lay-color col-1">{status}
									<button className="bet-sec lay"  onClick={this.handleBidClick.bind(this,this.state.firstTeamName,this.state.bookMakerAdminData.first_team_lay,'#FAA9BA',"lay",this.state.teamOneSelectionId,this.state.marketId,'teamone',this.state.status,'manual_bookmaker',"betmatch")}><span className="odd layprice">{this.state.bookMakerAdminData.first_team_lay}</span></button>
								</div>
								<div className="box-w1 lay-color col-1" style={{backgroundColor:'#F8BBC8'}}>{status}
									<span>&nbsp;</span>
								</div>
								<div className="box-w1 lay-color col-1" style={{backgroundColor:'#F6CDD6'}}>{status}
									<span>&nbsp;</span>
								</div>	
							</div>);
						
			var secondTeamSuspended =(this.state.bookMakerAdminData.second_team_suspend==="true") ? "bet-info suspended row" : "bet-info row";
			
			returnHtml.push(<div className={secondTeamSuspended}>
								<div className="team-name nation  col-6" >
									<span ><strong>{this.state.secondTeamName}</strong></span>
									<p className="box-w4"><span className="float-right book" id="book_349" style={{ color: "black" }}>
									 {this.state.stackAmount_team1}</span> <span className="float-right profit" id="profit_349" style={{ color: "black" }} ></span>
									 </p>
									 
									 
									 <p className="box-w4"><span className="float-left book"  style={{ color: "black" }}>
									</span> <span className="float-left  profit" style={{ color: "black" }} ></span></p>




								</div>
								
								<div className="box-w1 back-color col-1" style={{backgroundColor:'#B2D6F0'}}>
								{status}
									
									<span>&nbsp;</span>
								</div>
								<div className="box-w1 back-color col-1" style={{backgroundColor:'#92C9F0'}}>{status}
									<span>&nbsp;</span>
								</div>
								
								<div className="box-w1 back-color col-1">{status}
									<button className="bet-sec back " onClick={this.handleBidClick.bind(this,this.state.secondTeamName,this.state.bookMakerAdminData.second_team_back,'#92C9F0',"back",this.state.teamTwoSelectionId,this.state.marketId,'teamtwo',this.state.status,'manual_bookmaker')} > <span className="odd backprice">{this.state.bookMakerAdminData.second_team_back}</span></button>
								</div>
								
								
								
								<div className="box-w1 lay-color col-1">{status}
									<button className="bet-sec lay"  onClick={this.handleBidClick.bind(this,this.state.secondTeamName,this.state.bookMakerAdminData.second_team_lay,'#faa9ba',"lay",this.state.teamTwoSelectionId,this.state.marketId,'teamtwo',this.state.status,'manual_bookmaker')}><span className="odd layprice">{this.state.bookMakerAdminData.second_team_lay}</span></button>
								</div>
								<div className="box-w1 lay-color col-1" style={{backgroundColor:'#F8BBC8'}}>{status}
									<span>&nbsp;</span>
								</div>
								<div className="box-w1 lay-color col-1" style={{backgroundColor:'#F6CDD6'}}>{status}
									<span>&nbsp;</span>
								</div>															
								
							</div>);

			
		
			if(this.state.bookMakerAdminData.enable_draw==="true") {
				var drawSuspended =(this.state.bookMakerAdminData.draw_suspend==="true") ? "bet-info suspended row" : "bet-info row";
				returnHtml.push(<div className={drawSuspended}>
									<div className="team-name nation  col-6" >
										<span ><strong>The Draw</strong></span>
										<p className="box-w4"><span className="float-right book" id="book_349" style={{ color: "black" }}>
										 </span> <span className="float-right profit" id="profit_349" style={{ color: "black" }} ></span>
										 </p>
										 
										 
										 <p className="box-w4"><span className="float-left book"  style={{ color: "black" }}>
										</span> <span className="float-left  profit" style={{ color: "black" }} ></span></p>




									</div>
									
									<div className="box-w1 back-color col-1" style={{backgroundColor:'#B2D6F0'}}>
									{status}
										
										<span>&nbsp;</span>
									</div>
									<div className="box-w1 back-color col-1" style={{backgroundColor:'#92C9F0'}}>{status}
										<span>&nbsp;</span>
									</div>
									
									<div className="box-w1 back-color col-1">{status}
										<button className="bet-sec back " onClick={this.handleBidClick.bind(this,"The Draw",this.state.bookMakerAdminData.draw_back,'#92C9F0',"back",this.state.teamTwoSelectionId,this.state.marketId,'draw',this.state.status,'manual_bookmaker')} > <span className="odd backprice">{this.state.bookMakerAdminData.draw_back}</span></button>
									</div>
									
									
									
									<div className="box-w1 lay-color col-1">{status}
										<button className="bet-sec lay"  onClick={this.handleBidClick.bind(this,"The Draw",this.state.bookMakerAdminData.draw_lay,'#faa9ba',"lay",this.state.teamTwoSelectionId,this.state.marketId,'draw',this.state.status,'manual_bookmaker')}><span className="odd layprice">{this.state.bookMakerAdminData.draw_lay}</span></button>
									</div>
									<div className="box-w1 lay-color col-1" style={{backgroundColor:'#F8BBC8'}}>{status}
										<span>&nbsp;</span>
									</div>
									<div className="box-w1 lay-color col-1" style={{backgroundColor:'#F6CDD6'}}>{status}
										<span>&nbsp;</span>
									</div>															
									
								</div>);
			}
			
							
			return <div>{returnHtml}</div>;				
		}
	}
	
	showDrawHtml =()=>{
		
		if(this.state.draw===true){
			var status=this.state.status;
			if(status!="OPEN"){
				var status=this.state.status;
			}else{
				var status="";

			}
			 var blockHtml='';
				 if(this.state.oddsMatchSuspend){
					var blockHtml= <div className="bet-info suspendedodds row"><span>SUSPENDED</span></div>;
				}
				var team_profit3 = (this.state.team_profit3===undefined || this.state.team_profit3==="") ? this.state.team_profit3 : parseFloat(this.state.team_profit3);
		
			return (
				<tr className="bet-info ">
					<td className="team-name nation" >
						<span ><strong>The Draw</strong></span>
						<p className="box-w4"><span className="float-left book" id="book_349" style={{ color: "black" }}>{this.state.profit14}</span> <span className="float-right profit" id="profit_349" style={{ color: "black" }} >
						
									{team_profit3}							 {this.state.stackAmount_team3}
							</span></p>
					</td>
					
					<td className="box-w1 back-color" style={{backgroundColor:'#B2D6F0'}}>
						{blockHtml}
						{status}
						<button className="bet-sec back "  onClick={this.handleBidClick.bind(this,this.state.drawTeamName,this.state.drawLastBack,'#B2D6F0',"back",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status,'odds')}> <span className="odd backprice">{this.state.drawLastBack}</span>{this.state.drawLastBackSize}{(this.state.drawLastBackSize >0) ? " K" : "" }  </button>
					</td>
					<td className="box-w1 back-color" style={{backgroundColor:'#92C9F0'}}>
						<button className="bet-sec back " onClick={this.handleBidClick.bind(this,this.state.drawTeamName,this.state.drawMiddleBack,'#92C9F0',"back",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status,'odds')} > <span className="odd backprice">{this.state.drawMiddleBack}</span> {this.state.drawMiddleBackSize}{(this.state.drawMiddleBackSize >0) ? " K" : "" } </button>
					</td>
					
					<td className="box-w1 back-color">{status}
						<button className="bet-sec back " onClick={this.handleBidClick.bind(this,this.state.drawTeamName,this.state.drawFirstBack,'#72bbef',"back",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status,'odds')} > <span className="odd backprice">{this.state.drawFirstBack}</span> {this.state.drawFirstBackSize}{(this.state.drawFirstBackSize >0) ? " K" : "" } </button>
					</td>
					
					
					
					<td className="box-w1 lay-color">{status}
						<button className="bet-sec lay" onClick={this.handleBidClick.bind(this,this.state.drawTeamName,this.state.drawFirstLay,'#faa9ba',"lay",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status,'odds')} value={this.state.lastPriceTraded1} ><span className="odd layprice">{this.state.drawFirstLay}</span>{this.state.drawFirstLaySize}{(this.state.drawFirstLaySize >0) ? " K" : "" }</button>
					</td>
					<td className="box-w1 lay-color" style={{backgroundColor:'#F8BBC8'}}>{status}
						<button className="bet-sec lay" value={this.state.lastPriceTraded1} onClick={this.handleBidClick.bind(this,this.state.drawTeamName,this.state.drawMiddleLay,'#F8BBC8',"lay",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status,'odds')} ><span className="odd layprice">{this.state.drawMiddleLay}</span>{this.state.drawMiddleLaySize}{(this.state.drawMiddleLaySize >0) ? " K" : "" }</button>
					</td>
					<td className="box-w1 lay-color" style={{backgroundColor:'#F6CDD6'}}>{status}
						<button className="bet-sec lay" value={this.state.lastPriceTraded1} onClick={this.handleBidClick.bind(this,this.state.drawTeamName,this.state.drawLastLay,'#F6CDD6',"lay",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status,'odds')}><span className="odd layprice">{this.state.drawLastLay}</span>{this.state.drawLastLaySize}{(this.state.drawLastLaySize >0) ? " K" : "" }</button>
					</td>															
					
				</tr>
			);
		}
	}
	
	

	
	
	showBookMarketAllHtml=()=>{
	
		var returnHtml = [];
		if(this.state.showBookMakerLiveApiData===false){
			return <div>{returnHtml}</div>;
		}
		if(this.state.bookmakerFirstTeamFound===true || this.state.bookmakerSecondTeamFound===true || this.state.bookmaker_draw===true) {
			returnHtml.push(
				<div className="row">
					<div className="col-6">Total Match: {this.state.twoteamtotalmatch}</div>
					<div className="col-1 box-w1">&nbsp;</div>
					<div className=" col-1 box-w1">&nbsp;</div>
					<div className="col-1 back box-w1">Back</div>
					<div className="col-1 lay box-w1">Lay</div>
					<div className="col-1 box-w1">&nbsp;</div>
					<div className="col-1 box-w1">&nbsp;</div>
				</div>
			);
		}
		if(this.state.bookmakerFirstTeamFound===true) {
			//console.log(this.state.bookmaker_a_lay_1);
var suspended =(this.state.bookmaker_a_back_1==0 || this.state.isSuspend===1) ? "bet-info suspended row" : "bet-info row";
			var team_profit4 = (this.state.team_profit4===undefined || this.state.team_profit4==="") ? this.state.team_profit4 : parseFloat(this.state.team_profit4);
			returnHtml.push(
			<div className={suspended}>
						<div className="team-name nation col-6" id="10301">
							<span><strong>{this.state.firstTeamName}</strong></span>
							<p className="box-w4"><span className="float-right book" id="book_10301" style={{ color: "black" }}>  </span> <span className="float-right profit" id="profit_10301" style={{ color: "black" }}>{team_profit4}
																 {this.state.stackAmount_team4}</span>
																 </p>
							<p className="box-w4"><span className="float-left book"  style={{ color: "black" }}> {parseFloat(this.state.profit15)}
							</span> <span className="float-left  profit" style={{ color: "black" }} >
								
								</span></p>
						</div>
						<div className="box-w1 back-color col-1" style={{backgroundColor:'#B2D6F0'}}>{status}
							<button className="bet-sec back "  onClick={this.handleBidClickBook.bind(this,this.state.firstTeamName,this.state.bookmaker_a_back_3,'#B2D6F0',"back",this.state.teamOneSelectionId,this.state.marketId,'teamone',this.state.status,'bookmaker',"betunmatch")}> <span className="odd backprice" >{this.state.bookmaker_a_back_3}</span>{this.state.bookmaker_a_back_6}{(this.state.bookmaker_a_back_6 >0) ? " K" : "" }</button>
						</div>
						<div className="box-w1 back-color col-1" style={{backgroundColor:'#92C9F0'}}>{status}
							<button className="bet-sec back " onClick={this.handleBidClickBook.bind(this,this.state.firstTeamName,this.state.bookmaker_a_back_2,'#92C9F0',"back",this.state.teamOneSelectionId,this.state.marketId,'teamone',this.state.status,'bookmaker',"betunmatch")} > <span className="odd backprice" >{this.state.bookmaker_a_back_2}</span>{this.state.bookmaker_a_back_5} {(this.state.bookmaker_a_back_5 >0) ? " K" : "" } </button>
						</div>
						
						<div className="box-w1 back-color col-1">{status}
							<button className="bet-sec back "  onClick={this.handleBidClickBook.bind(this,this.state.firstTeamName,this.state.bookmaker_a_back_1,'#72bbef',"back",this.state.teamOneSelectionId,this.state.marketId,'teamone',this.state.status,'bookmaker',"betmatch")}> <span className="odd backprice" >{this.state.bookmaker_a_back_1}</span>{this.state.bookmaker_a_back_4}{(this.state.bookmaker_a_back_4 >0) ? " K" : "" } </button>
						</div>
						
						
						
						<div className="box-w1 lay-color col-1">{status}
							<button className="bet-sec lay"  onClick={this.handleBidClickBook.bind(this,this.state.firstTeamName,this.state.bookmaker_a_lay_1,'#FAA9BA',"lay",this.state.teamOneSelectionId,this.state.marketId,'teamone',this.state.status,'bookmaker',"betmatch")}><span className="odd layprice">{this.state.bookmaker_a_lay_1}</span>{this.state.bookmaker_a_lay_4}{(this.state.bookmaker_a_lay_4 >0) ? " K" : "" }</button>
						</div>
						<div className="box-w1 lay-color col-1" style={{backgroundColor:'#F8BBC8'}}>{status}
							<button className="bet-sec lay"  onClick={this.handleBidClickBook.bind(this,this.state.firstTeamName,this.state.bookmaker_a_lay_2,'#F8BBC8',"lay",this.state.teamOneSelectionId,this.state.marketId,'teamone',this.state.status,'bookmaker',"betunmatch")}><span className="odd layprice">{this.state.bookmaker_a_lay_2 }</span>{this.state.bookmaker_a_lay_5}{(this.state.bookmaker_a_lay_5 >0) ? " K" : "" }</button>
						</div>
						<div className="box-w1 lay-color col-1" style={{backgroundColor:'#F6CDD6'}}>{status}
							<button className="bet-sec lay"  onClick={this.handleBidClickBook.bind(this,this.state.firstTeamName,this.state.bookmaker_a_lay_3,'#F6CDD6',"lay",this.state.teamOneSelectionId,this.state.marketId,'teamone',this.state.status,'bookmaker',"betunmatch")}><span className="odd layprice">{this.state.bookmaker_a_lay_3}</span>{this.state.bookmaker_a_lay_6}{(this.state.bookmaker_a_lay_6 >0) ? " K" : "" }</button>
						</div>	
						</div>);
		}
		
		if(this.state.bookmakerSecondTeamFound===true) {
			var suspended1 =(this.state.bookmaker_b_back_1==0 || this.state.isSuspend===1) ? "bet-info suspended row" : "bet-info row";
			var team_profit5 = (this.state.team_profit5===undefined || this.state.team_profit5==="") ? this.state.team_profit5 : parseFloat(this.state.team_profit5);
			returnHtml.push(<div className={suspended1}>
					<div className="team-name nation  col-6" >
						<span ><strong>{this.state.secondTeamName}</strong></span>
						<p className="box-w4"><span className="float-right book" id="book_349" style={{ color: "black" }}>
						{team_profit5}
																 {this.state.stackAmount_team5}
						</span> <span className="float-left profit" id="profit_349" style={{ color: "black" }} >

						{parseFloat(this.state.profit16)}
						</span>
						 </p>
						 
						 
						 <p className="box-w4"><span className="float-left book"  style={{ color: "black" }}>
						</span> <span className="float-left  profit" style={{ color: "black" }} ></span></p>




					</div>
					
					<div className="box-w1 back-color col-1" style={{backgroundColor:'#B2D6F0'}}>
					{status}
						
						<button className="bet-sec back "  onClick={this.handleBidClickBook.bind(this,this.state.secondTeamName,this.state.bookmaker_b_back_3,'#B2D6F0',"back",this.state.teamTwoSelectionId,this.state.marketId,'teamone',this.state.status,'bookmaker',"betunmatch")}  > <span className="odd backprice">{this.state.bookmaker_b_back_3} </span>{this.state.bookmaker_b_back_6}{(this.state.bookmaker_b_back_6 >0) ? " K" : "" } </button>
					</div>
					<div className="box-w1 back-color col-1" style={{backgroundColor:'#92C9F0'}}>{status}
						<button className="bet-sec back " onClick={this.handleBidClickBook.bind(this,this.state.secondTeamName,this.state.bookmaker_b_back_2,'#92C9F0',"back",this.state.teamTwoSelectionId,this.state.marketId,'teamtwo',this.state.status,'bookmaker',"betunmatch")} > <span className="odd backprice">{this.state.bookmaker_b_back_2}</span> {this.state.bookmaker_b_back_5}{(this.state.bookmaker_b_back_5 >0) ? " K" : "" } </button>
					</div>
					
					<div className="box-w1 back-color col-1">{status}
						<button className="bet-sec back " onClick={this.handleBidClickBook.bind(this,this.state.secondTeamName,this.state.bookmaker_b_back_1,'#92C9F0',"back",this.state.teamTwoSelectionId,this.state.marketId,'teamtwo',this.state.status,'bookmaker',"betmatch")} > <span className="odd backprice">{this.state.bookmaker_b_back_1}</span> {this.state.bookmaker_b_back_4} {(this.state.bookmaker_b_back_4 >0) ? " K" : "" }</button>
					</div>
					
					
					
					<div className="box-w1 lay-color col-1">{status}
						<button className="bet-sec lay"  onClick={this.handleBidClickBook.bind(this,this.state.secondTeamName,this.state.bookmaker_b_lay_1,'#faa9ba',"lay",this.state.teamTwoSelectionId,this.state.marketId,'teamtwo',this.state.status,'bookmaker',"betmatch")}><span className="odd layprice">{this.state.bookmaker_b_lay_1}</span>{this.state.bookmaker_b_lay_4}{(this.state.bookmaker_b_lay_4 >0) ? " K" : "" }</button>
					</div>
					<div className="box-w1 lay-color col-1" style={{backgroundColor:'#F8BBC8'}}>{status}
						<button className="bet-sec lay"  onClick={this.handleBidClickBook.bind(this,this.state.secondTeamName,this.state.bookmaker_b_lay_2,'#F8BBC8',"lay",this.state.teamTwoSelectionId,this.state.marketId,'teamtwo',this.state.status,'bookmaker',"betunmatch")}><span className="odd layprice">{this.state.bookmaker_b_lay_2}</span>{this.state.bookmaker_b_lay_5}{(this.state.bookmaker_b_lay_5 >0) ? " K" : "" }</button>
					</div>
					<div className="box-w1 lay-color col-1" style={{backgroundColor:'#F6CDD6'}}>{status}
						<button className="bet-sec lay"  onClick={this.handleBidClickBook.bind(this,this.state.secondTeamName,this.state.bookmaker_b_lay_3,'#F6CDD6',"lay",this.state.teamTwoSelectionId,this.state.marketId,'teamtwo',this.state.status,'bookmaker',"betunmatch")}><span className="odd layprice">{this.state.bookmaker_b_lay_3}</span>{this.state.bookmaker_b_lay_6}{(this.state.bookmaker_b_lay_6 >0) ? " K" : "" }</button>
					</div>															
					
				</div>);
			}
			
			if(this.state.bookmaker_draw===true) {
				var suspended2 =(this.state.bookmaker_d_back_1==0 || this.state.isSuspend===1) ? "bet-info suspended row" : "bet-info row";
				var team_profit6 = (this.state.team_profit6===undefined || this.state.team_profit6==="") ? this.state.team_profit6 : parseFloat(this.state.team_profit6);
				returnHtml.push(<div className={suspended2}>
					<div className="team-name nation col-6" >
						<span ><strong>Draw</strong></span>
						<p className="box-w4"><span className="float-left book" id="book_349" style={{ color: "black" }}>{this.state.profit17}</span> <span className="float-right profit" id="profit_349" style={{ color: "black" }} >
						{team_profit6}
																 {this.state.stackAmount_team6}
							</span></p>
					</div>
					
					<div className="box-w1 back-color col-1" style={{backgroundColor:'#B2D6F0'}}>{status}
						<button className="bet-sec back "  onClick={this.handleBidClickBook.bind(this,this.state.drawTeamName,this.state.bookmaker_d_back_3,'#B2D6F0',"back",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status,'bookmaker',"betunmatch")}> <span className="odd backprice">{this.state.bookmaker_d_back_3}</span>{this.state.bookmaker_d_back_6} {(this.state.bookmaker_d_back_6 >0) ? " K" : "" } </button>
					</div>
					<div className="box-w1 back-color col-1" style={{backgroundColor:'#92C9F0'}}>
						<button className="bet-sec back " onClick={this.handleBidClickBook.bind(this,this.state.drawTeamName,this.state.bookmaker_d_back_2,'#92C9F0',"back",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status,'bookmaker',"betunmatch")} > <span className="odd backprice">{this.state.bookmaker_d_back_2}</span> {this.state.bookmaker_d_back_5}{(this.state.bookmaker_d_back_5 >0) ? " K" : "" } </button>
					</div>
					
					<div className="box-w1 back-color col-1">{status}
						<button className="bet-sec back " onClick={this.handleBidClickBook.bind(this,this.state.drawTeamName,this.state.bookmaker_d_back_1,'#72bbef',"back",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status,'bookmaker',"betmatch")} > <span className="odd backprice">{this.state.bookmaker_d_back_1}</span> {this.state.bookmaker_d_back_4} {(this.state.bookmaker_d_back_4 >0) ? " K" : "" }</button>
					</div>
					
					
					
					<div className="box-w1 lay-color col-1">{status}
						<button className="bet-sec lay" onClick={this.handleBidClickBook.bind(this,this.state.drawTeamName,this.state.bookmaker_d_lay_1,'#faa9ba',"lay",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status,'bookmaker',"betmatch")} value={this.state.bookmaker_d_lay_4} ><span className="odd layprice">{this.state.bookmaker_d_lay_1}</span>{this.state.bookmaker_d_lay_4}{(this.state.bookmaker_d_lay_4 >0) ? " K" : "" }</button>
					</div>
					<div className="box-w1 lay-color col-1" style={{backgroundColor:'#F8BBC8'}}>{status}
						<button className="bet-sec lay" value={this.state.bookmaker_d_lay_5} onClick={this.handleBidClickBook.bind(this,this.state.drawTeamName,this.state.bookmaker_d_lay_2,'#F8BBC8',"lay",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status,'bookmaker',"betunmatch")} ><span className="odd layprice">{this.state.bookmaker_d_lay_2}</span>{this.state.bookmaker_d_lay_5}{(this.state.bookmaker_d_lay_5 >0) ? " K" : "" }</button>
					</div>
					<div className="box-w1 lay-color col-1" style={{backgroundColor:'#F6CDD6'}}>{status}
						<button className="bet-sec lay" value={this.state.bookmaker_d_lay_6} onClick={this.handleBidClickBook.bind(this,this.state.drawTeamName,this.state.bookmaker_d_lay_3,'#F6CDD6',"lay",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status,'bookmaker',"betunmatch")}><span className="odd layprice">{this.state.bookmaker_d_lay_3}</span>{this.state.bookmaker_d_lay_6}{(this.state.bookmaker_d_lay_6 >0) ? " K" : "" }</button>
					</div>															
					
				</div>);
				}
				
	return <div>{returnHtml}</div>;	
	}
	
	
	showTableHtml = () => {
		////////console.logthis.state.getResults);
		
		if (this.state.betDataFound === true) {
			const html = []
			const html1 = []
			var profit12=0;
			var profit13= 0;
			var loss=0;
			//var custom_this=this;
			var teamOneSelectionId=this.state.teamOneSelectionId;
			var teamTwoSelectionId=this.state.teamOneSelectionId;
			for(let i=0;i<this.state.getResults.length;i++){
				var inPlayClass = (this.state.getResults[i].inPlay === true) ? "active" : "";
				var colorClass = (this.state.getResults[i].color!=undefined ) ? this.state.getResults[i].color : "";
if(this.state.getResults[i].type==="match"){
	html.push(<tr style={{background: colorClass }} >
		<td  style={{ textAlign: "center",}}> {this.state.getResults[i].team_name}  </td>
		<td style={{ textAlign: "center" }}> {this.state.getResults[i].odds}  </td>
		<td style={{ textAlign: "center" }}> {this.state.getResults[i].stake}  </td>
	</tr>);
}
else{
	html1.push(<tr style={{background: colorClass }} >
		<td  style={{ textAlign: "center",}}> {this.state.getResults[i].team_name}  </td>
		<td style={{ textAlign: "center" }}> {this.state.getResults[i].odds}  </td>
		<td style={{ textAlign: "center" }}> {this.state.getResults[i].stake}  </td>
	</tr>);
}
					
				
			

				
				 
				 
			}
			
				//// // ////////////console.logthis.state.profit12);
				
	
					
			
			
			
			
				
				
			
			
			return <div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" data-toggle="tab" href="#home">Match</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#menu1">Un Match</a>
          </li>
        
        </ul>
        {/* Tab panes */}
        <div className="tab-content">
          <div id="home" className=" tab-pane active"><br />
          <div className="right_tablescrool">
		  <table className="table coupon-table">
				<thead>
					<tr>
						<th style={{ textAlign: "center" }} > Team Name</th>
						<th style={{ textAlign: "center" }} > Odds</th>
						<th style={{ textAlign: "center" }} > Stake</th>
					</tr>
				</thead>
				<tbody>{html}</tbody>
			</table>
          </div>
          </div>
          <div id="menu1" className=" tab-pane fade"><br />
		   <div className="right_tablescrool">
		  <table className="table coupon-table">
				<thead>
					<tr>
						<th style={{ textAlign: "center" }} > Team Name</th>
						<th style={{ textAlign: "center" }} > Odds</th>
						<th style={{ textAlign: "center" }} > Stake</th>
					</tr>
				</thead>
				<tbody>{html1}</tbody>
			</table>
          </div>
          </div>
         
        </div>
     
			
		 </div>
			;

			
		}
	}
	onFancybetClick = (e) => {
		let currVal = e.target.value;
		const { getFancybet } = this.state;
		this.setState(() => ({
			getFancybet: !getFancybet,
			amountFancybetBal:currVal
		}));    
	};
	onFancybetSecondClick = (f) => {
		let currSecVal = f.target.value; 
		const { getFancySecondbet } = this.state;
		this.setState(() => ({
			getFancySecondbet: !getFancySecondbet, 
			amountFancybetBalSecond:currSecVal
			
		}))
		$(".pancypick").click(function(){
		
		}); 
	};
	showFancyTableHtml = () => {

		if (this.state.fancybet_betDataFound === true) {
			const html = []
		
			for(var a=0;a<this.state.fancybet_getResults.length;a++){
				const value=this.state.fancybet_getResults[a];
				 ////////////console.log)
				html.push(
					<tr className="bet-info">
						<td className="team-name nation"> <span><strong style={{ color: "font-weight:normal" }} >{value.title}</strong></span>
							<p><span className="float-left book" id="book_175" style={{ color: "black" }}>0</span> <span className="float-right profit" id="profit_175"></span></p>
						</td>
						<td className="lay-color box-w1">
							<button className="bet-sec lay ses_row pancypick" value={value.no_first} onClick={this.onFancybetClick.bind(this)}> 
								<span className="odd Jaya" id={"nofirstpink"+a}>{value.no_first}</span>
								{value.no_second}
							</button></td>
						<td className="text-center back box-w1">
							<button className="bet-sec lay ses_row" value={value.yes_first} onClick={this.onFancybetSecondClick.bind(this)} >
							<span className="odd">{value.yes_first}</span>{value.yes_second}
							</button></td>
						<td className="text-right p-r-10 box-w2"><span>Min/Max</span><br></br> {value.minimum}/{value.maximum}</td>
					</tr>);	 
			}
			/*this.state.fancybet_getResults.map(function (value, i) { 
				html.push(
					<tr className="bet-info">
						<td className="team-name nation"> <span><strong style={{ color: "font-weight:normal" }} >{value.title}</strong></span>
							<p><span className="float-left book" id="book_175" style={{ color: "black" }}>0</span> <span className="float-right profit" id="profit_175"></span></p>
						</td>
						<td className="lay-color box-w1">
							<button className="bet-sec lay ses_row pancypick" onClick={fancyPink}>
								
								<span className="odd Jaya" id={"nofirstpink"+i}>{value.no_first}</span>
								<span className="span1">{value.no_second}</span>
							</button>
						</td>
						<td className="text-center back box-w1"><button className="bet-sec lay ses_row" onClick={fancySkyblue}>
							<span className="odd">{value.yes_first}</span><span className="span1">{value.yes_second}</span></button></td>
						<td className="text-right p-r-10 box-w2"><span>Min/Max</span><br></br> {value.minimum}/{value.maximum}</td>
					</tr>);
			})*/
			return <table className="coupon-table table table-bordered">
				<thead>
					<tr>
						<th></th>
						<th className="text-center  box-w1 lay">No</th>
						<th className="text-center  box-w1 lay">Yes</th>
						<th className="box-w2"></th>
					</tr>
				</thead>

				<tbody>{html} </tbody>
			</table>;
		}
		
	}

	//Onchange Value Amount
	handleChange = (event) => {
		let { name, value } = event.target;
		// if(value<=0){
		// 	return false;
		// }
		
		var profit = this.state.profit;
		 // ////////////console.logprofit);
		var stackAmount = this.state.stake_amount;
			////console.logthis.state.type);
		// // ////////////console.logthis.state.type);
		
		if(this.state.betClick==true){
			if(this.state.type === "back") {
				profit = parseFloat(this.state.oddVal)-1;
				profit = profit.toFixed(2) * event.target.value;
				
				 // ////////////console.logthis.state.betMatchType);
				if(this.state.betMatchType=="teamone"){
					this.setState({team_profit1:profit.toFixed(2)})
					
				}
				 if(this.state.betMatchType=="teamtwo"){
					this.setState({team_profit2:profit.toFixed(2)})
			
			
				}
				if(this.state.betMatchType=="draw"){
					this.setState({team_profit3:profit.toFixed(2)})
				}
				
				if(this.state.betMatchType=="teamone"){
					this.setState({stackAmount_team2:"-"+ event.target.value})
					this.setState({stackAmount_team3:"-"+event.target.value})
				}
				 if(this.state.betMatchType=="teamtwo"){
					this.setState({stackAmount_team1:"-"+event.target.value})
					this.setState({stackAmount_team3:"-"+event.target.value})
				}
			
				if(this.state.betMatchType=="draw"){
					this.setState({stackAmount_team1:"-"+event.target.value})
					this.setState({stackAmount_team2:"-"+event.target.value})
				}
			
				this.setState({ [name]: value,profit:profit.toFixed(2),emptyField:false,errMsg:"" });
				
			}
			else if(this.state.type === "lay"){
				////console.logevent.target.value);
				//profit = parseFloat(this.state.oddVal)-1;
					//profit = getAmount * getAmount;
					profit = parseFloat(this.state.oddVal)-1;
					profit = profit.toFixed(2) * event.target.value;
				if(this.state.betMatchType=="teamone"){
					this.setState({team_profit1:"-"+profit.toFixed(2)})
				}
				else if(this.state.betMatchType=="teamtwo"){
					this.setState({team_profit2:"-"+profit.toFixed(2)})
				}
			
				if(this.state.betMatchType=="draw"){
					this.setState({team_profit3:"-"+profit.toFixed(2)})
				}
			
				if(this.state.betMatchType=="teamone"){
					this.setState({stackAmount_team2:event.target.value})
					this.setState({stackAmount_team3:event.target.value})
				}
				else if(this.state.betMatchType=="teamtwo"){
					this.setState({stackAmount_team1:event.target.value})
					this.setState({stackAmount_team3:event.target.value})
				}
			
				if(this.state.betMatchType=="draw"){
					this.setState({stackAmount_team1:event.target.value})
					this.setState({stackAmount_team2:event.target.value})
				}
					 this.setState({ [name]: value,profit:event.target.value,emptyField:false,errMsg:"" });
			}
		}
		if(this.state.betClick2==true){
			if(this.state.type === "back") {
				//console.log(this.state.oddVal);
				
				if(Number.isInteger(parseFloat(this.state.oddVal))==true){
					profit =parseFloat(this.state.oddVal) / parseFloat(100)
				}else{
					profit = parseFloat(this.state.oddVal)-parseFloat(1);
				}
				
				profit = profit.toFixed(2) *parseFloat(event.target.value);
				
				 // ////////////console.logthis.state.betMatchType);
				if(this.state.betMatchType=="teamone"){
					this.setState({team_profit4:profit.toFixed(2)})
					
				}
				 if(this.state.betMatchType=="teamtwo"){
					this.setState({team_profit5:profit.toFixed(2)})
			
			
				}
				if(this.state.betMatchType=="draw"){
					this.setState({team_profit6:profit.toFixed(2)})
				}
				
				if(this.state.betMatchType=="teamone"){
					this.setState({stackAmount_team5:"-"+ event.target.value})
					this.setState({stackAmount_team6:"-"+event.target.value})
				}
				 if(this.state.betMatchType=="teamtwo"){
					this.setState({stackAmount_team4:"-"+event.target.value})
					this.setState({stackAmount_team6:"-"+event.target.value})
				}
			
				if(this.state.betMatchType=="draw"){
					this.setState({stackAmount_team4:"-"+event.target.value})
					this.setState({stackAmount_team5:"-"+event.target.value})
				}
			
				this.setState({ [name]: value,profit:profit.toFixed(2),emptyField:false,errMsg:"" });
				
			}
			else if(this.state.type === "lay"){
				////console.logevent.target.value);
				//profit = parseFloat(this.state.oddVal)-1;
					//profit = getAmount * getAmount;
					// profit = parseFloat(this.state.oddVal)-1;
					 if(Number.isInteger(parseFloat(this.state.oddVal))==true){
						profit =parseFloat(this.state.oddVal) / parseFloat(100)
					}else{
						profit = parseFloat(this.state.oddVal)-parseFloat(1);
					 }
					 profit = profit.toFixed(2) * event.target.value;

				if(this.state.betMatchType=="teamone"){
					this.setState({team_profit4:"-"+profit.toFixed(2)})
				}
				else if(this.state.betMatchType=="teamtwo"){
					this.setState({team_profit5:"-"+profit.toFixed(2)})
				}
			
				if(this.state.betMatchType=="draw"){
					this.setState({team_profit6:"-"+profit.toFixed(2)})
				}
			
				if(this.state.betMatchType=="teamone"){
					this.setState({stackAmount_team5:event.target.value})
					this.setState({stackAmount_team6:event.target.value})
				}
				else if(this.state.betMatchType=="teamtwo"){
					this.setState({stackAmount_team4:event.target.value})
					this.setState({stackAmount_team6:event.target.value})
				}
			
				if(this.state.betMatchType=="draw"){
					this.setState({stackAmount_team4:event.target.value})
					this.setState({stackAmount_team5:event.target.value})
				}
					 this.setState({ [name]: value,profit:event.target.value,emptyField:false,errMsg:"" });
			}
		}

	
		
	}



	handleChangeStakeamount = (event) => {
		
		this.setState({stake_amount:event.target.value})
	}
	handleChange_session_input = (event) => {
		var profit = this.state.profit.toFixed(2);
		
		
		this.setState({session_input:event.target.value})
	}
	
	handleButtonsClick = (getAmount) =>{
	
		if(this.state.betClick==true){
			var profit = "";
		if(this.state.type === "back") {
			profit = parseFloat(this.state.oddVal)-1;
			profit = profit.toFixed(2) * getAmount;
			
			 // ////////////console.logthis.state.betMatchType);
			if(this.state.betMatchType=="teamone"){
				this.setState({team_profit1:profit.toFixed(2)})
				
			}
			 if(this.state.betMatchType=="teamtwo"){
				this.setState({team_profit2:profit.toFixed(2)})
	
	
			}
			if(this.state.betMatchType=="draw"){
				this.setState({team_profit3:profit.toFixed(2)})
			}
			
			if(this.state.betMatchType=="teamone"){
				this.setState({stackAmount_team2:"-"+getAmount})
				this.setState({stackAmount_team3:"-"+getAmount})
			}
			 if(this.state.betMatchType=="teamtwo"){
				this.setState({stackAmount_team1:"-"+getAmount})
				this.setState({stackAmount_team3:"-"+getAmount})
			}
			if(this.state.betMatchType=="draw"){
				this.setState({stackAmount_team1:"-"+getAmount})
				this.setState({stackAmount_team2:"-"+getAmount})
			}

			this.setState({stake_amount:getAmount,profit:profit});
			
		}
		else if(this.state.type === "lay"){
			
			//profit = parseFloat(this.state.oddVal)-1;
				//profit = getAmount * getAmount;
				profit = parseFloat(this.state.oddVal)-1;
       			profit = profit.toFixed(2) * getAmount;


				
			if(this.state.betMatchType=="teamone"){
				this.setState({team_profit1:"-"+profit.toFixed(2)})
			}
			else if(this.state.betMatchType=="teamtwo"){
				this.setState({team_profit2:"-"+profit.toFixed(2)})
	
	
			}

			if(this.state.betMatchType=="draw"){
				this.setState({team_profit3:"-"+profit})
			}
	
			if(this.state.betMatchType=="teamone"){
				this.setState({stackAmount_team2:getAmount})
				this.setState({stackAmount_team3:getAmount})
			}
			else if(this.state.betMatchType=="teamtwo"){
				this.setState({stackAmount_team1:getAmount})
				this.setState({stackAmount_team3:getAmount})
			}

			if(this.state.betMatchType=="draw"){
				this.setState({stackAmount_team1:getAmount})
				this.setState({stackAmount_team2:getAmount})
			}
			this.setState({stake_amount:getAmount,profit:getAmount});
		}
		
			
		}
		if(this.state.betClick2==true){
		
			var profit = "";
		if(this.state.type === "back") {
			
			if(Number.isInteger(parseFloat(this.state.oddVal))==true){
				profit =parseFloat(this.state.oddVal) / parseFloat(100)
			}else{
				profit = parseFloat(this.state.oddVal)-parseFloat(1);
			}

			
			profit = profit.toFixed(2) * getAmount;
			
			 // ////////////console.logthis.state.betMatchType);
			if(this.state.betMatchType=="teamone"){
				this.setState({team_profit4:profit.toFixed(2)})
				
			}
			 if(this.state.betMatchType=="teamtwo"){
				this.setState({team_profit5:profit.toFixed(2)})
	
	
			}
			if(this.state.betMatchType=="draw"){
				this.setState({team_profit6:profit.toFixed(2)})
			}
			
			
			if(this.state.betMatchType=="teamone"){
				this.setState({stackAmount_team5:"-"+getAmount})
				this.setState({stackAmount_team6:"-"+getAmount})
			}
			 if(this.state.betMatchType=="teamtwo"){
				this.setState({stackAmount_team4:"-"+getAmount})
				this.setState({stackAmount_team6:"-"+getAmount})
			}

			if(this.state.betMatchType=="draw"){
				this.setState({stackAmount_team4:"-"+getAmount})
				this.setState({stackAmount_team5:"-"+getAmount})
			}

			this.setState({stake_amount:getAmount,profit:profit});
			
		}
		else if(this.state.type === "lay"){
			
			//profit = parseFloat(this.state.oddVal)-1;
				//profit = getAmount * getAmount;
				
				if(Number.isInteger(parseFloat(this.state.oddVal))==true){
					profit =parseFloat(this.state.oddVal) / parseFloat(100)
				}else{
					profit = parseFloat(this.state.oddVal)-parseFloat(1);
				 }
				 profit = profit.toFixed(2) * getAmount;

			if(this.state.betMatchType=="teamone"){
				this.setState({team_profit4:"-"+profit.toFixed(2)})
			}
			else if(this.state.betMatchType=="teamtwo"){
				this.setState({team_profit5:"-"+profit.toFixed(2)})
	
	
			}

			if(this.state.betMatchType=="draw"){
				this.setState({team_profit6:"-"+profit.toFixed(2)})
			}
	
			if(this.state.betMatchType=="teamone"){
				this.setState({stackAmount_team5:getAmount})
				this.setState({stackAmount_team6:getAmount})
			}
			else if(this.state.betMatchType=="teamtwo"){
				this.setState({stackAmount_team4:getAmount})
				this.setState({stackAmount_team6:getAmount})
			}

			if(this.state.betMatchType=="draw"){
				this.setState({stackAmount_team4:getAmount})
				this.setState({stackAmount_team5:getAmount})
			}
			this.setState({stake_amount:getAmount,profit:getAmount});
		}
			
		//this.setState({stake_amount:getAmount,profit:getAmount});
		}
		
	}
	handleButtonsNewClick = (getAmount) =>{
		this.setState({stake_amount:getAmount});
	}
	
	handleBidClick = (teamName,oddVal,color,type,selectionId,marketId,getMatchType,status,betOn,betMatchUnmatchType) =>{
			
			if(betMatchUnmatchType==="betunmatch" && this.state.unmatchOddStatus==="disable"){
				return false;
			}
			
			this.setState({betClick:true,betClick1:false,betClick2:false});
			this.setState({
						   teamName:teamName,
						   oddVal:oddVal,
						   color:color,
						   type:type,
						   betSelectionId:selectionId,
						   betMarketId:marketId,
						   betMatchType:getMatchType,
						   betOn:"odds",
						   stake_amount:"",
						   profit22:"",
						   profit:"",
						   team_profit1:"",
						   team_profit2:"",
						   stackAmount_team3:"",
						   stackAmount_team1:"",
						   stackAmount_team2:"",
						   team_profit3:"",

						     team_profit4:"",
						   team_profit5:"",
						   stackAmount_team4:"",
						   stackAmount_team5:"",
						   stackAmount_team6:"",
						   	team_profit6:"",


						});
	}
	
	handleBidClickBook = (teamName,oddVal,color,type,selectionId,marketId,getMatchType,status,betOn,betMatchUnmatchType) =>{
		if(betMatchUnmatchType==="betunmatch" && this.state.unmatchOddStatus==="disable"){
				return false;
			}
			
			
			
		this.setState({betClick:false,betClick1:false,betClick2:true});
		this.setState({
						teamName:teamName,
					   oddVal:oddVal,
					   color:color,
					   type:type,
					   betSelectionId:selectionId,
					   betMarketId:marketId,
					   betMatchType:getMatchType,
					   betOn:betOn,
					   stake_amount:"",
					   profit22:"",
					   profit:"",
					   team_profit1:"",
					   team_profit2:"",
					   stackAmount_team3:"",
					   stackAmount_team1:"",
					   stackAmount_team2:"",
					   team_profit3:"",

					   team_profit4:"",
					   team_profit5:"",
					   stackAmount_team4:"",
					   stackAmount_team5:"",
					   stackAmount_team6:"",
					   team_profit6:"",
					   


					});
}

	handleBidClickSession = (color,headname,no,marketId,SessInptNo,yes,index1,layPrice,laySize,backPrice,backSize,yes_no_STAKE) =>{
			if(SessInptNo!=0){
				this.setState({betClick1:true,betClick:false,betClick2:false});
			}
			
			$("#btn_val").focus();
			this.setState({
						   color:color,
						   headname:headname,
						   session_input:SessInptNo,
						   yes_no_STAKE:yes_no_STAKE,
						   yes:yes,
						   no:no,
						   stake_amount:"",
						   profit22:"",
						   profit:"",
						   team_profit1:"",
						   team_profit2:"",
						   stackAmount_team1:"",
						   stackAmount_team2:"",
						   key_index:index1,
						   layPrice:layPrice,
						   laySize:laySize,
						   backPrice:backPrice,
						   backSize:backSize
						});
	}
	handleBidCrossClick = () =>{
		this.setState({betClick:false,
			betClick1:false,
			betClick2:false,
						   teamName:"",
						   oddVal:"",
						   color:"",
						   type:"",
						   betSelectionId:"",
						   betMarketId:"",
						   betMatchType:"",
						   stake_amount:"",
						   profit:""});
	}
	
	showBidClickHtml = () =>{
		//console.log(this.state.betClick2);
		
		if(this.state.betClick===true) {
			
			var button_1 =1000;
			var button_2 =400;
			var button_3 =10000;
			var button_4 =2400;
			var button_5 =4000;
			var button_6 =100000;
			var button_7 =400000;
			var button_8 =40000;
			var button_9 =1000000;
			var button_10 =240000;

			
			var value_1 =1000;
			var value_2 =400;
			var value_3 =10000;
			var value_4 =2400;
			var value_5 =4000;
			var value_6 =100000;
			var value_7 =400000;
			var value_8 =40000;
			var value_9 =1000000;
			var value_10 =240000;

			if(this.state.buttonValue111!=undefined){
				if(this.state.buttonValue111.value_1!=undefined){
					value_1=this.state.buttonValue111.value_1;
				}
				if(this.state.buttonValue111.value_2!=undefined){
					value_2=this.state.buttonValue111.value_2;
				}

				if(this.state.buttonValue111.value_3!=undefined){
					value_3=this.state.buttonValue111.value_3;
				}
				if(this.state.buttonValue111.value_1!=undefined){
					value_1=this.state.buttonValue111.value_1;
				}

				if(this.state.buttonValue111.value_4!=undefined){
					value_4=this.state.buttonValue111.value_4;
				}
				if(this.state.buttonValue111.value_1!=undefined){
					value_1=this.state.buttonValue111.value_1;
				}

				if(this.state.buttonValue111.value_5!=undefined){
					value_5=this.state.buttonValue111.value_5;
				}
				if(this.state.buttonValue111.value_6!=undefined){
					value_6=this.state.buttonValue111.value_6;
				}
				if(this.state.buttonValue111.value_1!=undefined){
					value_7=this.state.buttonValue111.value_7;
				}
				if(this.state.buttonValue111.value_8!=undefined){
					value_8=this.state.buttonValue111.value_8;
				}
				if(this.state.buttonValue111.value_9!=undefined){
					value_9=this.state.buttonValue111.value_9;
				}
				if(this.state.buttonValue111.value_10!=undefined){
					value_10=this.state.buttonValue111.value_10;
				}



				if(this.state.buttonValue111.button_1!=undefined){
					button_1=this.state.buttonValue111.button_1;
				}
				if(this.state.buttonValue111.button_2!=undefined){
					button_2=this.state.buttonValue111.button_2;
				}
				
				if(this.state.buttonValue111.button_3!=undefined){
					button_3=this.state.buttonValue111.button_3;
				}
				if(this.state.buttonValue111.button_1!=undefined){
					button_1=this.state.buttonValue111.button_1;
				}
				
				if(this.state.buttonValue111.button_4!=undefined){
					button_4=this.state.buttonValue111.button_4;
				}
				if(this.state.buttonValue111.button_1!=undefined){
					button_1=this.state.buttonValue111.button_1;
				}
				
				if(this.state.buttonValue111.button_5!=undefined){
					button_5=this.state.buttonValue111.button_5;
				}
				if(this.state.buttonValue111.button_6!=undefined){
					button_6=this.state.buttonValue111.button_6;
				}
				if(this.state.buttonValue111.button_1!=undefined){
					button_7=this.state.buttonValue111.button_7;
				}
				if(this.state.buttonValue111.button_8!=undefined){
					button_8=this.state.buttonValue111.button_8;
				}
				if(this.state.buttonValue111.button_9!=undefined){
					button_9=this.state.buttonValue111.button_9;
				}
				if(this.state.buttonValue111.button_10!=undefined){
					button_10=this.state.buttonValue111.button_10;
				}









			}







		return (
		<div className=" hide-box-click22">
			<div className="table-responsive  " style={{ paddingBottom: "4px", display: "block",background: this.state.color }} >
			 <div className=" popop_cancial">Placebet</div>
				<form onSubmit={this.handleSubmit} method="post" id="frm_placebet">
				
					<table className="coupon-table table table-borderedless">
						<thead>
							<tr>
								<th></th>
								<th style={{ width: "35%", textAlign: "left" }} >(Bet for)</th>
								<th style={{ width: "35%", textAlign: "left" }} >Odds</th>
								<th style={{ width: "35%", textAlign: "left" }} >Stake</th>
								<th style={{ width: "35%", textAlign: "right" }} id="profit-head">Profit</th>
							</tr>
						</thead>
					<tbody>
						<tr>
							<td className="text-center"><a href="#;" className="text-danger clocebtn_popop" onClick={this.handleBidCrossClick}> <i className="fa fa-times"></i> </a></td>
							<td id="team_nm">{this.state.teamName}</td>
							<td style={{ width: "75px" }} >
								<div className="form-group">
								<input value={this.state.type} name="type" type="hidden" />
									<input value={this.state.oddVal} name="oddVal" className="amountint"  onChange={this.handleChange} type="number" required="required" maxLength="4" style={{ float: "left", width: "45px", verticalAlign: "middle" }} id="odds" step="0.01" />
								</div>
							</td>
							<td>
								<div className="form-group bet-stake">
									<input id="btn_val"  ref={this.emailInput} style={{ width: "52px" }} maxLength="10" value={this.state.stake_amount} name="stake_amount" type="number" onChange={this.handleChange} required="required" />
								</div>
							</td> 
							<td>
							{this.state.profit}
							</td> 
						</tr>
						<tr>
						  <td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
							<a href="javascript:void(0);" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_1} onClick={this.handleButtonsClick.bind(this,value_1)}>{button_1}</a>
							<a href="javascript:void(0);" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_2} onClick={this.handleButtonsClick.bind(this,value_2)}>{button_2}</a>
							<a href="javascript:void(0);" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_3} onClick={this.handleButtonsClick.bind(this,value_3)}>{button_3}</a>
							<a href="javascript:void(0);" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_4} onClick={this.handleButtonsClick.bind(this,value_4)}>{button_4}</a>
							<a href="javascript:void(0);" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_5} onClick={this.handleButtonsClick.bind(this,value_5)}>{button_5}</a>
							<a href="javascript:void(0);" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_6} onClick={this.handleButtonsClick.bind(this,value_6)}>{button_6}</a>
							<a href="javascript:void(0);" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_7} onClick={this.handleButtonsClick.bind(this,value_7)}>{button_7}</a>
							<a href="javascript:void(0);" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_8} onClick={this.handleButtonsClick.bind(this,value_8)}>{button_8}</a>
							<a href="javascript:void(0);" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_9} onClick={this.handleButtonsClick.bind(this,value_9)}>{button_9}</a>
							<a href="javascript:void(0);" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_10} onClick={this.handleButtonsClick.bind(this,value_10)}>{button_10}</a>
							</td>
						</tr>
					  </tbody>
					</table>
					<div className="col-md-12">
					{this.responseHtml()}
					{this.emptyHtml()}
						<button className="btn btn-sm btn-danger float-left" type="button" onClick={this.handleBidCrossClick}>Reset</button>
						<button className="btn btn-sm btn-success float-right" type="submit" id="submit_btn">Submit</button>
						
					</div>
				</form>
				
			</div>
			</div>
			
				);
				
		
		}
		if(this.state.betClick2===true) {
		
			var button_1 =1000;
			var button_2 =400;
			var button_3 =10000;
			var button_4 =2400;
			var button_5 =4000;
			var button_6 =100000;
			var button_7 =400000;
			var button_8 =40000;
			var button_9 =1000000;
			var button_10 =240000;

			
			var value_1 =1000;
			var value_2 =400;
			var value_3 =10000;
			var value_4 =2400;
			var value_5 =4000;
			var value_6 =100000;
			var value_7 =400000;
			var value_8 =40000;
			var value_9 =1000000;
			var value_10 =240000;
			if(this.state.buttonValue111!=undefined){
				if(this.state.buttonValue111.value_1!=undefined){
					value_1=this.state.buttonValue111.value_1;
				}
				if(this.state.buttonValue111.value_2!=undefined){
					value_2=this.state.buttonValue111.value_2;
				}

				if(this.state.buttonValue111.value_3!=undefined){
					value_3=this.state.buttonValue111.value_3;
				}
				if(this.state.buttonValue111.value_1!=undefined){
					value_1=this.state.buttonValue111.value_1;
				}

				if(this.state.buttonValue111.value_4!=undefined){
					value_4=this.state.buttonValue111.value_4;
				}
				if(this.state.buttonValue111.value_1!=undefined){
					value_1=this.state.buttonValue111.value_1;
				}

				if(this.state.buttonValue111.value_5!=undefined){
					value_5=this.state.buttonValue111.value_5;
				}
				if(this.state.buttonValue111.value_6!=undefined){
					value_6=this.state.buttonValue111.value_6;
				}
				if(this.state.buttonValue111.value_1!=undefined){
					value_7=this.state.buttonValue111.value_7;
				}
				if(this.state.buttonValue111.value_8!=undefined){
					value_8=this.state.buttonValue111.value_8;
				}
				if(this.state.buttonValue111.value_9!=undefined){
					value_9=this.state.buttonValue111.value_9;
				}
				if(this.state.buttonValue111.value_10!=undefined){
					value_10=this.state.buttonValue111.value_10;
				}



				if(this.state.buttonValue111.button_1!=undefined){
					button_1=this.state.buttonValue111.button_1;
				}
				if(this.state.buttonValue111.button_2!=undefined){
					button_2=this.state.buttonValue111.button_2;
				}
				
				if(this.state.buttonValue111.button_3!=undefined){
					button_3=this.state.buttonValue111.button_3;
				}
				if(this.state.buttonValue111.button_1!=undefined){
					button_1=this.state.buttonValue111.button_1;
				}
				
				if(this.state.buttonValue111.button_4!=undefined){
					button_4=this.state.buttonValue111.button_4;
				}
				if(this.state.buttonValue111.button_1!=undefined){
					button_1=this.state.buttonValue111.button_1;
				}
				
				if(this.state.buttonValue111.button_5!=undefined){
					button_5=this.state.buttonValue111.button_5;
				}
				if(this.state.buttonValue111.button_6!=undefined){
					button_6=this.state.buttonValue111.button_6;
				}
				if(this.state.buttonValue111.button_1!=undefined){
					button_7=this.state.buttonValue111.button_7;
				}
				if(this.state.buttonValue111.button_8!=undefined){
					button_8=this.state.buttonValue111.button_8;
				}
				if(this.state.buttonValue111.button_9!=undefined){
					button_9=this.state.buttonValue111.button_9;
				}
				if(this.state.buttonValue111.button_10!=undefined){
					button_10=this.state.buttonValue111.button_10;
				}









			}
			

			

			
			return (
				<div className="table-responsive hide-box-click" style={{ paddingBottom: "4px", display: "block",background: this.state.color }} >
				{/* <div className=" popop_cancial">Placebet<i className="fa fa-times close22" onClick={this.handleBidCrossClick} ></i></div> */}
				   <form onSubmit={this.handleSubmit} method="post" id="frm_placebet">
				   
					   <table className="coupon-table table table-borderedless">
						   <thead>
							   <tr>
								   <th></th>
								   <th style={{ width: "35%", textAlign: "left" }} >(Bet for)</th>
								   <th style={{ width: "35%", textAlign: "left" }} >Odds</th>
								   <th style={{ width: "35%", textAlign: "left" }} >Stake</th>
								   <th style={{ width: "35%", textAlign: "right" }} id="profit-head">Profit</th>
							   </tr>
						   </thead>
					   <tbody>
						   <tr>
							   <td className="text-center"><a href="#;" className="text-danger clocebtn_popop" onClick={this.handleBidCrossClick}> <i className="fa fa-times"></i> </a></td>
							   <td id="team_nm">{this.state.teamName}</td>
							   <td style={{ width: "75px" }} >
								   <div className="form-group">
								   <input value={this.state.type} name="type" type="hidden" />
									   <input value={this.state.oddVal} name="oddVal" className="amountint"  onChange={this.handleChange} type="number" required="required" maxLength="4" style={{ float: "left", width: "45px", verticalAlign: "middle" }} id="odds" step="0.01" />
								   </div>
							   </td>
							   <td>
								   <div className="form-group bet-stake">
									   <input id="btn_val"  ref={this.emailInput} style={{ width: "52px" }} maxLength="10" value={this.state.stake_amount} name="stake_amount" type="number" onChange={this.handleChange} required="required" />
								   </div>
							   </td> 
							   <td>
							   {this.state.profit}
							   </td> 
						   </tr>
						   <tr>
							 <td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
							   <a href="javascript:void(0);" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_1} onClick={this.handleButtonsClick.bind(this,value_1)}>{button_1}</a>
							   <a href="javascript:void(0);" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_2} onClick={this.handleButtonsClick.bind(this,value_2)}>{button_2}</a>
							   <a href="javascript:void(0);" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_3} onClick={this.handleButtonsClick.bind(this,value_3)}>{button_3}</a>
							   <a href="javascript:void(0);" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_4} onClick={this.handleButtonsClick.bind(this,value_4)}>{button_4}</a>
							   <a href="javascript:void(0);" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_5} onClick={this.handleButtonsClick.bind(this,value_5)}>{button_5}</a>
							   <a href="javascript:void(0);" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_6} onClick={this.handleButtonsClick.bind(this,value_6)}>{button_6}</a>
							   <a href="javascript:void(0);" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_7} onClick={this.handleButtonsClick.bind(this,value_7)}>{button_7}</a>
							   <a href="javascript:void(0);" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_8} onClick={this.handleButtonsClick.bind(this,value_8)}>{button_8}</a>
							   <a href="javascript:void(0);" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_9} onClick={this.handleButtonsClick.bind(this,value_9)}>{button_9}</a>
							   <a href="javascript:void(0);" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_10} onClick={this.handleButtonsClick.bind(this,value_10)}>{button_10}</a>
							   </td>
						   </tr>
						 </tbody>
					   </table>
					   <div className="col-md-12">
					   {this.responseHtml()}
					   {this.emptyHtml()}
						   <button className="btn btn-sm btn-danger float-left" type="button" onClick={this.handleBidCrossClick}>Reset</button>
						   <button className="btn btn-sm btn-success float-right" type="submit" id="submit_btn">Submit</button>
						   
					   </div>
				   </form>
				   
			   </div>
			   
				);
		}
		
	}

	showBidClickSessionHtml = () =>{
		
		if(this.state.betClick1===true) {
			var button_1 =1000;
			var button_2 =400;
			var button_3 =10000;
			var button_4 =2400;
			var button_5 =4000;
			var button_6 =100000;
			var button_7 =400000;
			var button_8 =40000;
			var button_9 =1000000;
			var button_10 =240000;

			
			var value_1 =1000;
			var value_2 =400;
			var value_3 =10000;
			var value_4 =2400;
			var value_5 =4000;
			var value_6 =100000;
			var value_7 =400000;
			var value_8 =40000;
			var value_9 =1000000;
			var value_10 =240000;
			if(this.state.buttonValue111!=undefined){
				if(this.state.buttonValue111.value_1!=undefined){
					value_1=this.state.buttonValue111.value_1;
				}
				if(this.state.buttonValue111.value_2!=undefined){
					value_2=this.state.buttonValue111.value_2;
				}

				if(this.state.buttonValue111.value_3!=undefined){
					value_3=this.state.buttonValue111.value_3;
				}
				if(this.state.buttonValue111.value_1!=undefined){
					value_1=this.state.buttonValue111.value_1;
				}

				if(this.state.buttonValue111.value_4!=undefined){
					value_4=this.state.buttonValue111.value_4;
				}
				if(this.state.buttonValue111.value_1!=undefined){
					value_1=this.state.buttonValue111.value_1;
				}

				if(this.state.buttonValue111.value_5!=undefined){
					value_5=this.state.buttonValue111.value_5;
				}
				if(this.state.buttonValue111.value_6!=undefined){
					value_6=this.state.buttonValue111.value_6;
				}
				if(this.state.buttonValue111.value_1!=undefined){
					value_7=this.state.buttonValue111.value_7;
				}
				if(this.state.buttonValue111.value_8!=undefined){
					value_8=this.state.buttonValue111.value_8;
				}
				if(this.state.buttonValue111.value_9!=undefined){
					value_9=this.state.buttonValue111.value_9;
				}
				if(this.state.buttonValue111.value_10!=undefined){
					value_10=this.state.buttonValue111.value_10;
				}



				if(this.state.buttonValue111.button_1!=undefined){
					button_1=this.state.buttonValue111.button_1;
				}
				if(this.state.buttonValue111.button_2!=undefined){
					button_2=this.state.buttonValue111.button_2;
				}
				
				if(this.state.buttonValue111.button_3!=undefined){
					button_3=this.state.buttonValue111.button_3;
				}
				if(this.state.buttonValue111.button_1!=undefined){
					button_1=this.state.buttonValue111.button_1;
				}
				
				if(this.state.buttonValue111.button_4!=undefined){
					button_4=this.state.buttonValue111.button_4;
				}
				if(this.state.buttonValue111.button_1!=undefined){
					button_1=this.state.buttonValue111.button_1;
				}
				
				if(this.state.buttonValue111.button_5!=undefined){
					button_5=this.state.buttonValue111.button_5;
				}
				if(this.state.buttonValue111.button_6!=undefined){
					button_6=this.state.buttonValue111.button_6;
				}
				if(this.state.buttonValue111.button_1!=undefined){
					button_7=this.state.buttonValue111.button_7;
				}
				if(this.state.buttonValue111.button_8!=undefined){
					button_8=this.state.buttonValue111.button_8;
				}
				if(this.state.buttonValue111.button_9!=undefined){
					button_9=this.state.buttonValue111.button_9;
				}
				if(this.state.buttonValue111.button_10!=undefined){
					button_10=this.state.buttonValue111.button_10;
				}









			}
			
			$("#stake_amount").focus();
			return (
			 <div className=" hide-box-click22">
			<div className="table-responsive hide-box-click  hide-box-click22" style={{ paddingBottom: "4px", display: "block",background: this.state.color }} > 
				 <div className=" popop_cancial">Placebet</div>
				<form onSubmit={this.handleSubmitSession} method="post" id="frm_placebet">
				
					<table className="coupon-table table table-borderedless">
						<thead>
							<tr>
								<th></th>
								<th style={{ width: "35%", textAlign: "left" }} >(Bet for)</th>
								<th style={{ width: "35%", textAlign: "left" }} >Odds</th>
								<th style={{ width: "35%", textAlign: "left" }} >Stake</th>
								<th style={{ width: "35%", textAlign: "right" }} id="profit-head">Profit</th>
							</tr>
						</thead>
					<tbody>
						<tr>
							<td className="text-center"><a href="#;" className="text-danger clocebtn_popop" onClick={this.handleBidCrossClick}> <i className="fa fa-times"></i> </a></td>
							<td id="team_nm">{this.state.headname}</td>
							<td style={{ width: "75px" }} >
								<div className="form-group">
								<input value={this.state.no} name="no" type="hidden" />
								<input value={this.state.yes} name="yes" type="hidden" />
									<input value={this.state.SessInptNo} 
									
									name="session_input" value= {this.state.session_input} className="amountint"  onChange={this.handleChange_session_input} type="number" required="required" maxLength="4" style={{ float: "left", width: "45px", verticalAlign: "middle" }} id="odds" step="0.01" />
								</div>
							</td>
							<td>
								<div className="form-group bet-stake">
									<input id="stake_amount" style={{ width: "52px" }} maxLength="10" value={this.state.stake_amount} name="stake_amount" type="text" onChange={this.handleChangeStakeamount} required="required" />
								</div>
							</td> 
							<td>
							{this.state.profit}
							</td> 
						</tr>
						<tr>
						  <td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_1} onClick={this.handleButtonsNewClick.bind(this,value_1)}>{button_1}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_2} onClick={this.handleButtonsNewClick.bind(this,value_2)}>{button_2}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_3} onClick={this.handleButtonsNewClick.bind(this,value_3)}>{button_3}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_4} onClick={this.handleButtonsNewClick.bind(this,value_4)}>{button_4}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_5} onClick={this.handleButtonsNewClick.bind(this,value_5)}>{button_5}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_6} onClick={this.handleButtonsNewClick.bind(this,value_6)}>{button_6}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_7} onClick={this.handleButtonsNewClick.bind(this,value_7)}>{button_7}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_8} onClick={this.handleButtonsNewClick.bind(this,value_8)}>{button_8}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_9} onClick={this.handleButtonsNewClick.bind(this,value_9)}>{button_9}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_10} onClick={this.handleButtonsNewClick.bind(this,value_10)}>{button_10}</a>
							</td>
						</tr>
					  </tbody>
					</table>
					<div className="col-md-12">
					{this.responseHtml()}
					{this.emptyHtml()}
						<button className="btn btn-sm btn-danger float-left" type="button" onClick={this.handleBidCrossClick}>Reset</button>
						<button className="btn btn-sm btn-success float-right" type="submit" id="submit_btn">Submit</button>
						
					</div>
				</form>
			</div>
			</div>
				);
		}
		
	}





	handleDepoWithdrPopupClose=()=>{
		this.setState({showUserAmountPopup:false})
   }




	showVideo=()=>{
		if(this.state.showVideo===true) {	
			return <iframe src={"https://new.apple365.bet/tvsetting/getMatchTvFeedApi/"+this.state.currentMatchId+"/18.159.217.229"}></iframe>
		}
		else {
			return <div>&nbsp;</div>
		}
	}
	
	handleLiveTvClick=()=>{
		this.setState({showVideo:!this.state.showVideo});
	}

	render() {
		//console.log(this.state.userData);
		 var blockOddsHtml='';
		 if(this.state.oddsMatchSuspend || this.state.isSuspend===1){
			var blockOddsHtml= <div className="bet-info suspendedodds row"><span>SUSPENDED</span></div>;
		}
		var change_password=localStorage.getItem("change_password")
		if (change_password!=""  && change_password!=null) {
			return (
				<Redirect to="/change_password" />
			);
		}
		var suspended ="bet-info ";
		if(this.state.bookmaker_a_status==="SUSPENDED"){
			suspended ="bet-info suspended row";
		}
		var suspended1 ="bet-info ";
		if(this.state.bookmaker_b_status==="SUSPENDED"){
			 suspended1 ="bet-info suspended row";
		}
		var suspended2 ="bet-info row";

		if(this.state.bookmaker_d_status==="SUSPENDED"){
			suspended2 ="bet-info suspended row";
		}

		var userMaxSportSetting = (this.state.userData !==undefined && this.props.match.params.id1==="cricket") ?   this.state.userData.cricket_max_bet : ((this.state.userData !==undefined && this.props.match.params.id1==="soccer") ?   this.state.userData.football_max_bet : ((this.state.userData !==undefined && this.props.match.params.id1==="tennis") ?   this.state.userData.tennis_max_bet : undefined) );
		var fancyMaxBetLimit = (userMaxSportSetting!=undefined && userMaxSportSetting>0) ? userMaxSportSetting : this.state.max_fancy_limit;
		
		var userMinSportSetting = (this.state.userData !==undefined && this.props.match.params.id1==="cricket") ?   this.state.userData.cricket_min_bet : ((this.state.userData !==undefined && this.props.match.params.id1==="soccer") ?   this.state.userData.football_min_bet : ((this.state.userData !==undefined && this.props.match.params.id1==="tennis") ?   this.state.userData.tennis_min_bet : undefined) );
		//var fancyMinBetLimit = (userMinSportSetting!=undefined && userMinSportSetting>0) ? userMinSportSetting : this.state.min_fancy_limit;
		var fancyMinBetLimit = this.state.min_fancy_limit;
		
		var new_array=[];
		var new_array1="";
		var datafancy=this.state.fancydata;
		if(this.state.sessiondata!=undefined){
			
			for(var i=0;i<this.state.sessiondata.length;i++){
				var fancy_suspend="box-w1 lay-color fb_td";
				var fancy_suspend1="box-w1 back-color fb_td";
				//console.logthis.state.sessiondata[i]);
				var data123=datafancy;
			
				if(data123!=undefined){
		// console.log(data123[this.state.sessiondata[i].RunnerName]);
		// console.log(data123);
		
				if(data123.indexOf(this.state.sessiondata[i].RunnerName)>=0){
				
					// if(data123.indexOf(this.state.sessiondata[i].RunnerName) > 0)
				
			
// if(this.state.sessiondata[i].RunnerName==datafancy[this.state.sessiondata[i].RunnerName]){
	
				

//}
				if(this.state.sessiondata[i].LayPrice1==0 || this.state.isSuspend===1){
					fancy_suspend ="box-w1 lay-color fb_td suspended ";
				}
				if(this.state.sessiondata[i].BackPrice1==0 || this.state.isSuspend===1){
					fancy_suspend1 ="box-w1 back-color fb_td suspended";
				}
				new_array1=<tr>
				<td className="fb_64">< a href="#"
				 > {this.state.sessiondata[i].RunnerName} 
				  &nbsp;	</a>
				
				  <button className="tableman_btn" onClick={this.handleModelShow.bind(this,this.state.sessiondata[i].RunnerName,this.state.sessiondata[i].LayPrice1,this.state.sessiondata[i].BackPrice1,)}>Book</button>


				 </td>
				 <td  className={fancy_suspend}>
				<button value={i} onClick= 
				{this.handleBidClickSession.bind(this, '#faa9ba',this.state.sessiondata[i].RunnerName,"no",this.state.sessiondata[i].marketId,this.state.sessiondata[i].LayPrice1,"",this.state.sessiondata[i].market_id,this.state.sessiondata[i].LayPrice1,this.state.sessiondata[i].LaySize1,this.state.sessiondata[i].BackPrice1,this.state.sessiondata[i].BackSize1)}
				className="bet-sec lay"><span className="odd layprice"> {this.state.sessiondata[i].LayPrice1}</span>{this.state.sessiondata[i].LaySize1}</button></td>

				<td  className="box-w1 back-color fb_td">
				<button className="bet-sec back" value={i} 
				 onClick= 
				 {this.handleBidClickSession.bind(this, '#72bbef',this.state.sessiondata[i].RunnerName,"yes",this.state.sessiondata[i].marketId,this.state.sessiondata[i].BackPrice1,"",this.state.sessiondata[i].market_id,this.state.sessiondata[i].LayPrice1,this.state.sessiondata[i].LaySize1,this.state.sessiondata[i].BackPrice1,this.state.sessiondata[i].BackSize1)}
				
				><span className="odd backprice"> {this.state.sessiondata[i].BackPrice1}</span>{this.state.sessiondata[i].BackSize1}</button></td>
				 
				{/* onClick={this.handleBidClickSession.bind(this, '#72bbef',fancyNewData.headname,"yes",this.state.marketId,fancyNewData.SessInptYes,"",fancyNewData.market_id)}
					Onclick=""
				*/}
				



				<td className="fb_td" style={{ textAlign: "center" }}>  Min {fancyMinBetLimit} <br/> Max {fancyMaxBetLimit}    </td>
			</tr>
			new_array.push(new_array1);
			}else{
				
				 if(this.state.fancyInActiveList.includes(this.state.sessiondata[i].RunnerName)===true){
					continue;
				} 
				
				if((this.state.sessiondata[i].LayPrice1==0 || this.state.isSuspend===1) || (this.state.fancySuspendList.includes(this.state.sessiondata[i].RunnerName)===true)){
					fancy_suspend ="box-w1 lay-color fb_td suspended ";
				}
				if((this.state.sessiondata[i].BackPrice1==0 || this.state.isSuspend===1) || (this.state.fancySuspendList.includes(this.state.sessiondata[i].RunnerName)===true)){
					fancy_suspend1 ="box-w1 back-color fb_td suspended";
				}
				new_array1=<tr>
				<td className="fb_64">< a href="#"
				 > {this.state.sessiondata[i].RunnerName} 
				  &nbsp;	</a>
				 
				 </td>
				 <td  className={fancy_suspend}>
				<button value={i} onClick= 
				{this.handleBidClickSession.bind(this, '#faa9ba',this.state.sessiondata[i].RunnerName,"no",this.state.sessiondata[i].marketId,this.state.sessiondata[i].LayPrice1,"",this.state.sessiondata[i].market_id,this.state.sessiondata[i].LayPrice1,this.state.sessiondata[i].LaySize1,this.state.sessiondata[i].BackPrice1,this.state.sessiondata[i].BackSize1)}
				className="bet-sec lay"><span className="odd layprice"> {this.state.sessiondata[i].LayPrice1}</span>{this.state.sessiondata[i].LaySize1}</button></td>

				<td  className="box-w1 back-color fb_td">
				<button className="bet-sec back" value={i} 
				 onClick= 
				 {this.handleBidClickSession.bind(this, '#72bbef',this.state.sessiondata[i].RunnerName,"yes",this.state.sessiondata[i].marketId,this.state.sessiondata[i].BackPrice1,"",this.state.sessiondata[i].market_id,this.state.sessiondata[i].LayPrice1,this.state.sessiondata[i].LaySize1,this.state.sessiondata[i].BackPrice1,this.state.sessiondata[i].BackSize1)}
				
				><span className="odd backprice"> {this.state.sessiondata[i].BackPrice1}</span>{this.state.sessiondata[i].BackSize1}</button></td>
				 
				{/* onClick={this.handleBidClickSession.bind(this, '#72bbef',fancyNewData.headname,"yes",this.state.marketId,fancyNewData.SessInptYes,"",fancyNewData.market_id)}
					Onclick=""
				*/}
				



				<td className="fb_td" style={{ textAlign: "center" }}>   Min {fancyMinBetLimit} <br/> Max {fancyMaxBetLimit}    </td>
			</tr>
			new_array.push(new_array1);
			}
		}else{
			
			if(this.state.sessiondata[i].LayPrice1==0 || this.state.isSuspend===1){
					fancy_suspend ="box-w1 lay-color fb_td suspended ";
				}
				if(this.state.sessiondata[i].BackPrice1==0 || this.state.isSuspend===1){
					fancy_suspend1 ="box-w1 back-color fb_td suspended";
				}
				new_array1=<tr>
				<td className="fb_64">< a href="#"
				 > {this.state.sessiondata[i].RunnerName} 
				  &nbsp;	</a>
				 
				 </td>
				 <td  className={fancy_suspend}>
				<button value={i} onClick= 
				{this.handleBidClickSession.bind(this, '#faa9ba',this.state.sessiondata[i].RunnerName,"no",this.state.sessiondata[i].marketId,this.state.sessiondata[i].LayPrice1,"",this.state.sessiondata[i].market_id,this.state.sessiondata[i].LayPrice1,this.state.sessiondata[i].LaySize1,this.state.sessiondata[i].BackPrice1,this.state.sessiondata[i].BackSize1)}
				className="bet-sec lay"><span className="odd layprice"> {this.state.sessiondata[i].LayPrice1}</span>{this.state.sessiondata[i].LaySize1}</button></td>

				<td  className="box-w1 back-color fb_td">
				<button className="bet-sec back" value={i} 
				 onClick= 
				 {this.handleBidClickSession.bind(this, '#72bbef',this.state.sessiondata[i].RunnerName,"yes",this.state.sessiondata[i].marketId,this.state.sessiondata[i].BackPrice1,"",this.state.sessiondata[i].market_id,this.state.sessiondata[i].LayPrice1,this.state.sessiondata[i].LaySize1,this.state.sessiondata[i].BackPrice1,this.state.sessiondata[i].BackSize1)}
				
				><span className="odd backprice"> {this.state.sessiondata[i].BackPrice1}</span>{this.state.sessiondata[i].BackSize1}</button></td>
				 
				{/* onClick={this.handleBidClickSession.bind(this, '#72bbef',fancyNewData.headname,"yes",this.state.marketId,fancyNewData.SessInptYes,"",fancyNewData.market_id)}
					Onclick=""
				*/}
				



				<td className="fb_td" style={{ textAlign: "center" }}>   Min {fancyMinBetLimit} <br/> Max {fancyMaxBetLimit}     </td>
			</tr>
			new_array.push(new_array1);
		}
	}
}








		 ////////////console.logthis.state.bookmaker_b_back_6);
		var status=this.state.status;
		if(status!="OPEN"){
			 status=this.state.status;
		}else{
			status="";
		}
		
		var maximum_bet_limit='N/A';
		if(this.state.userData !==undefined && userMaxSportSetting>0){
			 maximum_bet_limit=	userMaxSportSetting;
			
		}
		else {
			var maximum_bet_limit_data=	this.state.maxminBet.adminlist;
			if(maximum_bet_limit_data!=undefined){
				maximum_bet_limit=maximum_bet_limit_data.maximum_bet_limit;
			}else{
				maximum_bet_limit ="N/A";
			}
		}
		
		var minimum_bet_limit='N/A';
		if(this.state.userData !==undefined && userMinSportSetting>0){
			 minimum_bet_limit=	userMinSportSetting;
		}
		else {
			var minimum_bet_limit_data=	this.state.maxminBet.adminlist;
			if(minimum_bet_limit_data!=undefined){
				minimum_bet_limit=minimum_bet_limit_data.minimum_bet_limit;
			}else{
				minimum_bet_limit ="N/A";
			}
		}
		
		
		
		
		var bookmaker_maximum_bet_limit='N/A';
		 if(this.state.userData !==undefined && userMaxSportSetting>0){
			 bookmaker_maximum_bet_limit =	userMaxSportSetting;
			
		}
		else {
			var minimum_bet_limit_data=	this.state.maxminBet.adminlist;
			
			if(minimum_bet_limit_data!=undefined && minimum_bet_limit_data.bookmaker_maximum_bet_limit!==undefined){
				bookmaker_maximum_bet_limit=minimum_bet_limit_data.bookmaker_maximum_bet_limit;
			}else{
				bookmaker_maximum_bet_limit ="N/A";
			}
		} 
		
		var bookmaker_minimum_bet_limit='N/A';
		 if(this.state.userData !==undefined && userMinSportSetting>0){
			 bookmaker_minimum_bet_limit=	userMinSportSetting;
		}
		else {
			var minimum_bet_limit_data=	this.state.maxminBet.adminlist;
			
			if(minimum_bet_limit_data!=undefined && minimum_bet_limit_data.bookmaker_minimum_bet_limit!==undefined){
				bookmaker_minimum_bet_limit=minimum_bet_limit_data.bookmaker_minimum_bet_limit;
				
			}else{
				bookmaker_minimum_bet_limit ="N/A";
			}
		} 
		
		
	
		var accessToken = this.state.accessToken;

		if (accessToken === "" || accessToken === null) {
			return (
				<Redirect to="/login" />
			);
		}
	var newdata11=this.state.getResult11;
	//////console.log)
	var amount_data2="";
	var amount_data1="";
	var amount_data3="";
	var amount_data4="";
	var stake="";
if(this.state.color_data_model!="" && this.state.color_data_model!=undefined){
	if(this.state.color_data_model.showdata!=undefined)
	{	
		
		if(this.state.color_data_model.showdata.yes!=undefined && this.state.color_data_model.showdata.yes!=''){
	
			amount_data3="-";
		}
		if(this.state.color_data_model.showdata.no!=undefined && this.state.color_data_model.showdata.no!=''){
			
			amount_data4="-";
		}
		stake=this.state.color_data_model.showdata.stake;
	}
	
	
	
	//////console.logthis.state.color_data_model.showdata.yes_amount);
}
var new_fancy_arr=[];
var stake =0;
var htmllay112="";
var htmllay113="";

if(this.state.no_data_model!=undefined){
	if(this.state.no_data_model.data!=undefined){
		if(this.state.no_data_model.data.showdata!=undefined)
	{
		
		
		for(var index=0;index<this.state.no_data_model.data.showdata.length;index++){
			var layprice="0";
			var backprice="0";
			var layprice1="0";
			var layprice2="0";
			var backprice1="0";
			var backprice3="0";
			var backprice2="0";
			var layprice3="0";
			
			//stake+=parseFloat(this.state.no_data_model.data.showdata[index].stake)
			if(this.state.no_data_model.data.showdata[index].lay_price!=undefined){
				if(this.state.no_data_model.data.showdata[index].no=="no"){
				var layprice=parseFloat(this.state.no_data_model.data.showdata[index].lay_price) -parseFloat(1)
				var layprice3=parseFloat(this.state.no_data_model.data.showdata[index].lay_price);

				var layprice1=parseFloat(this.state.no_data_model.data.showdata[index].stake)
				var layprice2="-"+layprice1;

					var htmllay112=<tr className="bet-info ">
					<td id="blockin3" className="box-w1 lay-color" ><button className="bet-sec lay "> <span className="odd layprice">{layprice}</span>  </button></td>
					<td id="blockin3" className="box-w1 lay-color" ><button className="bet-sec lay "> <span className="odd layprice">{layprice1}</span>  </button></td>
					</tr>
				  

new_fancy_arr.push(htmllay112);



var htmllay113=<tr className="bet-info ">
					<td id="blockin3" className="box-w1 back-color" ><button className="bet-sec back "> <span className="odd backprice">{layprice3}</span>  </button></td>
					<td id="blockin3" className="box-w1 back-color"><button className="bet-sec back "> <span className="odd backprice">{layprice2}</span>  </button></td>
	
					
	
				  </tr>
				new_fancy_arr.push(htmllay113);
			}
			
			if(this.state.no_data_model.data.showdata[index].no=="yes"){
				if(this.state.no_data_model.data.showdata[index].back_price!=undefined){
					var backprice=parseFloat(this.state.no_data_model.data.showdata[index].back_price);
					var backprice1=parseFloat(this.state.no_data_model.data.showdata[index].back_price)-parseFloat(1);
					var backprice2="-"+this.state.no_data_model.data.showdata[index].stake;
					var backprice3=parseFloat(this.state.no_data_model.data.showdata[index].stake) *parseFloat(this.state.no_data_model.data.showdata[index].back_size)/ parseFloat(100)}

					var htmllay112=
						<tr className="bet-info ">
					<td id="blockin3" className="box-w1 back-color" style={{background: 'rgb(114, 187, 239)', transition: 'all 1s ease 0s'}}><button className="bet-sec back "> <span className="odd backprice">{backprice}</span>  </button></td>
					<td id="blockin3" className="box-w1 back-color" style={{background: 'rgb(114, 187, 239)', transition: 'all 1s ease 0s'}}><button className="bet-sec back "> <span className="odd backprice">{backprice3}</span>  </button></td>
	
					
	
				  </tr>
						






new_fancy_arr.push(htmllay112);

var htmllay113=<tr className="bet-info ">
					<td id="blockin3" className="box-w1 lay-color" ><button className="bet-sec lay "> <span className="odd layprice">{backprice1}</span>  </button></td>
					<td id="blockin3" className="box-w1 lay-color" ><button className="bet-sec lay "> <span className="odd layprice">{backprice2}</span>  </button></td>
					</tr>
				 

				 new_fancy_arr.push(htmllay113);


				}
			}
			
			
		
		}
	
	}
	}
	
	
}







//////console.logamount_data3);
	
	// no_data_model:no,yes_data_model:yes,color_data_model:resp.data.color,showUserAmountPopup:true



		var userMaxSportSetting = (this.state.userData !==undefined && this.props.match.params.id1==="cricket") ?   this.state.userData.cricket_max_bet : ((this.state.userData !==undefined && this.props.match.params.id1==="soccer") ?   this.state.userData.football_max_bet : ((this.state.userData !==undefined && this.props.match.params.id1==="tennis") ?   this.state.userData.tennis_max_bet : undefined) );
		var bookmakerMaxBetLimit = (userMaxSportSetting!=undefined && userMaxSportSetting>0) ? userMaxSportSetting : ((this.state.max_bookmaker_limit==="N/A") ? bookmaker_maximum_bet_limit : this.state.max_bookmaker_limit);
		
		var userMinSportSetting = (this.state.userData !==undefined && this.props.match.params.id1==="cricket") ?   this.state.userData.cricket_min_bet : ((this.state.userData !==undefined && this.props.match.params.id1==="soccer") ?   this.state.userData.football_min_bet : ((this.state.userData !==undefined && this.props.match.params.id1==="tennis") ?   this.state.userData.tennis_min_bet : undefined) );
		var bookmakerMinBetLimit = (userMinSportSetting!=undefined && userMinSportSetting>0) ? userMinSportSetting : ((this.state.min_bookmaker_limit==="N/A") ? bookmaker_minimum_bet_limit : this.state.min_bookmaker_limit);

if(this.state.teamOneLastBack!=undefined){
	
		var team_profit1 = (this.state.team_profit1===undefined || this.state.team_profit1==="") ? this.state.team_profit1 : parseFloat(this.state.team_profit1);
		var team_profit2 = (this.state.team_profit2===undefined || this.state.team_profit2==="") ? this.state.team_profit2 : parseFloat(this.state.team_profit2);
		return (
			
			<div>
			<Nav />
				<Menu />
				<div className="blockUI blockMsg blockPage" style={{display:"none"}} ><div className="loading-hold" id="overlay"> <div className="loaderGif"> </div> </div></div>
				<div id="wrapper">
					<Sidebar />
				
					<div id="content-wrapper">
						<div className="container-fluid">
							<div className="row">
								<div className="col-md-9 featured-box-detail">
								 <img className="img-fluid" src="/img/timg.jpg" /> 
									<div className="coupon-card"> 
									<div className="game-heading mb-1"> <span className="card-header-title">{this.state.firstTeamName} v {this.state.secondTeamName}</span>
									<span className="card-header-title" style={{float:'right'}}>{this.state.Newdate111}</span> 
										 </div> 
										<div className="game-heading"> <span className="card-header-title">MATCH ODDS <a href="#" className=" m-r-5 game-rules-icon blinking" data-id="match"><span><i className="fa fa-info-circle float-right"></i></span></a></span> <span className="float-right m-r-10">Max : <span id="maxbetlmt">{maximum_bet_limit}</span></span>
										<span className="float-right m-r-10">Min : <span id="maxbetlmt">{minimum_bet_limit}</span></span>
										 </div>
										<div className="card-content ">
											<div className="table-responsive mb-1 main-market market-bf" data-marketid="1.167146463">
												<table className="table coupon-table table table-striped table-bordered m-t-10 mb-0" >
													<thead>
														<tr>
															<th>Total Match: {this.state.twoteamtotalmatch}</th>
															<th className="box-w1 re_none">&nbsp;</th>
															<th className="box-w1 re_none">&nbsp;</th>
															<th className="back box-w1">Back</th>
															<th className="lay box-w1">Lay</th>
															<th className="box-w1 re_none">&nbsp;</th>
															<th className="box-w1 re_none">&nbsp;</th>
														</tr>
													</thead>
													<tbody id="dyn_bind">
														<tr className="bet-info ">
															<td className="team-name nation" >
																<span ><strong>{this.state.firstTeamName}</strong></span>
																<p className="box-w4"><span className="float-right book" id="book_349" style={{ color: "black" }}>{team_profit1}
																 {this.state.stackAmount_team1}</span> <span className="float-right profit" id="profit_349" style={{ color: "black" }} ></span>
																 </p>
																 
																 
																 <p className="box-w4"><span className="float-left book"  style={{ color: "black" }}>{parseFloat(this.state.profit12)}
																</span> <span className="float-left  profit" style={{ color: "black" }} ></span></p>




															</td>
															
															<td className="box-w1 back-color  re_none" id="blockin1"style={{backgroundColor:'#B2D6F0'}}>
																{blockOddsHtml}
															{status}
																
																<button className="bet-sec back "  onClick={this.handleBidClick.bind(this,this.state.firstTeamName,this.state.teamOneLastBack,'#B2D6F0',"back",this.state.teamOneSelectionId,this.state.marketId,'teamone',this.state.status,"odds","betunmatch")}  > <span className="odd backprice">{this.state.teamOneLastBack}</span>{this.state.teamOneLastBackSize} {(this.state.teamOneLastBackSize >0) ? " K" : "" }  </button>
															</td>
															<td 
															id="blockin2"
															className="box-w1 back-color re_none" style={{backgroundColor:'#92C9F0'}}>{status}
																<button className="bet-sec back " onClick={this.handleBidClick.bind(this,this.state.firstTeamName,this.state.teamOneMiddleBack,'#92C9F0',"back",this.state.teamOneSelectionId,this.state.marketId,'teamone',this.state.status,"odds","betunmatch")} > <span className="odd backprice">{this.state.teamOneMiddleBack}</span> {this.state.teamOneMiddleBackSize}{(this.state.teamOneMiddleBackSize >0) ? " K" : "" } </button>
															</td>
															
															<td id="blockin3"
															 className="box-w1 back-color">{status}
																<button className="bet-sec back " onClick={this.handleBidClick.bind(this,this.state.firstTeamName,this.state.teamOneFirstBack,'#92C9F0',"back",this.state.teamOneSelectionId,this.state.marketId,'teamone',this.state.status,"odds","betmatch")} > <span className="odd backprice">{this.state.teamOneFirstBack}</span> {this.state.teamOneFirstBackSize}{(this.state.teamOneFirstBackSize >0) ? " K" : "" }  </button>
															</td>
															
															
															
															<td 
															id="blockin4"
															className="box-w1 lay-color">{status}
																<button className="bet-sec lay" value={this.state.lastPriceTraded1} onClick={this.handleBidClick.bind(this,this.state.firstTeamName,this.state.teamOneFirstLay,'#faa9ba',"lay",this.state.teamOneSelectionId,this.state.marketId,'teamone',this.state.status,"odds","betmatch")}><span className="odd layprice">{this.state.teamOneFirstLay}</span>{this.state.teamOneFirstLaySize}{(this.state.teamOneFirstLaySize >0) ? " K" : "" } </button>
															</td>
															<td
															id="blockin5"
															className="box-w1 lay-color re_none" style={{backgroundColor:'#F8BBC8'}}>{status}
																<button className="bet-sec lay" value={this.state.lastPriceTraded1} onClick={this.handleBidClick.bind(this,this.state.firstTeamName,this.state.teamOneMiddleLay,'#F8BBC8',"lay",this.state.teamOneSelectionId,this.state.marketId,'teamone',this.state.status,"odds","betunmatch")}><span className="odd layprice">{this.state.teamOneMiddleLay}</span>{this.state.teamOneMiddleLaySize}{(this.state.teamOneMiddleLaySize >0) ? " K" : "" }</button>
															</td>
															<td 
															id="blockin6"
															className="box-w1 lay-color re_none" style={{backgroundColor:'#F6CDD6'}}>{status}
																<button className="bet-sec lay" value={this.state.lastPriceTraded1} onClick={this.handleBidClick.bind(this,this.state.firstTeamName,this.state.teamOneLastLay,'#F6CDD6',"lay",this.state.teamOneSelectionId,this.state.marketId,'teamone',this.state.status,"odds","betunmatch")}><span className="odd layprice">{this.state.teamOneLastLay}</span>{this.state.teamOneLastLaySize}{(this.state.teamOneLastLaySize >0) ? " K" : "" }</button>
															</td>															
															
														</tr>
														<tr
														
														className="bet-info ">
															<td className="team-name nation" id="10301">
																<span><strong>{this.state.secondTeamName}</strong></span>
																<p className="box-w4"><span className="float-right book" id="book_10301" style={{ color: "black" }}>{team_profit2} {this.state.stackAmount_team2}</span> <span className="float-right profit" id="profit_10301" style={{ color: "black" }}></span></p>
																<p className="box-w4"><span className="float-left book"  style={{ color: "black" }}>{parseFloat(this.state.profit13)}
																</span> <span className="float-left  profit" style={{ color: "black" }} ></span></p>
															</td>
															<td
																 id="blockin7"
															className="box-w1 back-color re_none" style={{backgroundColor:'#B2D6F0'}}>{blockOddsHtml}{status}
																<button className="bet-sec back " onClick={this.handleBidClick.bind(this,this.state.secondTeamName,this.state.teamTwoLastBack,'#B2D6F0',"back",this.state.teamTwoSelectionId,this.state.marketId,'teamtwo',this.state.status,"odds","betunmatch")} > <span className="odd backprice" >{this.state.teamTwoLastBack}</span>{this.state.teamTwoLastBackSize}{(this.state.teamTwoLastBackSize >0) ? " K" : "" }</button>
															</td>
															<td
															id="blockin8"
															className="box-w1 back-color re_none" style={{backgroundColor:'#92C9F0'}}>{status}
																<button className="bet-sec back "  onClick={this.handleBidClick.bind(this,this.state.secondTeamName,this.state.teamTwoMiddleBack,'#92C9F0',"back",this.state.teamTwoSelectionId,this.state.marketId,'teamtwo',this.state.status,"odds","betunmatch")}> <span className="odd backprice" >{this.state.teamTwoMiddleBack}</span>{this.state.teamTwoMiddleBackSize}{(this.state.teamTwoMiddleBackSize >0) ? " K" : "" }  </button>
															</td>
															
															<td 
															id="blockin9"
															className="box-w1 back-color">{status}
																<button className="bet-sec back "  onClick={this.handleBidClick.bind(this,this.state.secondTeamName,this.state.teamTwoFirstBack,'#72bbef',"back",this.state.teamTwoSelectionId,this.state.marketId,'teamtwo',this.state.status,"odds","betmatch")}> <span className="odd backprice" >{this.state.teamTwoFirstBack}</span>{this.state.teamTwoFirstBackSize} {(this.state.teamTwoFirstBackSize >0) ? " K" : "" } </button>
															</td>
															
															
															
															<td 
															id="blockin10"
															className="box-w1 lay-color">{status}
																<button className="bet-sec lay" value={this.state.lastPriceTraded1} onClick={this.handleBidClick.bind(this,this.state.secondTeamName,this.state.teamTwoFirstLay,'#FAA9BA',"lay",this.state.teamTwoSelectionId,this.state.marketId,'teamtwo',this.state.status,"odds","betmatch")}><span className="odd layprice">{this.state.teamTwoFirstLay}</span>{this.state.teamTwoFirstLaySize}{(this.state.teamTwoFirstLaySize >0) ? " K" : "" }</button>
															</td>
															<td 
															id="blockin11"
															className="box-w1 lay-color re_none" style={{backgroundColor:'#F8BBC8'}}>{status}
																<button className="bet-sec lay" value={this.state.lastPriceTraded1} onClick={this.handleBidClick.bind(this,this.state.secondTeamName,this.state.teamTwoMiddleLay,'#F8BBC8',"lay",this.state.teamTwoSelectionId,this.state.marketId,'teamtwo',this.state.status,"odds","betunmatch")}><span className="odd layprice">{this.state.teamTwoMiddleLay}</span>{this.state.teamTwoMiddleLaySize}{(this.state.teamTwoMiddleLaySize >0) ? " K" : "" }</button>
															</td>
															<td 
															id="blockin12"
															className="box-w1 lay-color re_none" style={{backgroundColor:'#F6CDD6'}}>{status}
																<button className="bet-sec lay" value={this.state.lastPriceTraded1} onClick={this.handleBidClick.bind(this,this.state.secondTeamName,this.state.teamTwoLastLay,'#F6CDD6',"lay",this.state.teamTwoSelectionId,this.state.marketId,'teamtwo',this.state.status,"odds","betunmatch")}><span className="odd layprice">{this.state.teamTwoLastLay}</span>{this.state.teamTwoLastLaySize}{(this.state.teamTwoLastLaySize >0) ? " K" : "" }</button>
															</td>	
														</tr>
														{this.showDrawHtml()}
													</tbody>
												</table>
											</div>
											<div className="">

<div className="row row-12 ssw_66">
	<div className="col-md-12" id="fancyHeadToHide" >
		<div class="game-heading"> <span class="card-header-title">Bookmaker Market <a href="#" class=" m-r-5 game-rules-icon blinking" data-id="match"><span><i class="fa fa-info-circle float-right"></i></span></a></span><span class="float-right m-r-10">Max :  <span id="maxbetlmt">{bookmakerMaxBetLimit}</span></span><span class="float-right m-r-10">Min :<span id="maxbetlmt">{bookmakerMinBetLimit}</span></span></div>
		<div id="div_fancy">
		<div className="card-content">
											<div className="table-responsives  mb-1 main-market market-bf" data-marketid="1.167146463">
												<div className="table new_table  coupon-table table table-striped table-bordered mb-0 " >
												{this.showBookMarketAllHtml()}
												{this.showBookmakerAdmindataHtml()}
                                              	
												</div>
											</div>
											</div>
											<div className="">

												<div className="row row-12 ball_running">
													<div className="col-md-12" id="fancyHeadToHide" >
														<div className="fancy-marker-title">
															<h4>Fancy Bet <a href="#" className=" m-r-5 game-rules-icon blinking" data-id="fancy"><span><i className="fa fa-info-circle float-right"></i></span></a></h4>
														</div>
														<div id="div_fancy">
															<table className="table coupon-table table table-striped table-bordered m-t-10 ">

															{new_array}
															</table>
														</div>
													</div>
													<div className="col-md-6 fancy-market">

													</div>
												</div>
												</div>
										
											
		</div>
	</div>
	<div className="col-md-6 fancy-market">

	</div>
</div>
											
											
											

</div>

										
											
											
										
										</div>
									</div>
								</div>
								<div className="col-md-3 sidebar-right">
									<div className="card-header" data-toggle="collapse" data-target="#demo" onClick={this.handleLiveTvClick}>
										<h6 className="card-title">Live Match <span className="float-right"><i className="fa fa-tv"></i> live stream started</span> </h6>
									</div>
									<div id="demo" className="collapse hide ">
										<ul className="nav nav-tabs video_nav_tab">
										   <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#video1">Channel 1</a></li>
										   <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#video2">Channel 2</a></li>
										   <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#video3">Channel 3</a></li>
										   <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#video4">Channel 4</a></li>
										</ul>
										<div className="tab-content">
											<div id="video1" className=" tab-pane active">
											 <iframe className="tab_video" src="https://livetvline.com:8888/embed_player?urlServer=wss://livetvline.com:8443&amp;streamName=ch_125261&amp;mediaProviders=WebRTC,Flash,MSE,WSPlayer"></iframe>
											</div>
											<div id="video2" className=" tab-pane fade">
											 <iframe className="tab_video" src="https://livetvline.com:8888/embed_player?urlServer=wss://livetvline.com:8443&streamName=ch_225262&mediaProviders=WebRTC,Flash,MSE,WSPlayer"></iframe>
											</div>
											<div id="video3" className=" tab-pane fade">
											 <iframe className="tab_video" src="https://livetvline.com:8888/embed_player?urlServer=wss://livetvline.com:8443&streamName=ch_325263&mediaProviders=WebRTC,Flash,MSE,WSPlayer"></iframe>
											</div>
											<div id="video4" className=" tab-pane fade">
											 <iframe className="tab_video" src="https://livetvline.com:8888/embed_player?urlServer=wss://livetvline.com:8443&streamName=ch_425264&mediaProviders=WebRTC,Flash,MSE,WSPlayer"></iframe>
											</div>
										</div>
									</div>
									
									<div className="card m-b-10 place-bet m-t-10">
										<div className="card-header">
											<h6 className="card-title d-inline-block">Place Bet</h6>
											<a className="btn btn-secondary float-right change-value" id="cng_btn_val" href="/changebuttonvalue">Change Button Value</a>
										</div>
									
													
										{this.showBidClickHtml()}
										{this.showBidClickSessionHtml()}		
												
									</div>
									<div className="card m-b-10 place-bet">
										<div className="card-header">
											<h6 className="card-title d-inline-block">My Bet</h6>
											
										</div>
										<div className="table-responsive hide-box-click " style={{ paddingBottom: "4px", display: "block" }} >

											{this.showTableHtml()}
										</div>
									</div>
									<form onSubmit={this.handleFancybetSubmit} method="post" id="frm_placebet"> 
									<table className="table table-borderedless place-bet">
										
										<tbody>
											{this.getFancybet()}
											{this.getFancybetPoint()}
											<br></br>
											{this.getFancySecondbet()}
											{this.getSecondFancybetPoint()} 
										</tbody>
									</table>
									{/* <div className="col-md-12">
										<button className="btn btn-sm btn-danger float-left" type="button" onClick={this.cancelCourse}>Reset</button>
										<button className="btn btn-sm btn-success float-right" type="submit" id="submit_btn">Submit</button>
										<input id="Odds1" type="hidden" value={this.state.lastPriceTraded1} onChange={this.handleChange} />
										<input id="Odds2" type="hidden" value={this.state.lastPriceTraded2} onChange={this.handleChange} />
										<input id="team_id1" type="hidden" value={this.state.teamid1} onChange={this.handleChange} />
									</div> */}
									</form>
								</div>
							</div>
						</div>
					</div>
					<Modal show={this.state.showUserAmountPopup} >
		
			<Modal.Header >
				<Modal.Title>Run Position</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			
			 <table className="table coupon-table table table-striped table-bordered m-t-10 mb-0">
			<thead>
			  <tr>
				<th className=" box-w1">Run</th>
				<th className=" box-w1">Amount</th>
			  </tr>
			</thead>
			<tbody id="dyn_bind">
			  
			 	{new_fancy_arr}
			</tbody>
		  </table>
			
			</Modal.Body>
			<Modal.Footer >
				<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleDepoWithdrPopupClose}><i className="fas fa-undo-alt"></i> Close</button>
			</Modal.Footer>
	
      </Modal>
				
				</div>
			</div>
		);

		}
		
		


else{


	return (
			
		<div>
		
			<Nav />
			<Menu />
			<div id="wrapper">
				<Sidebar />
				<div id="content-wrapper">
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-9 featured-box-detail">
								<div className="coupon-card"> 
									<div class="game-heading"> <span class="card-header-title">Bookmaker Market <a href="#" class=" m-r-5 game-rules-icon blinking" data-id="match"><span><i class="fa fa-info-circle float-right"></i></span></a></span><span class="float-right m-r-10">Max :  <span id="maxbetlmt">{bookmakerMaxBetLimit}</span></span><span class="float-right m-r-10">Min :<span id="maxbetlmt">{bookmakerMinBetLimit}</span></span></div>
									<div className="card-content">
										<div className="table-responsive m-b-10 main-market market-bf" data-marketid="1.167146463">
											<table className="table coupon-table table table-striped table-bordered m-t-10 " >
												<thead>
													<tr>
														<th>Total Match: {this.state.twoteamtotalmatch}</th>
														<th className="box-w1">&nbsp;</th>
														<th className="box-w1">&nbsp;</th>
														<th className="back box-w1">Back</th>
														<th className="lay box-w1">Lay</th>
														<th className="box-w1">&nbsp;</th>
														<th className="box-w1">&nbsp;</th>
													</tr>
												</thead>
												</table>
										</div>
										
										<div className="">
											<div className="row row-12">
												<div className="col-md-12" id="fancyHeadToHide" >
													<div className="fancy-marker-title">
														<h4>Bookmaker Market <a href="#" className=" m-r-5 game-rules-icon blinking" data-id="fancy"><span><i className="fa fa-info-circle float-right"></i></span></a></h4>
													</div>
													
												</div>
												<div className="col-md-6 fancy-market">

												</div>
											</div>
											
											<div className="row row-12 ">
												<div className="col-md-12" id="fancyHeadToHide" >
													<div className="fancy-marker-title">
														<h4>Fancy Bet <a href="#" className=" m-r-5 game-rules-icon blinking" data-id="fancy"><span><i className="fa fa-info-circle float-right"></i></span></a></h4>
													</div>
													<div id="div_fancy">
													{new_array}
													</div>
												</div>
												<div className="col-md-6 fancy-market">

												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-3 sidebar-right">
								<div className="card-header m-b-10" data-toggle="collapse" data-target="#demo" onClick={this.handleLiveTvClick}>
									<h6 className="card-title">Live Match <span className="float-right"><i className="fa fa-tv"></i> live stream started</span> </h6>
								</div>
								<div id="demo" className="collapse hide m-b-10">
								{this.showVideo()}
								</div>
								<div className="card m-b-10 place-bet ">
									<div className="card-header">
										<h6 className="card-title d-inline-block">Place Bet</h6>
										<a className="btn btn-secondary float-right change-value" id="cng_btn_val" href="#">Change Button Value</a>
									</div>
								
												
									{this.showBidClickHtml()}
									{this.showBidClickSessionHtml()}				
											
								</div>
								<div className="card m-b-10 place-bet">
									<div className="card-header">
										<h6 className="card-title d-inline-block">My Bet</h6>
										<a className="btn btn-danger float-right change-value" id="cng_btn_val" href="#">ClearAll</a>
									</div>
									<div className="table-responsive hide-box-click " style={{ paddingBottom: "4px", display: "block" }} >

										{this.showTableHtml()}
									</div>
								</div>
								<form onSubmit={this.handleFancybetSubmit} method="post" id="frm_placebet"> 
								<table className="table table-borderedless place-bet">
									<thead>
										<tr>
											<th></th>
											<th style={{ width: "35%", textAlign: "left" }} >(Bet for)</th>
											<th style={{ width: "35%", textAlign: "left" }} >Odds</th>
											<th style={{ width: "35%", textAlign: "left" }} >Stake</th> 
										</tr>
									</thead>
									<tbody>
										{this.getFancybet()}
										{this.getFancybetPoint()}
										<br></br>
										{this.getFancySecondbet()}
										{this.getSecondFancybetPoint()} 
									</tbody>
								</table>
								<div className="col-md-12">
									<button className="btn btn-sm btn-danger float-left" type="button" onClick={this.cancelCourse}>Reset</button>
									<button className="btn btn-sm btn-success float-right" type="submit" id="submit_btn">Submit</button>
									<input id="Odds1" type="hidden" value={this.state.lastPriceTraded1} onChange={this.handleChange} />
									<input id="Odds2" type="hidden" value={this.state.lastPriceTraded2} onChange={this.handleChange} />
									<input id="team_id1" type="hidden" value={this.state.teamid1} onChange={this.handleChange} />
								</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				
	  
	 






			</div><Footer/>
		</div>
	);
}
	}
}

export default Index;
