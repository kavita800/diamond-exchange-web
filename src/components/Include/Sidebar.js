import React, { Component } from 'react';
import {Link,Redirect} from "react-router-dom";
import axios from "axios";
import Moment from 'moment';
const baseUrl = "http://172.105.40.76:4000";
const $ = window.$;
class Sidebar extends Component {
	constructor(props) {
		super(props);
		var accessToken = localStorage.getItem("token");
		this.state = {accessToken:accessToken,
			open: false,
			position: 'left',
			noOverlay: true,
			matchData:"",
			matchName:"",
			matchData1:"",
			matchData1:"",
			matchName2:"",
			loader:false,
			admin_text:"",
		}; 

	  }	

	handleSubmit =(event) =>{
		event.preventDefault(); 
		
		$(".blockUI").show();
	
		 let headers={
			Authorization:"Bearer "+ this.state.accessToken,
		 }; 
		 
		  axios.get(baseUrl + '/api/usermatch_serieslist/cricket', {headers}).then((resp) => { 
		   var resp = resp.data;
		   //console.log(resp);
	
			this.setState({matchData:resp.data})
			const items2 = []
			for(var index = 0; index < this.state.matchData.length; index++){
				items2.push(this.state.matchData[index].series_id)
				
			}
			this.handleSubmitMatchname(items2)
			});
			var match = localStorage.getItem("match");
			if(match!=undefined){
				localStorage.setItem("match",parseInt(match)+parseInt(1));
	
			}else{
				localStorage.setItem("match", 1);
			}
			
	
	}
	
	handleSubmitMatchname =(value) =>{
		var match = localStorage.getItem("match");
	
		
	if(match<=1 || match===undefined){
		let headers={
			Authorization:"Bearer "+ this.state.accessToken,
		 }; 
	
		 let sendData={
			event_id:value.toString(),
			
		  }; 
		  
		  $(".blockUI").show();  
	
		  axios.post(baseUrl + '/api/partiuser_match_deatils/cricket',sendData, {headers}).then((resp) => { 
		   var resp = resp.data;
			this.setState({matchName:resp.data})
	
	 
	
	
	
	
	   
	  });
	}
		
		
			
	}
	
	showTableHtml1 = (series_id) =>{  
		const items1 = []
	 
	if(this.state.matchName!=undefined){
		for (var a = 0; a < this.state.matchName.length; a++) {
			for (var b = 0; b < this.state.matchName[a].length;b++) {
				var value = this.state.matchName[a][b];	
				
				if(series_id==value.series_id){
				items1.push(
				<li>
				{Moment(value.open_date).format('LL')}
				<div className="expander" />
				<ul>
				  <li>{value.match_name}</li>
				  <div className="expander" />
					<ul>
					<li>
					<Link to={"/matchdetail/"+value.match_id+'/'+"cricket"}>MATCH_ODDS</Link>
						
						
						</li>
				
					</ul>
				</ul>
			  </li>)
				}
			
			   
		}
	
	}
	$(".blockUI").hide();
		}
		
		  
	
	return items1;
	
	}
	
	showTableHtml = () =>{  
		const items = []
		
	for (var a = 0; a < this.state.matchData.length; a++) {
	
		items.push(
		<li>
			{this.state.matchData[a].series_name}
			<div className="expander"   />
			<ul>
			  {this.showTableHtml1(this.state.matchData[a].series_id)}
			 
			
			  
			</ul>
		  </li>)
	
	
		   
	}
		return   <ul>
					{items}
				</ul>
	  
	}
	
	handleSubmitSoccer =(event) =>{
		event.preventDefault(); 
		
	
		$(".blockUI").show();
		 let headers={
			Authorization:"Bearer "+ this.state.accessToken,
		 }; 
		  axios.get(baseUrl + '/api/usermatch_serieslist/soccer', {headers}).then((resp) => { 
		   var resp = resp.data;
		   //console.log(resp);
	
			this.setState({matchData1:resp.data})
			const items2 = []
			for(var index = 0; index < this.state.matchData1.length; index++){
				items2.push(this.state.matchData1[index].series_id)
				
			}
			this.handleSubmitMatchnameSoccer(items2)
			});
			var match = localStorage.getItem("match1");
			if(match!=undefined){
				localStorage.setItem("match1",parseInt(match)+parseInt(1));
	
			}else{
				localStorage.setItem("match1", 1);
			}
			
	}
	
	handleSubmitMatchnameSoccer =(value) =>{
		var match = localStorage.getItem("match1");
	
		
	if(match<=1 || match===undefined){
		let headers={
			Authorization:"Bearer "+ this.state.accessToken,
		 }; 
	
		 let sendData={
			event_id:value.toString(),
			
		  }; 
		  
	
		  $(".blockUI").show();  
		  axios.post(baseUrl + '/api/partiuser_match_deatils/soccer',sendData, {headers}).then((resp) => { 
		   var resp = resp.data;
			this.setState({matchName1:resp.data})
	
	 
	
	
	
	
	   
	  });
	}
		
		
			
	}
	
	showTableHtmlSoccer1 = (series_id) =>{  
		const items1 = []
	 
		if(this.state.matchName1!=undefined){
	
		for (var a = 0; a < this.state.matchName1.length; a++) {
			for (var b = 0; b < this.state.matchName1[a].length;b++) {
				var value = this.state.matchName1[a][b];	
				
				if(series_id==value.series_id){
				items1.push(
				<li>
				{Moment(value.open_date).format('LL')}
				<div className="expander" />
				<ul>
				  <li>{value.match_name}</li>
				  <div className="expander" />
					<ul>
					<li><Link to={"/matchdetail/"+value.match_id+'/'+"soccer"}>MATCH_ODDS</Link></li>
				
					</ul>
				</ul>
			  </li>)
				}
			}
			$(".blockUI").hide();  
		}
	}
		
		  
	
	return items1;
	
	}
	
	showTableHtmlSoccer = () =>{  
		const items = []
		
	for (var a = 0; a < this.state.matchData1.length; a++) {
	
		items.push(
		<li>
			{this.state.matchData1[a].series_name}
			<div className="expander"   />
			<ul>
			  {this.showTableHtmlSoccer1(this.state.matchData1[a].series_id)}
			 
			
			  
			</ul>
		  </li>)
	
		
		   
	}
		return   <ul>
					{items}
				</ul>
	  
	}
	
	
	
	handleSubmitTennis =(event) =>{
		event.preventDefault(); 
		
		$(".blockUI").show();
	
		 let headers={
			Authorization:"Bearer "+ this.state.accessToken,
		 }; 
		  axios.get(baseUrl + '/api/usermatch_serieslist/tennis', {headers}).then((resp) => { 
		   var resp = resp.data;
		   //console.log(resp);
	
			this.setState({matchData2:resp.data})
			const items2 = []
			for(var index = 0; index < this.state.matchData2.length; index++){
				items2.push(this.state.matchData2[index].series_id)
				
			}
			this.handleSubmitMatchnameTennis(items2)
			});
			var match = localStorage.getItem("match2");
			if(match!=undefined){
				localStorage.setItem("match2",parseInt(match)+parseInt(1));
	
			}else{
				localStorage.setItem("match2", 1);
			}
	
	}
	
	handleSubmitMatchnameTennis =(value) =>{
		var match = localStorage.getItem("match2");
	
		
	if(match<=1 || match===undefined){
		let headers={
			Authorization:"Bearer "+ this.state.accessToken,
		 }; 
	
		 let sendData={
			event_id:value.toString(),
			
		  }; 
		  
	
		  $(".blockUI").show();  
		  axios.post(baseUrl + '/api/partiuser_match_deatils/tennis',sendData, {headers}).then((resp) => { 
		   var resp = resp.data;
			this.setState({matchName2:resp.data})
	
	 
	
	
	
	
	   
	  });
	}
		
		
			
	}
	
	showTableHtmlTennis1 = (series_id) =>{  
		const items1 = []
	 
	if(this.state.matchName2!=undefined){
		for (var a = 0; a < this.state.matchName2.length; a++) {
			for (var b = 0; b < this.state.matchName2[a].length;b++) {
				var value = this.state.matchName2[a][b];	
				
				if(series_id==value.series_id){
				items1.push(
				<li>
				{Moment(value.open_date).format('LL')}
				<div className="expander" />
				<ul>
				  <li>{value.match_name}</li>
				  <div className="expander" />
					<ul>
					<li><Link to={"/matchdetail/"+value.match_id+'/'+"tennis"}>MATCH_ODDS</Link></li>
				
					</ul>
				</ul>
			  </li>)
				}
			
			   
		}
		$(".blockUI").hide();
	
	}
	}
		
		  
	
	return items1;
	
	}
	
	showTableHtmlTennis = () =>{  
		const items = []
		if(this.state.matchData2!=undefined){
			for (var a = 0; a < this.state.matchData2.length; a++) {
	
				items.push(
				<li>
					{this.state.matchData2[a].series_name}
					<div className="expander"   />
					<ul>
					  {this.showTableHtmlTennis1(this.state.matchData2[a].series_id)}
					 
					
					  
					</ul>
				  </li>)
			
				
				   
			}
		}
	
		return   <ul>
					{items}
				</ul>
	  
	}
	componentWillMount() { 
		  
		
		localStorage.removeItem("match");
		localStorage.removeItem("match1");
		localStorage.removeItem("match2");
		
		
	
	}
  render() {
  
var sports_casino1="";
var sports_casino2="";
var sports_casino3="";
var sports_casino4="";
var sports_casino5="";
var sports_casino6="";
var sports_casino7="";
var sports_casino8="";
var sports_casino9="";
var sports_casino10="";
var sports_casino11="";
var sports_casino12="";
var sports_casino13="";
var sports_casino14="";
var sports_casino15="";
var sports_casino16="";
var sports_casino17="";
var sports_casino18="";
var sports_casino19="";
var sports_casino21="";
var sports_casino22="";
var sports_casino23="";
var sports_casino24="";
var sports_casino25="";
var sports_casino26="";
var sports_casino27="";
var sports_casino28="";
var sports_casino29="";
var sports_casino30="";
var sports_casino31="";
var sports_casino32="";
if("demandexch99.com"!=window.location.hostname){
	var sports_casino1=	<li className="nav-item"><a href="/matches/Sports-Casino" className="nav-link"><span className="newlacunch-menu">Sports Casino</span></a></li>
	var sports_casino2=	<li className="nav-item"><a href="/matches/Andar-Bahar" className="nav-link">Andar Bahar</a></li>
		var sports_casino3= <li className="nav-item"><a href="/matches/Bollywood-Casino" className="nav-link">Bollywood Casino</a></li> 
		var sports_casino4= <li className="nav-item"><a href="/matches/Casino-War" className="nav-link">Casino War</a></li> 
		var sports_casino5= <li className="nav-item"><a href="/matches/Worli" className="nav-link">Worli</a></li> 
		var sports_casino6= <li className="nav-item"><a href="/matches/Lottery" className="nav-link">Lottery</a></li> 
		var sports_casino7= <li className="nav-item"><a href="/matches/3-Cards-Judgement" className="nav-link">3 Cards Judgement</a></li> 
		var sports_casino8= <li className="nav-item"><a href="/matches/Sports-Casino" className="nav-link">Binary</a></li> 
		var sports_casino9= <li className="nav-item"><a href="/matches/Virtual-Sports" className="nav-link">Virtual Sports</a></li>
		var sports_casino10= <li className="nav-item "><a href="/matches/Live-Casino" className="nav-link"><span className="newlacunch-menu">Live Casino</span></a></li> 
		var sports_casino11= <li className="nav-item"><a href="/matches/Slot-Game" className="nav-link">Slot Game</a></li> 
		var sports_casino12= <li className="nav-item"><a href="/matches/Cricket-Casino" className="nav-link">Cricket Casino</a></li>
		
		var sports_casino21= <li className="nav-item nav-link"><div className="expander" ></div><a href="/matches/Table-Tennis">Table Tennis</a></li>
		var sports_casino22= <li className="nav-item nav-link"><div className="expander" ></div><a href="/matches/Darts">Darts</a></li> 
		var sports_casino23= <li className="nav-item nav-link"><div className="expander" ></div> <a href="/matches/Badminton"   >Badminton</a></li>
		var sports_casino24= <li className="nav-item nav-link"><div className="expander" ></div><a href="/matches/Basketball"   >Basketball</a></li> 
		var sports_casino25= <li className="nav-item nav-link"><div className="expander" ></div><a href="/matches/Volleyball"   >Volleyball</a></li>
		var sports_casino26= <li className="nav-item nav-link"><div className="expander" ></div><a href="/matches/Ice-Hockey"   >Ice Hockey</a></li>
		var sports_casino27= <li className="nav-item nav-link"><div className="expander" ></div><a href="/matches/Baccarat" ><span>Baccarat</span></a></li>
		var sports_casino28= <li className="nav-item nav-link"><div className="expander" ></div><a href="/matches/Politics"><span>Politics</span></a></li>
		var sports_casino29= <li className="nav-item nav-link"><div className="expander" ></div><a href="/matches/Kabaddi"><span>Kabaddi</span></a></li>
		var sports_casino30= <li className="nav-item nav-link"><div className="expander" ></div><a href="/matches/Boxing"><span>Boxing</span></a></li>
		var sports_casino31= <li className="nav-item nav-link"><div className="expander" ></div><a href="/matches/MixedMartialArts<"><span>Mixed Martial Arts</span></a></li>
		var sports_casino32= <li className="nav-item nav-link"><div className="expander" ></div><a href="/matches/MotorSports"><span>Motor Sports</span></a></li>
 
			 
   
}
if("demandexch99.com"===window.location.hostname){
        var sports_casino13= <li className="nav-item"><a href="/casino/teen-patti-t20" className="nav-link"><span className="newlacunch-menu">Teenpatti-T20</span></a></li> 
		var sports_casino14= <li className="nav-item"><a href="/casino/one-day-teenpatti" className="nav-link">Teenpatti One Day</a></li> 
		var sports_casino15= <li className="nav-item"><a href="/casino/dt-one-day" className="nav-link"><span className="newlacunch-menu">Dragon Tiger</span></a></li> 
		var sports_casino16= <li className="nav-item"><a href="/casino/card32a" className="nav-link">32 Cards</a></li>
		var sports_casino17= <li className="nav-item "><a href="/matches/poker" className="nav-link"><span className="newlacunch-menu">Poker</span></a></li> 
		var sports_casino18= <li className="nav-item"><a href="casino/andar-bahar" className="nav-link">Andar Bahar</a></li>
		var sports_casino19= <li className="nav-item"><a href="/casino/worli2" class="nav-link"><span className="newlacunch-menu">Instant Worli</span></a></li>
}

  
    return (

<ul className="sidebar navbar-nav">
<li>
<div data-toggle="collapse" data-target=".casino" className="sidebar-title all_sp" aria-expanded="true">
          Others
        </div>
        <nav className="casino collapse show" >
		<ul class="left_ul">
		 {sports_casino1}
		 {sports_casino2}
		 {sports_casino3}
		 {sports_casino4}
		 {sports_casino5}
		 {sports_casino6}
		 {sports_casino7}
		 {sports_casino8}
		 {sports_casino9}
		 {sports_casino10}
		 {sports_casino11}
		 {sports_casino12}
		 
		 {sports_casino13}
		 {sports_casino14}
		 {sports_casino15}
		 {sports_casino16}
		 {sports_casino17}
		 {sports_casino18}
		 {sports_casino19}
		
		</ul>
		</nav>
				</li>
<li class="nav-item all_sp" data-toggle="collapse" data-target=".casino2" className="sidebar-title all_sp" aria-expanded="true">
          All Sports
      </li>
				<li className="casino2 collapse show" >
					<ul className="tree">
						
						<li>
              Cricket
              <div className="expander"  id="cricket" onClick={this.handleSubmit}/>
            {this.showTableHtml()}
            </li>
            <li>
              Football
              <div className="expander" id="Soccer" onClick={this.handleSubmitSoccer}/>
            {this.showTableHtmlSoccer()}
            </li>


			<li>
			Tennis
              <div className="expander" id="tennis" onClick={this.handleSubmitTennis}/>
            {this.showTableHtmlTennis()}
            </li>
			
		   {sports_casino21}
		 {sports_casino22}
		 {sports_casino23}
		 {sports_casino24}
		 {sports_casino25}
		 {sports_casino26}
		 {sports_casino27}
		 {sports_casino28}
		 {sports_casino29}
		 {sports_casino30}
		 {sports_casino31}
		 {sports_casino32}
		   
			 



					</ul>
				</li>
			</ul>
				
    );
  }
}

export default Sidebar;