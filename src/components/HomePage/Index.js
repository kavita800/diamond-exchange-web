import React, { Component } from 'react';
import Nav from '../Include/Nav';
import Menu from '../Include/Menu';
import Footer from '../Include/footer';
import Sidebar from '../Include/Sidebar';
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Moment from 'moment'; 
import Loading from 'react-fullscreen-loading';
import {
	BrowserView,
	MobileView,
	isBrowser,
	isMobile
  } from "react-device-detect";
const $ = window.$;
const baseUrl = "http://172.105.40.76:4000"; 
class Index extends Component {

	constructor(props) {
		super(props);
		var accessToken = localStorage.getItem("token");
		this.state = { accessToken: accessToken,gotoindex:false,loading:true,session_id:"",matchData2:"" ,match_odds:""};

	} 
	goToIndex = () => {
		if (this.state.gotoindex === true) {
			return (
				<Redirect to="/matches/cricket" />
			);
		}
	}
	componentWillMount() { 
		
		
		if(window.location.href!=undefined && window.location.href!=null && window.location.href!=''){
			var currenturl=window.location.hostname;
			this.setState({currenturl:currenturl})
		
		}
		if(this.props.match.params.id===undefined){
			this.setState({gotoindex:true});
		}
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		}; 
		
		// axios.get(baseUrl + '/api/current',{headers}).then((resp) => {  
			
			// if(resp.data.session_id!=undefined){
				
			// 	this.setState({session_id:resp.data.session_id})
			// }
			$(".blockUI").show();
		this.callMattchListApi();
		setInterval(() => {this.callMattchListApiSetTimeOut()}, 4000);
		
			
		//});  
	}
	
	callMattchListApi = () => {
		/* let Postid = { 
			id: this.props.match.params.id
		};  
		 axios.post(baseUrl + '/api/totalmatchlist',Postid).then((resp) => { 
			var resp = resp.data; 
			var getResult = JSON.parse(resp.data);   
			if(resp.success===true){
				this.setState({matchData:getResult.result,matchDataFound:true});
			}    
		});  */
		this.setState({loading:true});
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		}; 
		let Postid = this.props.match.params.id;  
		console.log(Postid);
		var newvalue=""
		
		var data2234 ="";
		var data2234 ="";
		 axios.get(baseUrl + '/api/cricket_data/'+this.props.match.params.id,{headers}).then((resp) => { 
			$(".blockUI").hide();
			var hideMatchList = resp.data.hmlist;
			var resultDeclareMatchList = resp.data.resultDeclareMatchList;
			if(Postid==="tennis"){
				var data2233=JSON.parse(resp.data.showdata.tennis);
				var data2234=JSON.parse(resp.data.showdata.tennis_bookmaker);
			}
			else if(Postid==="cricket"){
				var data2233=JSON.parse(resp.data.showdata.cricket);
				var data2234=JSON.parse(resp.data.showdata.cricket_bookmaker);
			}
			else if(Postid==="soccer"){
				var data2233=JSON.parse(resp.data.showdata.soccer);
				var data2234=JSON.parse(resp.data.showdata.soccer_bookmaker);
			}
			
			
			var resp = resp.data; 
			
			
			var getResult = data2233['myArr']; 
			
			var getResult2 = data2234['myArr1'];   
			
			if(resp.success===true){
			
				this.setState({matchData:getResult,matchData2:getResult2,DataFound:true,loading:false,matchDataFound:true,hideMatchList:hideMatchList,resultDeclareMatchList:resultDeclareMatchList});
			} else{
				$(".blockUI").hide();
				this.setState({loading:false,matchDataFound:false});

			}   
		}); 
		
	}

	callMattchListApiSetTimeOut = () => {
		
		/* let Postid = { 
			id: this.props.match.params.id
		};  
		 axios.post(baseUrl + '/api/totalmatchlist',Postid).then((resp) => { 
			var resp = resp.data; 
			var getResult = JSON.parse(resp.data);   
			if(resp.success===true){
				this.setState({matchData:getResult.result,matchDataFound:true});
			}    
		});  */
		this.setState({loading:true});
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		}; 
		let Postid = this.props.match.params.id;  
		console.log(Postid);
		var newvalue=""
		
		var data2234 ="";
		var data2234 ="";
		
		 axios.get(baseUrl + '/api/cricket_data/'+this.props.match.params.id,{headers}).then((resp) => { 
			$(".blockUI").hide();
			if(Postid==="tennis"){
				var data2233=JSON.parse(resp.data.showdata.tennis);
				var data2234=JSON.parse(resp.data.showdata.tennis_bookmaker);
			}
			else if(Postid==="cricket"){
				var data2233=JSON.parse(resp.data.showdata.cricket);
				var data2234=JSON.parse(resp.data.showdata.cricket_bookmaker);
			}
			else if(Postid==="soccer"){
				var data2233=JSON.parse(resp.data.showdata.soccer);
				var data2234=JSON.parse(resp.data.showdata.soccer_bookmaker);
			}
			
			
			var resp = resp.data; 
			
			
			var getResult = data2233['myArr']; 
			
			var getResult2 = data2234['myArr1'];   
			
			if(resp.success===true){
			
				this.setState({matchData:getResult,matchData2:getResult2,DataFound:true,loading:false,matchDataFound1:true,match_odds:true});
				
				this.showTableHtml1();
			} else{
				$(".blockUI").hide();
				this.setState({loading:false,matchDataFound:false});

			}   
		}); 
		
	}
	showTableHtml1 = () =>{  
	
			console.log("!");
			var matchName =""; 
			var fancy="";
			var bookmaker ="";
			var FancyClass ="";
			var iplay ="False";
			var j =0;
			for (var a = 0; a < this.state.matchData.length; a++) {
				
				for (var b = 0; b < this.state.matchData[a].length;b++) {
					const value = this.state.matchData[a][b];
					
						let headers = {
							Authorization: "Bearer " + this.state.accessToken,
						};
						
							var newdata=[];
								
								axios.get(baseUrl + '/api/usermatchdetail/'+value.match_id+'/'+this.props.match.params.id, {headers}).then((resp) => {
									 //newdata=[];
									var getResult1 = resp.data;

if(getResult1.data!=undefined){
	if(getResult1.data.market!=undefined){
		if(getResult1.data.market[0]!=undefined){
			console.log(getResult1.data.market[0].events);
			$("#"+value.match_id+"_"+"1_first").html(getResult1.data.market[0].events[0].BackPrice1)
														$("#"+value.match_id+"_"+"2_first").html(getResult1.data.market[0].events[0].LayPrice1);
														if(getResult1.data.market[0].events[2]!=undefined){
															$("#"+value.match_id+"_"+"3_first").html(getResult1.data.market[0].events[2].BackPrice1);
														
															$("#"+value.match_id+"_"+"4_first").html(getResult1.data.market[0].events[2].LayPrice1);
														}
														
	
	
														$("#"+value.match_id+"_"+"5_first").html(getResult1.data.market[0].events[1].BackPrice1);
														
														$("#"+value.match_id+"_"+"6_first").html(getResult1.data.market[0].events[1].LayPrice1);
													
											
		}
		
	}
	
}
							// 		if(getResult1!=undefined && getResult1!=null){
							// 			Object.values(getResult1[0]).forEach(getResult => {
							// 				console.log(getResult);
									
								
							// 				if(getResult.runners!=undefined){
							// 					if(getResult.runners[0]!=undefined){
							// 						if(getResult.runners[0].ex!=undefined){
							// 							$("#"+value.match_id+"_"+"1_first").html(getResult.runners[0].ex.availableToBack[0].price)
							// 							$("#"+value.match_id+"_"+"2_first").html(getResult.runners[0].ex.availableToLay[0].price);
							// 							if(getResult.runners[2]!=undefined){
							// 								$("#"+value.match_id+"_"+"3_first").html(getResult.runners[2].ex.availableToBack[0].price);
														
							// 								$("#"+value.match_id+"_"+"4_first").html(getResult.runners[2].ex.availableToLay[0].price);
							// 							}
														
	
	
							// 							$("#"+value.match_id+"_"+"5_first").html(getResult.runners[1].ex.availableToBack[0].price);
														
							// 							$("#"+value.match_id+"_"+"6_first").html(getResult.runners[1].ex.availableToLay[0].price);
							// 						}
							// 					}
											
												
							// 				}
							// 	 //console.log(j);
								 
								
							// 	});
							
							
							// }
							
						});	 
							
						// axios.get(baseUrl + '/api/manage_data/'+value.match_id, {headers}).then((resp) => {
						// 	if(resp.data.data!=null){
						// 		if(resp.data.data.bm=="BM" && resp.data.data.status=='1'){
						// 			$("#"+resp.data.data.match_id+"_bm").addClass("bookmaker-icon");
						// 		}
						// 		if(resp.data.data.fancy=="Fancy" && resp.data.data.status_fancy=='1'){
									
						// 			$("#"+resp.data.data.match_id+"_fn").addClass("fancy-icon ");
						// 		}
						// 		if(resp.data.data.inplay=="Inplay" && resp.data.data.status_inplay=='1'){
									
						// 			$("#"+resp.data.data.match_id+"_in").addClass("active");
						// 		}
						
						// 		if(resp.data.data.tv=="Tv" && resp.data.data.status_tv=='1'){
									
						// 			$("#"+resp.data.data.match_id+"_tv").addClass("fas fa-tv");
						// 		}
						// 	}
							
						
						
						
						// });	
							
						
					
					
				
					
				
				
				j++
							
				
			
				} 
				
			
				// return  <table className="table coupon-table"><thead><tr> <th > Game</th> <th colSpan="2"> 1 </th> <th colSpan="2"> X </th><th colSpan="2"> 2 </th></tr></thead><tbody>{html}</tbody></table>;
			}
			
		
		
}
	// showTableHtml2 = () =>{  
	// 	const html = []   
	// if(this.state.matchDataFound===true){  
			
	// 		if(this.state.matchData===undefined){ 
	// 			return <center>No bet markets!</center>
	// 		}else{ 
	// 		var matchName =""; 
	// 		var fancy="";
	// 		var bookmaker ="";
	// 		var FancyClass ="";
	// 		var iplay ="False";
	// 		var j =0;
	// 		var hideMatchArr = [];
	// 		 if(this.state.hideMatchList!==null){
	// 			for(var bn=0;bn<this.state.hideMatchList.length;bn++){
	// 				hideMatchArr.push(this.state.hideMatchList[bn].event_id);
	// 			}
	// 		} 
			
			
	// 		for (var a = 0; a < this.state.matchData.length; a++) {
				
	// 			for (var b = 0; b < this.state.matchData[a].length;b++) {
	// 				const value = this.state.matchData[a][b];
					
	// 					let headers = {
	// 						Authorization: "Bearer " + this.state.accessToken,
	// 					};
					
							
							
							
	// 						var inPlayClass = iplay!="False" && iplay!=undefined && iplay!="" ? "active" :"";  
	// 						var FancyClass = fancy!=undefined && fancy!="" ? "fancy-icon" :""; 
	// 						var bookmakerClass = bookmaker!=undefined && bookmaker!="" ? "bookmaker-icon" :""; 
							
							
	// 								 if(hideMatchArr.indexOf(parseInt(value.match_id)) < 0){ 
	// 								html.push(
									
									
									
	// 									<div className="game-list pt-1 pb-1 container-fluid">
	// 									<div className="row row5">
	// 									   <div className="col-8">
	// 										  <p className="mb-0 game-name"><strong><a  href={"/matchdetail/"+value.match_id+'/'+this.props.match.params.id}>{value.match_name}</a></strong></p>
	// 										  <p className="mb-0">{Moment(value.open_date).format('lll')}</p>
	// 									   </div>
	// 									   <div className="col-4 text-right">
	// 										  <div className="game-icons2">
												 
	// 												<span  id={value.match_id+"_in"} ></span>
	// 												<span  id={value.match_id+"_bm"}></span>
	// 												<span id={value.match_id+"_fn"}></span>
	// 												<span  id={value.match_id+"_tv"}></span>
	// 										  </div>
	// 									   </div>
	// 									</div>
	// 									<div className="row row5">
	// 									   <div className="col-12 onex2">
	// 										  <div className="text-center game-col game-home"><b>1</b></div>
	// 										  <div className="text-center game-col game-home"><b>X</b></div>
	// 										  <div className="text-center game-col game-home"><b>2</b></div>
	// 									   </div>
	// 									</div>
	// 									<div className="row row5">
	// 									   <div className="col-12">
	// 										  <div className="text-center game-col game-home">
	// 											 <a href="#" className="back"> <span className="odd" id={value.match_id+"_1_first"}></span></a> 
	// 											 <a href="#" className="lay"><span className="odd" id={value.match_id+"_2_first"}></span></a>
	// 										  </div>
	// 										  <div className="text-center game-col game-home">
	// 											 <a href="#" className="back"><span className="odd" id={value.match_id+"_3_first"}></span></a> 
	// 											 <a href="#" className="lay"><span className="odd" id={value.match_id+"_4_first"}></span></a>
	// 										  </div>
	// 										  <div className="text-center game-col game-home">
	// 											 <a href="#" className="back"><span className="odd" id={value.match_id+"_5_first"}></span></a> 
	// 											 <a href="#" className="lay"><span className="odd" id={value.match_id+"_6_first"}></span></a>
	// 										  </div>
	// 									   </div> 
	// 									</div>
	// 									</div>
										
									
									
									
									
									
									
	// 								);
	// 								 } 
											
	// 							var matchName = value.name; 
						
	// 					console.log(this.state.match_odds);
						
							
									
						
	// 					var drawFirstBack =[];
	// 					 //console.log(j);
						 
						
							
							
							 
					
	// 				}
							
					
					
				
					
				
				
	// 			j++
							
				
			
	// 			} 
				
			
				
	// 		}
	// 		return <div>{html}</div> ; 
	// 	}else{
	// 		return  <div className="game-list pt-1 pb-1 container-fluid">
	// 		<div className="row row5">
	// 		   <div className="col-8">
	// 			  <p className="mb-0 game-name"></p>
	// 			  <p className="mb-0"></p>
	// 		   </div>
	// 		   <div className="col-4 text-right">
	// 			  <div className="game-icons2">
					 
					
	// 			  </div>
	// 		   </div>
	// 		</div>
	// 		<div className="row row5">
	// 		   <div className="col-12 onex2">
	// 			  <div className="text-center game-col game-home"><b>1</b></div>
	// 			  <div className="text-center game-col game-home"><b>X</b></div>
	// 			  <div className="text-center game-col game-home"><b>2</b></div>
	// 		   </div>
	// 		</div>
	// 		<div className="row row5">
	// 		   <div className="col-12">
	// 			  <div className="text-center game-col game-home">
					 
	// 			  </div>
	// 			  <div className="text-center game-col game-home">
					
	// 			  </div>
	// 			  <div className="text-center game-col game-home">
					
	// 			  </div>
	// 		   </div>
	// 		</div>
	// 		</div>
			
	// 	;
	// 	}
		
	// }
	showTableHtml = () =>{  
		const html = []   
	if(this.state.matchDataFound===true){  
			
			if(this.state.matchData===undefined){ 
				return <center>No bet markets!</center>
			}else{ 
			var matchName =""; 
			var fancy="";
			var bookmaker ="";
			var FancyClass ="";
			var iplay ="False";
			var j =0;
			var hideMatchArr = [];
			 if(this.state.hideMatchList!==null){
				for(var bn=0;bn<this.state.hideMatchList.length;bn++){
					hideMatchArr.push(this.state.hideMatchList[bn].event_id);
				}
			} 
			
			
			for (var a = 0; a < this.state.matchData.length; a++) {
				
				for (var b = 0; b < this.state.matchData[a].length;b++) {
					const value = this.state.matchData[a][b];
						
						// remove matches whose result declare
						if(this.state.resultDeclareMatchList.indexOf(parseInt(value.match_id))>= 0){
							continue;
						}
					
					
						let headers = {
							Authorization: "Bearer " + this.state.accessToken,
						};
					
							// if(this.state.matchData2[j]!=undefined){
							// 	if(this.state.matchData2[j]!=undefined && this.state.matchData2[j]!="" && this.state.matchData2[j][0]!=1 ){
									
							// 		if(this.state.matchData2[j][0].data.t1!=null){
							// 			var iplay=this.state.matchData2[j][0].data.t1[0].iplay;
							// 		}else{
							// 			var iplay="";
							// 		}
							// 		if(this.state.matchData2[j][0].data.t3!=null){
							// 			var fancy=this.state.matchData2[j][0].data.t3[0].gtype;
							// 		}
							// 		else{
							// 			var fancy="";
							// 		}
									
									
								
							// 		if(this.state.matchData2[j][0].data.t2!=null){
							// 			var bookmaker=this.state.matchData2[j][0].data.t2[0][0].mname;
							// 		}else{
							// 			var bookmaker="";
							// 		}
									
							// 	}else{
							// 		var iplay=""
							// 		var fancy=""
							// 		var bookmaker="";
							// 	}
							// }
							
							
							
							
							
							
							
							var inPlayClass = iplay!="False" && iplay!=undefined && iplay!="" ? "active" :"";  
							var FancyClass = fancy!=undefined && fancy!="" ? "fancy-icon" :""; 
							var bookmakerClass = bookmaker!=undefined && bookmaker!="" ? "bookmaker-icon" :""; 
							
							
									 if(hideMatchArr.indexOf(parseInt(value.match_id)) < 0){ 
									html.push(<tr > 
									<td key={value.match_name} id={value.match_name}> 
									<div className="game-name">
										<Link className="text-dark" to={{
											pathname:"/matchdetail/"+value.match_id+'/'+this.props.match.params.id,
											state: {
												Newdate:Moment(value.open_date).format('lll')
											
											  }
										}} key={"header"+value.match_name}>{value.match_name}/{Moment(value.open_date).format('lll')} </Link> </div> <div className="game-icons"> <span className="game-icon"> <span className={FancyClass}></span>
										
										
										 
										 
										 <span  id={value.match_id+"_in"} ></span>
										 <span  id={value.match_id+"_bm"}></span>
										 <span id={value.match_id+"_fn"}></span>
										 <span  id={value.match_id+"_tv"}></span>
										  </span></div> </td> 
										  <td> 
											  <button className="back"> 
											  <span className="odd" id={value.match_id+"_1_first"}></span>
											   </button> 
										</td> <td> <button className="lay"> 
										<span className="odd" id={value.match_id+"_2_first"}> - </span> </button> </td> 
										<td>
											 <button className="back"> 
											 <span className="odd" id={value.match_id+"_3_first"}> - </span> </button>
											 </td> 
										<td> <button className="lay"> <span className="odd" id={value.match_id+"_4_first"}> - </span> </button> </td> <td> <button className="back"> <span className="odd" id={value.match_id+"_5_first"}> - </span> </button> </td> <td> <button className="lay"> <span className="odd" id={value.match_id+"_6_first"}>- </span> </button> </td> </tr>);
									 } 
											
								var matchName = value.name; 
						
						console.log(this.state.match_odds);
						
							
									
						
						var drawFirstBack =[];
						 //console.log(j);
						 
						
							
							
							 
					
					}
							
					
					
				
					
				
				
				j++
							
				
			
				} 
				
			
				
			}
			return  <table className="table coupon-table index_table"><thead><tr> <th > Game</th> <th colSpan="2"> 1 </th> <th colSpan="2"> X </th><th colSpan="2"> 2 </th></tr></thead><tbody>{html}</tbody></table>; 
		}else{
			return  <table className="table coupon-table index_table"><thead><tr> <th > Game</th> <th colSpan="2"> 1 </th> <th colSpan="2"> X </th><th colSpan="2"> 2 </th></tr></thead><tbody><center>No real-time records found</center></tbody></table>;
		}
		
	}
	showOldTableHtml = () =>{   
	
	if(this.state.matchDataFound===true){  
			const html = []  
			if(this.state.matchData===undefined){ 
				return <center>No bet markets!</center>
			}else{ 
			var matchName =""; 
			 var inactiveMatches = this.state.matchData.inactive_matches;
			for (var a = 0; a < this.state.matchData.matchlist.length; a++) {
				//for (var b = 0; b < this.state.matchData[a].length; b++) {
					
				//const value = this.state.matchData[a][b].event;
				const value = this.state.matchData.matchlist[a].event;
					if(value.name.includes(" v ") && inactiveMatches.indexOf(parseInt(value.id)) < 0) {
					var inPlayClass = "";  
						html.push(<tr > 
						<td key={value.name} id={value.name}> 
						<div className="game-name"> <Link className="text-dark" to={"/matchdetail/"+value.id} key={"header"+value.name}>{value.name} / {Moment(value.openDate).format('lll')} (IST)</Link> </div> <div className="game-icons"> <span className="game-icon"> <span className={inPlayClass}></span> </span></div> </td> <td> <button className="back"> <span className="odd"> - </span> </button> </td> <td> <button className="lay"> <span className="odd"> - </span> </button> </td> <td> <button className="back"> <span className="odd"> - </span> </button> </td> <td> <button className="lay"> <span className="odd"> - </span> </button> </td> <td> <button className="back"> <span className="odd"> - </span> </button> </td> <td> <button className="lay"> <span className="odd">- </span> </button> </td> </tr>);
					}							
					var matchName = value.name; 
				//}					
			} 

				return  <table className="table coupon-table"><thead><tr> <th > Game</th> <th colSpan="2"> 1 </th> <th colSpan="2"> X </th><th colSpan="2"> 2 </th></tr></thead><tbody>{html}</tbody></table>;
			} 
		}
		
	}


	render() {
		var accessToken = this.state.accessToken;
		

		var session_id=localStorage.getItem("session_id")
		if (accessToken === "" || accessToken === null) {
			return (
				<Redirect to="/login" />
			);
		} 
		var change_password=localStorage.getItem("change_password")
		if (change_password!="" && change_password!=null) {
			return (
				<Redirect to="/change_password" />
			);
		}
		
		var popupdta ="";
		if(localStorage.getItem("popup")==1)
		{
			var popupdta=<div className="popop_boxman wow zoomIn animated "  data-wow-delay="0.1s">
			<div className="popop_box">
			<div className="popop_header">
			<span id="close">x</span>
			</div>
            <img className="img-fluid" src="/img/popup21dim.jpg" /> 
			</div>
		   </div> 
		   localStorage.setItem("popup",2);
		}

if(this.state.currenturl==='demandexch99.com'){
	var htmlData123 =<div className="row game_img_man">
<div className="col-12"><h4 className="hadding2">Live Casino</h4></div>
<div className="col-3 col-sm-2">
		<a href="/casino/dt20" className="game_img"><img src="/img/tt14.jpg" className="img-fluid" /> <div className="casino-name">20-20 Dragon Tiger</div></a>
	  </div>
	  <div className="col-3 col-sm-2">
		<a href="#" className="game_img"><img src="/img/tt2.jpg" className="img-fluid" /> <div className="casino-name">20-20 Poker</div></a>
	  </div>
	  <div className="col-3 col-sm-2">
		<a href="/casino/teen-patti-t20" className="game_img"><img src="/img/tt1.jpg" className="img-fluid" /> <div className="casino-name">20-20 Teenpatti</div></a>
	  </div>
	  <div className="col-3 col-sm-2">
	<a  href="/casino/ab2" className="game_img"><img src="/img/andar-bahar2.jpg" className="img-fluid" /> <div className="casino-name">Andar Bahar 2</div>
	</a></div>
	<div className="col-3 col-sm-2">
          <a href="/casino/one-day-teenpatti" className="game_img"><img src="/img/tt1.jpg" className="img-fluid" /> <div className="casino-name">one day teenpatti</div></a>
        </div>
		<div className="col-3 col-sm-2">
          <a href="/casino/card32a" className="game_img"><img src="/img/tt10.jpg" className="img-fluid" /> <div className="casino-name">32 Cards A</div></a>
        </div>
		<div className="col-3 col-sm-2">
          <a href="/casino/worli2" className="game_img"><img src="http://heroexch.com/storage/front/img/casinoicons/img/worli.jpg" className="img-fluid" /> <div className="casino-name">Instant Worli</div></a>
        </div>
	</div>
	
}else{
	var htmlData123 =
	



  
	<div className="row game_img_man">
	<div className="col-12"><h4 className="hadding2">Live Casino</h4></div>
        <div className="col-3 col-sm-2">
          <a href="/casino/ab2" className="game_img"><img src="/img/andar-bahar2.jpg" className="img-fluid" /> <div className="casino-name">Andar Bahar 2</div>
          </a></div>
        <div className="col-3 col-sm-2">
          <a href="/luckyseven" className="game_img"><img src="/img/lucky7eu.jpg" className="img-fluid" /> <div className="casino-name">Lucky 7 - B</div></a></div>
        <div className="col-3 col-sm-2">
          <a href="/casino/teen-patti-t20" className="game_img"><img src="/img/tt1.jpg" className="img-fluid" /> <div className="casino-name">20-20 Teenpatti</div></a>
        </div>
		{/*<div className="col-3 col-sm-2">
          <a href="/casino/poker20" className="game_img"><img src="/img/tt2.jpg" className="img-fluid" /> <div className="casino-name">20-20 Poker</div></a>
</div>*/}
        <div className="col-3 col-sm-2">
          <a href="/casino/andar-bahar" className="game_img"><img src="/img/tt6.jpg" className="img-fluid" /> <div className="casino-name">Andar Bahar</div></a>
        </div>
        <div className="col-3 col-sm-2">
          <a href="/casino/card32a" className="game_img"><img src="/img/tt10.jpg" className="img-fluid" /> <div className="casino-name">32 Cards A</div></a>
        </div>
        <div className="col-3 col-sm-2">
          <a href="/casino/card32b" className="game_img"><img src="/img/tt11.jpg" className="img-fluid" /> <div className="casino-name">32 Cards B</div></a>
        </div>
        <div className="col-3 col-sm-2">
          <a href="/casino/aaa" className="game_img"><img src="/img/tt12.jpg" className="img-fluid" /> <div className="casino-name">Amar Akbar Anthony</div></a>
        </div>
        <div className="col-3 col-sm-2">
          <a href="/casino/dt20" className="game_img"><img src="/img/tt14.jpg" className="img-fluid" /> <div className="casino-name">20-20 Dragon Tiger</div></a>
        </div>
        <div className="col-3 col-sm-2">
          <a href="/casino/dt-one-day" className="game_img"><img src="/img/tt14.jpg" className="img-fluid" /> <div className="casino-name">1 Day Dragon Tiger</div></a>
        </div>
        <div className="col-3 col-sm-2">
          <a href="/luckysevena" className="game_img"><img src="/img/tt17.jpg" className="img-fluid" /> <div className="casino-name">Lucky 7 - A</div></a>
        </div>
        <div className="col-3 col-sm-2">
          <a href="/casino/one-day-teenpatti" className="game_img"><img src="/img/tt1.jpg" className="img-fluid" /> <div className="casino-name">1 day teenpatti</div></a>
        </div>
        <div className="col-3 col-sm-2">
          <a href="/casino/worli2" className="game_img"><img src="http://heroexch.com/storage/front/img/casinoicons/img/worli.jpg" className="img-fluid" /> <div className="casino-name">Instant Worli</div></a>
        </div>
      </div>

	 






}
		







		return (
			<div>
				<BrowserView>
    


				{/* <img src="/img/ajax-loader.gif" /> */}
			{this.goToIndex()}
				<Nav />
				<Menu />
				<div className="blockUI blockMsg blockPage"   ><div className="loading-hold" id="overlay"> <div className="loaderGif"> </div> </div></div>
				<div id="wrapper"> 
					<Sidebar />
					<div id="content-wrapper">
						<div className="container-fluid">
<ul role="tablist" id="home-events" className="nav nav-tabs">
        <li className="nav-item"><a href="/matches/soccer" className="nav-link">Football</a></li>
        <li className="nav-item"><a href="/matches/tennis" className="nav-link">Tennis</a></li>
        <li className="nav-item"><a href="/matches/cricket" className="nav-link">Cricket</a></li>
        <li className="nav-item"><a  href="/matches/Ice-Hockey" className="nav-link">Ice Hockey</a></li>
        <li className="nav-item"><a href="/matches/volleyball" className="nav-link">Volleyball</a></li>
        <li className="nav-item"><a href="/matches/basketball" className="nav-link">Basketball</a></li>
        <li className="nav-item"><a href="/matches/table-tennis" className="nav-link">Table Tennis</a></li>
        <li className="nav-item"><a  href="/matches/Darts" className="nav-link">Darts</a></li>
        <li className="nav-item"><a  href="/matches/Badminton" className="nav-link">Badminton</a></li>
        <li className="nav-item"><a href="/matches/Kabaddi" className="nav-link">Kabaddi</a></li>
        <li className="nav-item"><a  href="/matches/Boxing" className="nav-link">Boxing</a></li>
        <li className="nav-item"><a href="/matches/Mixed-Martial-Arts" className="nav-link">Mixed Martial Arts</a></li>
        <li className="nav-item"><a href="/matches/Motor-Sport" className="nav-link">Motor Sport</a></li>
</ul>

						
							<div className="tab-content">
								<div id="home" className="tab-pane active">
									<br />
									<div className="coupon-card coupon-card-first">
										<div className="card-content" id="home_match_data">
										<div className="table-responsive">
										{this.showTableHtml()} 
										</div>
										</div>
									</div>
								</div>
								</div>
							
	
						
						
								
						{htmlData123}
       {popupdta}
			
			
			
			
			
			
          
		 
        </div>
		
					</div>

				</div>
				</BrowserView>
				<MobileView>
				<Nav />
				<Menu />
				
				<div id="content-wrapper">
   <div className="home_mobile">
      
      <div className="tab-content">
         <div className="mobile_scrool">
           
            <div className="coupon-card coupon-card-first">
               <div className="card-content" id="home_match_data">
			   
			
			   {this.showTableHtml()} 
				 
				 </div>
            </div>
         </div>
	
		 {popupdta}
		 {htmlData123}
	   
	   
	   
	   
	   
	
      </div>
      <div>
      </div>
   </div>
</div>
				</MobileView>
				<Footer/>
			</div>
		);
	}
}

export default Index;