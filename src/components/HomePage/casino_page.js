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
var CryptoJS = require("crypto-js");

const $ = window.$;
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
			randomElement:""
		};
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
			this.setState({maxminBet:resp})
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
		
		
			
		let savebet = {
			event_name: "casino",
			odds: this.state.oddVal,
			stake: this.state.stake_amount,
			event_id: this.state.mid,
			event_type :"casino",
			type:"match"

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
					stackAmount_team2:""
				});
				setTimeout(() => {this.setState({ respStatus: "" });}, 2000);
			} else {
				this.setState({
					respStatus: resp.success,
					respMessage:resp.message
				});
				setTimeout(() => {this.setState({ respStatus: "" });}, 2000);
			}
		
		});

		

	}
	handleSubmitSession = (event) => {
	
		event.preventDefault();
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		
		let matchid = this.props.match.params.id;
		var yes_amount="";
		var no_amount ="";
		
		if(this.state.no==="no"){
				no_amount=this.state.session_input;
		}
		if(this.state.yes==="yes"){
				yes_amount=this.state.session_input;
		}
		let savebet = {
			event_id: this.props.match.params.id,
			event_name: this.state.eventName,
			yes: this.state.yes,
			no: this.state.no,
			market_id: this.state.betMarketId,
			yes_amount:yes_amount,
			no_amount: no_amount,
			stake:this.state.stake_amount,
			headname:this.state.headname
			
			
		}; 
		

		axios.post(baseUrl + '/createbetusersession', savebet,{headers}).then((resp) => {
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
					stackAmount_team2:""
				});
				this.getUserCurrentBalance();
				this.showTableHtml();
				setTimeout(() => {this.setState({ respStatus: "" });}, 7000);
			} else {
				this.setState({
					respStatus: resp.success,
					respMessage:resp.message
				});
				setTimeout(() => {this.setState({ respStatus: "" });}, 7000);
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

		};
		axios.post(baseUrl + '/createbetuser', savebet).then((resp) => {
			if (resp.data.success != false) {
				this.setState({
					respStatus: resp.success,
				});
				window.location.href = "/matchdetail/" + resp.data.result.matchids;
			} else {
				this.setState({
					respMessage: resp.data.message,
				});
			}
		});

	}


	componentWillMount() {
		
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		

		this.callMatchOddsApi();
		 let counter = setInterval(this.callMatchOddsApi , 4000);

	// var new_array=[ 
	// 	'https://www.youtube.com/embed/qMHZY1QHZJc',
	// 	'https://www.youtube.com/embed/2Tdw3n4zM6E',
	// 	'https://www.youtube.com/embed/DTQl47Jlzcs',
	// 	'https://www.youtube.com/embed/aW9h02nSa4E',
	// 	'https://www.youtube.com/embed/lO7VNUcSg8Q',
	// ]

	// var randomIndex = Math.floor(Math.random() * new_array.length); 
		var randomElement ="https://criclineinfo.in/poker.html?v=1.65";
		this.setState({randomElement:randomElement})
		//let counterFancy = setInterval(this.callFancyListApi , 2000);

	}
	
	



	
	
	
	callMatchOddsApi=()=>{
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		let matchid = this.props.match.params.id;
		

		
		axios.get(baseUrl + '/casino', {headers}).then((resp) => {
			var resp = resp.data;
			var resp2 = resp.data1;
			var buttonvalue_new = resp.buttonvalue;
			this.setState({loading:false,})
			  
			  var getResult1 = resp.alldata
			  this.setState({getResult11:resp})
			  
			
			const new_array = {};
			if (resp.success === true) {
				var getResult1 = resp.alldata.t2
				let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		
		 let matchid = this.props.match.params.id;
		// this.callMatchOddsApi()
		axios.get(baseUrl + '/userbetlist/'+getResult1[37].mid, { headers }).then((resp) => {
			var resps = resp.data;
			var profit12=0;
			var profit13=0;
			if (resps.success === true) {
				
				this.setState({ getResults: resps.Betlist, betDataFound: true });
			}
		})
				
				
				
				new_array['nat_Dragon']=getResult1[0].nat;
				new_array['nat_Tiger']=getResult1[1].nat;
				new_array['nat_Tie']=getResult1[2].nat;
				new_array['nat_Pair']=getResult1[3].nat;


				new_array['nat_Dragon_rate']=getResult1[0].rate;
				new_array['nat_Tiger_rate']=getResult1[1].rate;
				new_array['nat_Tie_rate']=getResult1[2].rate;
				new_array['nat_Pair_rate']=getResult1[3].rate;


				new_array['nat_Dragon_min_value']=getResult1[0].min;
				new_array['nat_Dragon_max_value']=getResult1[0].max;

				
				new_array['nat_Tiger_min_value']=getResult1[1].min;
				new_array['nat_Tiger_max_value']=getResult1[1].max;
				
				new_array['nat_Tie_min_value']=getResult1[2].min;
				new_array['nat_Tie_max_value']=getResult1[2].max;
				
				
				new_array['nat_Pair_min_value']=getResult1[3].min;
				new_array['nat_Pair_max_value']=getResult1[3].max;

				new_array['nat_Dragon_even']=getResult1[4].nat;
				new_array['nat_Dragon_even_min_value']=getResult1[4].min;
				new_array['nat_Dragon_even_max_value']=getResult1[4].max;
				new_array['nat_Dragon_even_rate']=getResult1[4].rate;

				new_array['nat_Dragon_odd']=getResult1[5].nat;
				new_array['nat_Dragon_oddn_min_value']=getResult1[5].min;
				new_array['nat_Dragon_odd_max_value']=getResult1[5].max;
				new_array['nat_Dragon_odd_rate']=getResult1[5].rate;

				new_array['nat_Dragon_red']=getResult1[6].nat;
				new_array['nat_Dragon_red_rate']=getResult1[6].rate;
				new_array['nat_Dragon_red_min']=getResult1[6].min;
				new_array['nat_Dragon_red_max']=getResult1[6].max;

				new_array['nat_Dragon_black']=getResult1[7].nat;
				new_array['nat_Dragon_black_rate']=getResult1[7].rate;
				new_array['nat_Dragon_black_min']=getResult1[7].min;
				new_array['nat_Dragon_black_max']=getResult1[7].max;

				new_array['nat_Dragon_card_1']=getResult1[8].nat;
				new_array['nat_Dragon_card_rate']=getResult1[8].rate;
				new_array['nat_Dragon_card_min']=getResult1[8].min;
				new_array['nat_Dragon_card_max']=getResult1[8].max;	

				new_array['nat_Dragon_card_2']=getResult1[9].nat;
				new_array['nat_Dragon_card_3']=getResult1[10].nat;

				new_array['nat_Dragon_card_4']=getResult1[11].nat;
				new_array['nat_Dragon_card_5']=getResult1[12].nat;
				new_array['nat_Dragon_card_6']=getResult1[13].nat;

				new_array['nat_Dragon_card_7']=getResult1[14].nat;
				new_array['nat_Dragon_card_8']=getResult1[15].nat;
				new_array['nat_Dragon_card_9']=getResult1[16].nat;
				new_array['nat_Dragon_card_10']=getResult1[17].nat;
				
				
				new_array['nat_Dragon_card_j']=getResult1[18].nat;
				new_array['nat_Dragon_card_q']=getResult1[19].nat;
				new_array['nat_Dragon_card_k']=getResult1[20].nat;


				new_array['nat_Tiger_even']=getResult1[21].nat;
				new_array['nat_Tiger_even_rate']=getResult1[21].rate;
				new_array['nat_Tiger_even_min']=getResult1[21].min;
				new_array['nat_Tiger_even_max']=getResult1[21].max;
				
				new_array['nat_Tiger_odd']=getResult1[22].nat;
				new_array['nat_Tiger_odd_rate']=getResult1[22].rate;

				new_array['nat_Tiger_red']=getResult1[23].nat;
				new_array['nat_Tiger_red_rate']=getResult1[23].rate;
				new_array['nat_Tiger_red_min']=getResult1[23].min;
				new_array['nat_Tiger_red_max']=getResult1[23].max;


				new_array['nat_Tiger_black']=getResult1[24].nat;

				new_array['nat_Tiger_card_1']=getResult1[25].nat;
				new_array['nat_Tiger_card_rate']=getResult1[25].rate;
				new_array['nat_Tiger_card_min']=getResult1[25].min;
				new_array['nat_Tiger_card_max']=getResult1[25].max;	

				new_array['nat_Tiger_card_2']=getResult1[26].nat;
				new_array['nat_Tiger_card_3']=getResult1[27].nat;
				new_array['nat_Tiger_card_4']=getResult1[28].nat;
				new_array['nat_Tiger_card_5']=getResult1[29].nat;
				new_array['nat_Tiger_card_6']=getResult1[30].nat;

				new_array['nat_Tiger_card_7']=getResult1[31].nat;
				new_array['nat_Tiger_card_8']=getResult1[32].nat;
				new_array['nat_Tiger_card_9']=getResult1[33].nat;
				new_array['nat_Tiger_card_10']=getResult1[34].nat;
				
				
				new_array['nat_Tiger_card_j']=getResult1[35].nat;
				new_array['nat_Tiger_card_q']=getResult1[36].nat;
				new_array['nat_Tiger_card_k']=getResult1[37].nat;
				
				new_array['mid']=getResult1[37].mid;



			this.setState(new_array);
			}else{
				this.setState({loading:false})
			}
			this.setState({buttonvalue_new:buttonvalue_new});
			var teamOneSelectionId=this.state.teamOneSelectionId;
			var teamTwoSelectionId=this.state.teamTwoSelectionId;
			var profit12=0;
			var profit13 =0;
			
			if(this.state.getResults!=undefined){
				for(let i=0;i<this.state.getResults.length;i++){
				
					if(this.state.getResults[i].selection_id === teamOneSelectionId){
						profit12= profit12+this.state.getResults[i].profit;
						if(this.state.getResults[i].loss!=undefined){
							profit13=parseFloat(profit13)-parseFloat(this.state.getResults[i].loss)
						}
					}
					else if(this.state.getResults[i].selection_id === teamTwoSelectionId){
						profit13= profit13+this.state.getResults[i].profit;
						if(this.state.getResults[i].loss!=undefined){
							profit12=parseFloat(profit12)-parseFloat(this.state.getResults[i].loss)
						}
					}
					
					
					
					
					 
					 
				}
			}
			
			
this.setState({profit12:profit12,profit13:profit13})	
		});





			
		axios.get(baseUrl + '/casino-result-dt20', {headers}).then((resp) => {
			var respData = resp.data.alldata;
		
			this.setState({casinodt20:respData})
		});
					
			





	}
	showDrawHtml =()=>{
		
		if(this.state.draw===true){
			var status=this.state.status;
			if(status!="OPEN"){
				var status=this.state.status;
			}else{
				var status="";

			}

			return (
				<tr className="bet-info ">
					<td className="team-name nation" >
						<span ><strong>The Draw</strong></span>
						<p className="box-w4"><span className="float-left book" id="book_349" style={{ color: "black" }}>0</span> <span className="float-right profit" id="profit_349" style={{ color: "black" }} ></span></p>
					</td>
					
					<td className="box-w1 back-color" style={{backgroundColor:'#B2D6F0'}}>{status}
						<button className="bet-sec back "  onClick={this.handleBidClick.bind(this,this.state.drawTeamName,this.state.drawLastBack,'#B2D6F0',"back",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status)}> <span className="odd backprice">{this.state.drawLastBack}</span>{this.state.drawLastBackSize}  </button>
					</td>
					<td className="box-w1 back-color" style={{backgroundColor:'#92C9F0'}}>
						<button className="bet-sec back " onClick={this.handleBidClick.bind(this,this.state.drawTeamName,this.state.drawMiddleBack,'#92C9F0',"back",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status)} > <span className="odd backprice">{this.state.drawMiddleBack}</span> {this.state.drawMiddleBackSize} </button>
					</td>
					
					<td className="box-w1 back-color">{status}
						<button className="bet-sec back " onClick={this.handleBidClick.bind(this,this.state.drawTeamName,this.state.drawFirstBack,'#72bbef',"back",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status)} > <span className="odd backprice">{this.state.drawFirstBack}</span> {this.state.drawFirstBackSize} </button>
					</td>
					
					
					
					<td className="box-w1 lay-color">{status}
						<button className="bet-sec lay" onClick={this.handleBidClick.bind(this,this.state.drawTeamName,this.state.drawFirstLay,'#faa9ba',"lay",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status)} value={this.state.lastPriceTraded1} ><span className="odd layprice">{this.state.drawFirstLay}</span>{this.state.drawFirstLaySize}</button>
					</td>
					<td className="box-w1 lay-color" style={{backgroundColor:'#F8BBC8'}}>{status}
						<button className="bet-sec lay" value={this.state.lastPriceTraded1} onClick={this.handleBidClick.bind(this,this.state.drawTeamName,this.state.drawMiddleLay,'#F8BBC8',"lay",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status)} ><span className="odd layprice">{this.state.drawMiddleLay}</span>{this.state.drawMiddleLaySize}</button>
					</td>
					<td className="box-w1 lay-color" style={{backgroundColor:'#F6CDD6'}}>{status}
						<button className="bet-sec lay" value={this.state.lastPriceTraded1} onClick={this.handleBidClick.bind(this,this.state.drawTeamName,this.state.drawLastLay,'#F6CDD6',"lay",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status)}><span className="odd layprice">{this.state.drawLastLay}</span>{this.state.drawLastLaySize}</button>
					</td>															
					
				</tr>
			);
		}
	}
	showTableHtml = () => {
		if (this.state.betDataFound === true) {
			const html = []
			var profit12=0;
			var profit13= 0;
			var loss=0;
			//var custom_this=this;
			var teamOneSelectionId=this.state.teamOneSelectionId;
			var teamTwoSelectionId=this.state.teamOneSelectionId;
			for(let i=0;i<this.state.getResults.length;i++){
				var inPlayClass = (this.state.getResults[i].inPlay === true) ? "active" : "";
				html.push(<tr>
					<td style={{ textAlign: "center" }}> {this.state.getResults[i].odds}  </td>
					<td style={{ textAlign: "center" }}> {this.state.getResults[i].stake}  </td>
					<td style={{ textAlign: "center" }}> {this.state.getResults[i].profit}  </td>
				</tr>);
				
				

				
				 
				 
			}
			
				//////console.log(this.state.profit12);
				
	
					
			
			
			
			
				
				
			
			
			return <table className="table coupon-table">
				<thead>
					<tr>
						<th style={{ textAlign: "center" }} > Odds</th>
						<th style={{ textAlign: "center" }} > Stake</th>
						<th style={{ textAlign: "center" }} > Profit</th>
					</tr>
				</thead>
				<tbody>{html}</tbody>
			</table>;
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
	handleChange = (event) => {
		let { name, value } = event.target;
		
		
		
		
		var stackAmount = event.target;
			
				this.setState({ stackAmount:stackAmount });
		
		
	
	
		
	}
	
	handleChangeStakeamount = (event) => {
		this.setState({stake_amount:event.target.value})
	}
	handleChange_session_input = (event) => {
		this.setState({session_input:event.target.value})
	}
	
	handleButtonsClick = (getAmount) =>{
		var profit = "";
		if(this.state.type === "back") {
			profit = parseFloat(this.state.oddVal)-1;
			profit = profit.toFixed(2) * getAmount;
			
			
			if(this.state.betMatchType=="teamone"){
				this.setState({team_profit1:profit})
			}
			 if(this.state.betMatchType=="teamtwo"){
				this.setState({team_profit2:profit})
	
	
			}
			
			if(this.state.betMatchType=="teamone"){
				this.setState({stackAmount_team2:"-"+getAmount})
			}
			 if(this.state.betMatchType=="teamtwo"){
				this.setState({stackAmount_team1:"-"+getAmount})
			}




			
		}
		else if(this.state.type === "lay"){
			
			profit = parseFloat(this.state.oddVal)-1;
				profit = profit.toFixed(2) * getAmount;
				profit = profit.toFixed(0);
			if(this.state.betMatchType=="teamone"){
				this.setState({team_profit1:"-"+profit})
			}
			else if(this.state.betMatchType=="teamtwo"){
				this.setState({team_profit2:"-"+profit,})
	
	
			}
	
			if(this.state.betMatchType=="teamone"){
				this.setState({stackAmount_team2:getAmount})
			}
			else if(this.state.betMatchType=="teamtwo"){
				this.setState({stackAmount_team1:getAmount})
			}
		}
		
		this.setState({stake_amount:getAmount,profit:profit});
	}
	handleButtonsNewClick = (getAmount) =>{
		
		
		this.setState({stake_amount:getAmount});
	}
	
	handleBidClick = (nat_Dragon,nat_Dragon_rate,color) =>{
		
		


		if(nat_Dragon===undefined){
			this.setState({betClick:false,});
		}
		
		else
		{
			this.setState({betClick:true,betClick1:false});
		}
			this.setState({
						   teamName:nat_Dragon,
						   oddVal:nat_Dragon_rate,
						   color:color,
						  
						  
						});
	}
	

	handleBidClickSession = (color,headname,no,marketId,SessInptNo,yes) =>{
		
		

////console.log(SessInptNo);
		
			this.setState({betClick1:true,betClick:false,});
		
			this.setState({
						   color:color,
						   headname:headname,
						   session_input:SessInptNo,
						   yes:yes,
						   no:no,
						   stake_amount:"",
						   profit22:"",
						   profit:"",
						   team_profit1:"",
						   team_profit2:"",
						   stackAmount_team1:"",
						   stackAmount_team2:""
						});
	}
	handleBidCrossClick = () =>{
		this.setState({betClick:false,
			betClick1:false,
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
		
		
		if(this.state.betClick===true) {
			var button_1 =1000;
			var button_2 =5000;
			var button_3 =10000;
			var button_4 =25000;
			var button_5 =50000;
			var button_6 =100000;
			var button_7 =200000;
			var button_8 =500000;
			var button_9 =1000000;
			var button_10 =2500000;

			
			var value_1 =1000;
			var value_2 =5000;
			var value_3 =10000;
			var value_4 =25000;
			var value_5 =50000;
			var value_6 =100000;
			var value_7 =200000;
			var value_8 =500000;
			var value_9 =1000000;
			var value_10 =2500000;
			if(this.state.buttonvalue_new!=undefined){
				
					button_1 =this.state.buttonvalue_new.button_1;
				
			}
			

			if(this.state.buttonvalue_new!=undefined){
				button_2 =this.state.buttonvalue_new.button_2;
			}

			if(this.state.buttonvalue_new!=undefined){
				button_3 =this.state.buttonvalue_new.button_3;
			}
			if(this.state.buttonvalue_new!=undefined){
				button_4 =this.state.buttonvalue_new.button_4;
			}
			if(this.state.buttonvalue_new!=undefined){
				button_5 =this.state.buttonvalue_new.button_5;
			}
			if(this.state.buttonvalue_new!=undefined){
				button_6 =this.state.buttonvalue_new.button_6;
			}

			if(this.state.buttonvalue_new!=undefined){
				button_7 =this.state.buttonvalue_new.button_7;
			}
			if(this.state.buttonvalue_new!=undefined){
				button_8 =this.state.buttonvalue_new.button_8;
			}
			if(this.state.buttonvalue_new!=undefined){
				button_9=this.state.buttonvalue_new.button_9;
			}
			if(this.state.buttonvalue_new!=undefined){
				button_10=this.state.buttonvalue_new.button_10;
			}
			if(this.state.buttonvalue_new!=undefined){
				value_1 =this.state.buttonvalue_new.value_1;
			}
			
			if(this.state.buttonvalue_new!=undefined){
				value_2 =this.state.buttonvalue_new.value_2;
			}
			
			if(this.state.buttonvalue_new!=undefined){
				value_3 =this.state.buttonvalue_new.value_3;
			}
			if(this.state.buttonvalue_new!=undefined){
				value_4 =this.state.buttonvalue_new.value_4;
			}
			if(this.state.buttonvalue_new!=undefined){
				value_5 =this.state.buttonvalue_new.value_5;
			}
			if(this.state.buttonvalue_new!=undefined){
				value_6 =this.state.buttonvalue_new.value_6;
			}
			
			if(this.state.buttonvalue_new!=undefined){
				value_7 =this.state.buttonvalue_new.value_7;
			}
			if(this.state.buttonvalue_new!=undefined){
				value_8 =this.state.buttonvalue_new.value_8;
			}
			if(this.state.buttonvalue_new!=undefined){
				value_9=this.state.buttonvalue_new.value_9;
			}
			if(this.state.buttonvalue_new!=undefined){
				value_10=this.state.buttonvalue_new.value_10;
			}

		return (
			<div className="table-responsive hide-box-click " style={{ paddingBottom: "4px", display: "block",background: this.state.color }} >
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
							<td className="text-center"><a href="#;" className="text-danger" onClick={this.handleBidCrossClick}> <i className="fa fa-times"></i> </a></td>
							<td id="team_nm">{this.state.teamName}</td>
							<td style={{ width: "75px" }} >
								<div className="form-group">
								<input value={this.state.type} name="type" type="hidden" />
									<input value={this.state.oddVal} name="oddVal" className="amountint"  onChange={this.handleChange} type="number" required="required" maxLength="4" style={{ float: "left", width: "45px", verticalAlign: "middle" }} id="odds" step="0.01" />
								</div>
							</td>
							<td>
								<div className="form-group bet-stake">
									<input id="btn_val" style={{ width: "52px" }} maxLength="10" value={this.state.stake_amount} name="stake_amount" type="text" onChange={this.handleChange} required="required" />
								</div>
							</td> 
							<td>
							{this.state.profit}
							</td> 
						</tr>
						<tr>
						  <td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_1} onClick={this.handleButtonsClick.bind(this,value_1)}>{button_1}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_2} onClick={this.handleButtonsClick.bind(this,value_2)}>{button_2}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_3} onClick={this.handleButtonsClick.bind(this,value_3)}>{button_3}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_4} onClick={this.handleButtonsClick.bind(this,value_4)}>{button_4}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_5} onClick={this.handleButtonsClick.bind(this,value_5)}>{button_5}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_6} onClick={this.handleButtonsClick.bind(this,value_6)}>{button_6}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_7} onClick={this.handleButtonsClick.bind(this,value_7)}>{button_7}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_8} onClick={this.handleButtonsClick.bind(this,value_8)}>{button_8}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_9} onClick={this.handleButtonsClick.bind(this,value_9)}>{button_9}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_10} onClick={this.handleButtonsClick.bind(this,value_10)}>{button_10}</a>
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
			var button_2 =5000;
			var button_3 =10000;
			var button_4 =25000;
			var button_5 =50000;
			var button_6 =100000;
			var button_7 =200000;
			var button_8 =500000;
			var button_9 =1000000;
			var button_10 =2500000;

			
			var value_1 =1000;
			var value_2 =5000;
			var value_3 =10000;
			var value_4 =25000;
			var value_5 =50000;
			var value_6 =100000;
			var value_7 =200000;
			var value_8 =500000;
			var value_9 =1000000;
			var value_10 =2500000;

			if(this.state.buttonvalue_new.button_1!=undefined){
				button_1 =this.state.buttonvalue_new.button_1;
			}

			if(this.state.buttonvalue_new.button_2!=undefined){
				button_2 =this.state.buttonvalue_new.button_2;
			}

			if(this.state.buttonvalue_new.button_3!=undefined){
				button_3 =this.state.buttonvalue_new.button_3;
			}
			if(this.state.buttonvalue_new.button_4!=undefined){
				button_4 =this.state.buttonvalue_new.button_4;
			}
			if(this.state.buttonvalue_new.button_5!=undefined){
				button_5 =this.state.buttonvalue_new.button_5;
			}
			if(this.state.buttonvalue_new.button_6!=undefined){
				button_6 =this.state.buttonvalue_new.button_6;
			}

			if(this.state.buttonvalue_new.button_7!=undefined){
				button_7 =this.state.buttonvalue_new.button_7;
			}
			if(this.state.buttonvalue_new.button_8!=undefined){
				button_8 =this.state.buttonvalue_new.button_8;
			}
			if(this.state.buttonvalue_new.button_9!=undefined){
				button_9=this.state.buttonvalue_new.button_9;
			}
			if(this.state.buttonvalue_new.button_10!=undefined){
				button_10=this.state.buttonvalue_new.button_10;
			}
			if(this.state.buttonvalue_new.value_1!=undefined){
				value_1 =this.state.buttonvalue_new.value_1;
			}
			
			if(this.state.buttonvalue_new.value_2!=undefined){
				value_2 =this.state.buttonvalue_new.value_2;
			}
			
			if(this.state.buttonvalue_new.value_3!=undefined){
				value_3 =this.state.buttonvalue_new.value_3;
			}
			if(this.state.buttonvalue_new.value_4!=undefined){
				value_4 =this.state.buttonvalue_new.value_4;
			}
			if(this.state.buttonvalue_new.value_5!=undefined){
				value_5 =this.state.buttonvalue_new.value_5;
			}
			if(this.state.buttonvalue_new.value_6!=undefined){
				value_6 =this.state.buttonvalue_new.value_6;
			}
			
			if(this.state.buttonvalue_new.value_7!=undefined){
				value_7 =this.state.buttonvalue_new.value_7;
			}
			if(this.state.buttonvalue_new.value_8!=undefined){
				value_8 =this.state.buttonvalue_new.value_8;
			}
			if(this.state.buttonvalue_new.value_9!=undefined){
				value_9=this.state.buttonvalue_new.value_9;
			}
			if(this.state.buttonvalue_new.value_10!=undefined){
				value_10=this.state.buttonvalue_new.value_10;
			}
			return (
			<div className="table-responsive hide-box-click " style={{ paddingBottom: "4px", display: "block",background: this.state.color }} >
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
							<td className="text-center"><a href="#;" className="text-danger" onClick={this.handleBidCrossClick}> <i className="fa fa-times"></i> </a></td>
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
				);
		}
	}












	render() {
		console.log(this.state.nat_Dragon);
		var status=this.state.status;
		if(status!="OPEN"){
			 status=this.state.status;
		}else{
			status="";
		}
	var maximum_bet_limit=	this.state.maxminBet.adminlist;
	if(maximum_bet_limit!=undefined){
		maximum_bet_limit=maximum_bet_limit.maximum_bet_limit;
	}else{
		maximum_bet_limit ="N/A";
	}
	var minimum_bet_limit=	this.state.maxminBet.adminlist;
	if(minimum_bet_limit!=undefined){
		minimum_bet_limit=minimum_bet_limit.minimum_bet_limit;
	}else{
		minimum_bet_limit ="N/A";
	}
	
		var accessToken = this.state.accessToken;

		if (accessToken === "" || accessToken === null) {
			return (
				<Redirect to="/login" />
			);
		}
		var change_password=localStorage.getItem("change_password")
		if (change_password!=""  && change_password!=null) {
			return (
				<Redirect to="/change_password" />
			);
		}
	var newdata11=this.state.getResult11;
		var newarray=[];
		if(this.state.casinodt20!=undefined && this.state.casinodt20!='' && this.state.casinodt20!=null)
		{
			
			for(var i=0;i<this.state.casinodt20.length;i++){
			
				newarray.push(<span className="ball-runs ">{this.state.casinodt20[i].result}</span>)
			}
			console.log(newarray);
		
		}

		
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
										<div className="game-heading">
										<span className="card-header-title"> 20-20 DRAGON TIGER RULES <a href="#" className=" m-r-5 game-rules-icon blinking" data-id="match">RULES</a></span> 
										<span className="float-right m-r-10">Round ID: 200508174628
</span>
										
										 </div>
										<div className="card-content">
										

										<iframe e className="live_video"   height="315"src={this.state.randomElement}  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/>
										
										{/* <iframe width="560" height="315" src="https://www.youtube.com/embed/DTQl47Jlzcs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
										
<div className=" m-b-10 main-market market-bf" data-marketid="1.167146463">
												
	<div  className="d-t-box m-b-10">											
<div  className="row">
   <div  className="col-md-9">
      <div  className="row">
         <div  className="col-md-5 text-center">
            <b >{this.state.nat_Dragon_rate}</b> 
			<div  className="m-t-10"><button 
			onClick={this.handleBidClick.bind(this,this.state.nat_Dragon,this.state.nat_Dragon_rate,'#faa9ba')}
			
			className="text-uppercase btn-theme low-high-btn"><b >{this.state.nat_Dragon}</b></button> <span  className="d-block m-t-5" style={{color: 'black'}}>0</span></div>
         </div>
         <div  className="col-md-2 text-center">
            <b >{this.state.nat_Tie_rate}</b> 
            <div  className="m-t-10"><button onClick={this.handleBidClick.bind(this,this.state.nat_Tie,this.state.nat_Tie_rate,'#faa9ba')} className="text-uppercase  btn-theme low-high-btn"><b >{this.state.nat_Tie}</b></button> <span  className="d-block m-t-5" style={{color: 'black'}}>0</span></div>
         </div>
         <div  className="col-md-5 text-center">
            <b >{this.state.nat_Dragon_rate}</b> 
            <div  className="m-t-10"><button onClick={this.handleBidClick.bind(this,this.state.nat_Tiger,this.state.nat_Dragon_rate,'#faa9ba')}  className="text-uppercase btn-theme low-high-btn "><b >{this.state.nat_Tiger}</b></button> <span  className="d-block m-t-5" style={{color: 'black'}}>0</span></div>
         </div>
      </div>
   </div>
  
  
   <div  className="col-md-3 pair-block  text-center">
      <b >{this.state.nat_Pair_rate}</b> 
	  <div  className="m-t-10"><button  onClick={this.handleBidClick.bind(this,this.state.nat_Pair,this.state.nat_Pair_rate,'#faa9ba')}
	   className="text-uppercase btn-theme low-high-btn"><b >{this.state.nat_Pair}</b></button> <span  className="d-block m-t-5" style={{color: 'black'}}>0</span></div>
   </div>
   <div  className="col-md-12 m-t-10 text-right"><span  className="m-r-10"><b >Min: </b><span >{this.state.nat_Dragon_min_value}</span></span> <span ><b >Max: </b><span >{this.state.nat_Dragon_max_value}</span></span></div>
</div>
</div>
<div  class="row row5">		
	<div  className="col-md-6">
		<div  className="d-t-box m-b-10">
		<div  className="row ">
		<div  className="col-12">
			<h4  className="m-b-0 text-center text-uppercase">Dragon</h4>
		</div>
		<div  className="col-md-6 text-center">
			<b >{this.state.nat_Dragon_even_rate}</b> 
			<div  className="m-t-10"><button onClick={this.handleBidClick.bind(this,this.state.nat_Dragon_even,this.state.nat_Dragon_even_rate,'#faa9ba')} className="text-uppercase btn-theme low-high-btn "><b >Even</b></button> <span  className="d-block m-t-5" style={{color: 'black'}}>0</span></div>
		</div>
		<div  className="col-md-6 text-center">
			<b >{this.state.nat_Dragon_odd_rate}</b> 
			<div  className="m-t-10"><button onClick={this.handleBidClick.bind(this,this.state.nat_Dragon_odd,this.state.nat_Dragon_odd_rate,'#faa9ba')}  className="text-uppercase btn-theme low-high-btn "><b >Odd</b></button> <span  className="d-block m-t-5" style={{color: 'black'}}>0</span></div>
		</div>
		<div  className="col-md-12 m-t-10 text-right"><span  className="m-r-10"><b >Min:
			</b><span >{this.state.nat_Dragon_even_min_value}</span></span> <span ><b >Max: </b><span >{this.state.nat_Dragon_even_max_value}</span></span>
		</div>
		<div  className="col-md-6 text-center m-t-10">
			<b >{this.state.nat_Dragon_red_rate}</b> 
			<div  className="m-t-10">
				<button onClick={this.handleBidClick.bind(this,this.state.nat_Dragon_red,this.state.nat_Dragon_red_rate,'#faa9ba')} className="text-uppercase btn-theme low-high-btn ">
					<div  className="color-card" /> <span  className="card-icon"><span  className="card-red">[</span></span> <span  className="card-icon"><span  className="card-red">{'{'}</span></span>
				</button>
				<span  className="d-block m-t-5" style={{color: 'black'}}>0</span></div>
			</div>
			<div  className="col-md-6 text-center m-t-10">
				<b >{this.state.nat_Dragon_black_rate}</b> 
				<div  className="m-t-10">
					<button onClick={this.handleBidClick.bind(this,this.state.nat_Dragon_black,this.state.nat_Dragon_black_rate,'#faa9ba')}  className="text-uppercase btn-theme low-high-btn ">
					<div  className="color-card" /> <span  className="card-icon"><span  className="card-black">]</span></span> <span  className="card-icon"><span  className="card-black">{'}'}</span></span>
					</button>
					<span  className="d-block m-t-5" style={{color: 'black'}}>0</span></div>
				</div>
				<div  className="col-md-12 m-t-10 text-right"><span  className="m-r-10"><b >Min:
					</b><span >{this.state.nat_Dragon_black_min}</span></span> <span ><b >Max: </b><span >{this.state.nat_Dragon_black_max}</span></span>
				</div>
			</div>
		</div>
			

	</div>


	<div  className="col-md-6">
		<div  className="d-t-box m-b-10">
		<div  className="row ">
		<div  className="col-12">
			<h4  className="m-b-0 text-center text-uppercase">Tiger</h4>
		</div>
		<div  className="col-md-6 text-center">
			<b >{this.state.nat_Tiger_even_rate}</b> 
			<div  className="m-t-10"><button onClick={this.handleBidClick.bind(this,this.state.nat_Tiger_even,this.state.nat_Tiger_even_rate,'#faa9ba')} className="text-uppercase btn-theme low-high-btn "><b >Even</b></button> <span  className="d-block m-t-5" style={{color: 'black'}}>0</span></div>
		</div>
		<div  className="col-md-6 text-center">
			<b >{this.state.nat_Tiger_odd_rate}</b> 
			<div  className="m-t-10"><button onClick={this.handleBidClick.bind(this,this.state.nat_Tiger_odd,this.state.nat_Tiger_odd_rate,'#faa9ba')}  className="text-uppercase btn-theme low-high-btn "><b >Odd</b></button> <span  className="d-block m-t-5" style={{color: 'black'}}>0</span></div>
		</div>
		<div  className="col-md-12 m-t-10 text-right"><span  className="m-r-10"><b >Min:
			</b><span >{this.state.nat_Tiger_even_min}</span></span> <span ><b >Max: </b><span >{this.state.nat_Tiger_even_max}</span></span>
		</div>
		<div  className="col-md-6 text-center m-t-10">
			<b >{this.state.nat_Tiger_red_rate}</b> 
			<div  className="m-t-10">
				<button onClick={this.handleBidClick.bind(this,this.state.nat_Tiger_red,this.state.nat_Tiger_red_rate,'#faa9ba')} className="text-uppercase btn-theme low-high-btn ">
					<div  className="color-card" /> <span  className="card-icon"><span  className="card-red">[</span></span> <span  className="card-icon"><span  className="card-red">{'{'}</span></span>
				</button>
				<span  className="d-block m-t-5" style={{color: 'black'}}>0</span></div>
			</div>
			<div  className="col-md-6 text-center m-t-10">
				<b >{this.state.nat_Tiger_red_rate}</b> 
				<div  className="m-t-10">
					<button onClick={this.handleBidClick.bind(this,this.state.nat_Dragon_black,this.state.nat_Tiger_red_rate,'#faa9ba')}  className="text-uppercase btn-theme low-high-btn ">
					<div  className="color-card" /> <span  className="card-icon"><span  className="card-black">]</span></span> <span  className="card-icon"><span  className="card-black">{'}'}</span></span>
					</button>
					<span  className="d-block m-t-5" style={{color: 'black'}}>0</span></div>
				</div>
				<div  className="col-md-12 m-t-10 text-right"><span  className="m-r-10"><b >Min:
					</b><span >{this.state.nat_Dragon_black_min}</span></span> <span ><b >Max: </b><span >{this.state.nat_Dragon_black_max}</span></span>
				</div>
			</div>
		</div>
			

	</div>

</div>
<div  class="row row5">	 
<div  className="col-md-6">
   <div  className="d-t-box m-b-10">
      <div  className="row ">
         <div  className="col-md-12">
            <h4  className="m-b-0 text-center text-uppercase">Dragon {this.state.nat_Dragon_card_rate}
            </h4>
         </div>
         <div  className="card-dt col-md-12 text-center m-t-10">
            <div onClick={this.handleBidClick.bind(this,this.state.nat_Dragon_card_1,this.state.nat_Dragon_card_rate,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img  src="/img/card/1.jpg" /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div  onClick={this.handleBidClick.bind(this,this.state.nat_Dragon_card_2,this.state.nat_Dragon_card_rate,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img  src="/img/card/2.jpg" /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div  onClick={this.handleBidClick.bind(this,this.state.nat_Dragon_card_3,this.state.nat_Dragon_card_rate,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img  src="/img/card/3.jpg" /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nat_Dragon_card_4,this.state.nat_Dragon_card_rate,'#faa9ba')}  className=" m-r-5 card-image d-inline-block">
               <div  className><img  src="/img/card/4.jpg" /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nat_Dragon_card_5,this.state.nat_Dragon_card_rate,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img  src="/img/card/5.jpg" /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nat_Dragon_card_6,this.state.nat_Dragon_card_rate,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img  src="/img/card/6.jpg" /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nat_Dragon_card_7,this.state.nat_Dragon_card_rate,'#faa9ba')}  className=" m-r-5 card-image d-inline-block">
               <div  className><img  src="/img/card/7.jpg" /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nat_Dragon_card_8,this.state.nat_Dragon_card_rate,'#faa9ba')}  className=" m-r-5 card-image d-inline-block">
               <div  className><img  src="/img/card/8.jpg" /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nat_Dragon_card_9,this.state.nat_Dragon_card_rate,'#faa9ba')}  className=" m-r-5 card-image d-inline-block">
               <div  className><img  src="/img/card/9.jpg" /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nat_Dragon_card_10,this.state.nat_Dragon_card_rate,'#faa9ba')}  className=" m-r-5 card-image d-inline-block">
               <div  className><img  src="/img/card/10.jpg" /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nat_Dragon_card_j,this.state.nat_Dragon_card_rate,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img  src="/img/card/11.jpg" /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nat_Dragon_card_q,this.state.nat_Dragon_card_rate,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img  src="/img/card/12.jpg" /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nat_Dragon_card_k,this.state.nat_Dragon_card_rate,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img  src="/img/card/13.jpg" /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
         </div>
         <div  className="col-md-12 m-t-10 text-right"><span  className="m-r-10"><b >Min:
            </b><span >{this.state.nat_Dragon_card_min}</span></span> <span ><b >Max: </b><span >{this.state.nat_Dragon_card_max}</span></span>
         </div>
      </div>
   </div>
</div>
<div  className="col-md-6">
   <div  className="d-t-box m-b-10">
      <div  className="row ">
         <div  className="col-md-12">
            <h4  className="m-b-0 text-center text-uppercase">Tiger {this.state.nat_Tiger_card_rate}
            </h4>
         </div>
         <div  className="card-dt col-md-12 text-center m-t-10">
            <div onClick={this.handleBidClick.bind(this,this.state.nat_Tiger_card_1,this.state.nat_Tiger_card_rate,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img  src="/img/card/1.jpg" /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div  onClick={this.handleBidClick.bind(this,this.state.nat_Tiger_card_2,this.state.nat_Tiger_card_rate,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img  src="/img/card/2.jpg" /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div  onClick={this.handleBidClick.bind(this,this.state.nat_Tiger_card_3,this.state.nat_Tiger_card_rate,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img  src="/img/card/3.jpg" /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nat_Tiger_card_4,this.state.nat_Tiger_card_rate,'#faa9ba')}  className=" m-r-5 card-image d-inline-block">
               <div  className><img  src="/img/card/4.jpg" /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nat_Tiger_card_5,this.state.nat_Tiger_card_rate,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img  src="/img/card/5.jpg" /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nat_Tiger_card_6,this.state.nat_Tiger_card_rate,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img  src="/img/card/6.jpg" /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nat_Tiger_card_7,this.state.nat_Tiger_card_rate,'#faa9ba')}  className=" m-r-5 card-image d-inline-block">
               <div  className><img  src="/img/card/7.jpg" /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nat_Tiger_card_8,this.state.nat_Tiger_card_rate,'#faa9ba')}  className=" m-r-5 card-image d-inline-block">
               <div  className><img  src="/img/card/8.jpg" /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nat_Tiger_card_9,this.state.nat_Tiger_card_rate,'#faa9ba')}  className=" m-r-5 card-image d-inline-block">
               <div  className><img  src="/img/card/9.jpg" /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nat_Tiger_card_10,this.state.nat_Tiger_card_rate,'#faa9ba')}  className=" m-r-5 card-image d-inline-block">
               <div  className><img  src="/img/card/10.jpg" /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nat_Tiger_card_j,this.state.nat_Tiger_card_rate,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img  src="/img/card/11.jpg" /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nat_Tiger_card_q,this.state.nat_Tiger_card_rate,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img  src="/img/card/12.jpg" /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nat_Tiger_card_k,this.state.nat_Tiger_card_rate,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img  src="/img/card/13.jpg" /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
         </div>
         <div  className="col-md-12 m-t-10 text-right"><span  className="m-r-10"><b >Min:
            </b><span >{this.state.nat_Dragon_card_min}</span></span> <span ><b >Max: </b><span >{this.state.nat_Dragon_card_max}</span></span>
         </div>
      </div>
   </div>
</div>

</div>

												
												</div>
											<div className="">

												<div className="row row-12">
													<div className="col-md-12" id="fancyHeadToHide" >
														<div className="fancy-marker-title">
															<h4>Last Result<a href="#" className=" m-r-5 game-rules-icon blinking" data-id="fancy"><span><i className="fa fa-info-circle float-right"></i></span></a></h4>
														</div>
						<div className="scorecard m-b-5">
                 
        <p className="text-right ball-by-ball m-t-10"> 
			{newarray}
		</p>
                      
                 
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
									{/*<div className="card-header m-b-10" data-toggle="collapse" data-target="#demo">
										<h6 className="card-title">Live Match <span className="float-right"><i className="fa fa-tv"></i> live stream started</span> </h6>
										<iframe src="https://bet-fair.co/exchange/tplive1?type=dt20" style={{border: 'none'}} allowFullScreen sandbox="allow-scripts allow-presentation allow-same-origin" allow="autoplay; fullscreen; picture-in-picture; xr-spatial-tracking; encrypted-media" />

									</div>*/}
									
									<div className="card m-b-10 place-bet ">
										<div className="card-header">
											<h6 className="card-title d-inline-block">Place Bet</h6>
											{/*<a className="btn btn-secondary float-right change-value" id="cng_btn_val" href="#">Change Button Value</a>*/}
										</div>
									
													
										{this.showBidClickHtml()}
										{this.showBidClickSessionHtml()}		
												
									</div>
									<div className="card m-b-10 place-bet">
										<div className="card-header">
											<h6 className="card-title d-inline-block">My Bet</h6>
											{/*<a className="btn btn-danger float-right change-value" id="cng_btn_val" href="#">ClearAll</a>*/}
										</div>
										<div className="table-responsive hide-box-click " style={{ paddingBottom: "4px", display: "block" }} >

											{this.showTableHtml()}
										</div>
									</div>
									</div>
							</div>
						</div>
					</div>
				</div>
<Footer/>
			</div>
		);

		



	}
}

export default Index;
