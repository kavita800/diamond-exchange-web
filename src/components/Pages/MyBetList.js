import React, { Component } from 'react';
import Nav from '../Include/Nav';
import Menu from '../Include/Menu';
import Footer from '../Include/footer';
import Sidebar from '../Include/Sidebar';
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Moment from 'moment'; 
import DataTable, { createTheme } from 'react-data-table-component';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const $ = window.$;
const baseUrl = "http://172.105.40.76:4000"; 



createTheme('solarized', {
  text: {
    primary: '#268bd2',
    secondary: '#2aa198',
  },
  background: {
    default: '#002b36',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#073642',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
});

const columns = [
  {
    name: 'Event Name',
    selector: 'event_name',
	sortable: true
  },
  {
    name: 'Nation',
    selector: 'team_name',
	sortable: true
  }, 
  {
    name: 'Bet Type',
    selector: 'bet_type',
	sortable: true
  }, 
  {
    name: 'User Rate',
    selector: 'odds',
	sortable: true
  }, 
  
  {
    name: 'Amount',
    selector: 'stake',
	sortable: true
  }, 
  
  
  {
    name: 'Profit/Loss',
    selector: 'remark',
	sortable: true
  },{
    name: 'Place Date',
    selector: 'created',
	sortable: true
  },
  {
    name: 'Match Date',
    selector: 'matchDate',
	sortable: true
  },

  
  {
    name: 'Delete Bet',
    selector: 'delete',
	sortable: true
  },
];


class MyBetList extends Component {

	constructor(props) {
		super(props);
		var accessToken = localStorage.getItem("token");
		this.state = { accessToken: accessToken,
						betDataFound:false ,
						gotoindex:false ,
						getResults11:"",
						startDate: new Date(),
						endDate: new Date(),
					};

	} 
	goToIndex = () => {
		if (this.state.gotoindex === true) {
			return (
				<Redirect to="/matches/4" />
			);
		}
	}
	componentWillMount() { 
		this.callMyBetList();
		
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		}; 
		axios.get(baseUrl + '/api/current',{headers}).then((resp) => {  
				
		});  
	}
	
	handleSubmit =(event) => {
		let headers={
		   Authorization:"Bearer "+ this.state.accessToken,
		}; 
		let sendData={
		   startDate:this.state.startDate,
		   endDate:this.state.endDate,
		   event_type:this.state.event_type,
		   type_data:this.state.type_data,
		   
		 }; 
		event.preventDefault(); 
		axios.post(baseUrl + '/api/userbetlist_new',sendData, {headers}).then((resps) => {
		   //this.handleModal("close");
		var respNew = resps.data;
		
		if (respNew.success === true) {
			this.setState({ getResults: respNew.showdata, betDataFound: true });
		}else{
			this.setState({ getResults: []});
		}
		
		});
	  }

	  handleChange111 = date => {
		this.setState({
		  startDate: date
	 
		});
	  };
	  handleChange1 = date => {
		this.setState({
		 endDate: date
		  
		});
	  };
	  handleChange = (event)=> {
		this.setState({event_type:event.target.value})
	 
	   };
	   handleChange123 = (event)=> {
		this.setState({type:event.target.value})
	 
	   };
	callMyBetList=()=>{
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		}; 
		axios.get(baseUrl + '/api/userbetlist_new', { headers }).then((resp) => {
			var resps = resp.data;

			if (resps.success === true) {
				this.setState({ getResults: resps.Betlist, betDataFound: true });
			}
		});
		
	}
	deleteBet=(event_id)=>{
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		}; 
		axios.get(baseUrl + '/api/delete_bet_list/'+event_id, { headers }).then((resp) => {
			var resps = resp.data;

		
				this.setState({ getResults11: resps.message });
			
		});
		
	}
	showTableHtml = () => {
		if (this.state.betDataFound === true) {
			const html = [];
			console.log(this.state.getResults);
			for(var i=0;i<this.state.getResults.length;i++) {
			 
				 var value = this.state.getResults[i];
				
				var mainHtml = {event_name:value.event_name,
					team_name:value.team_name,
								bet_type:value.bet_type,
								odds:value.odds,
								stake:value.stake,
								remark:value.remark,
								
								
								created:Moment(value.createdDate).format('lll'),
								matchDate:value.matchDate?Moment(value.matchDate).format('lll'):"",
								delete:<button value={value.id} onClick={e => this.submit(e)}>Delete Bet</button>
								}
				
				html.push(mainHtml);
			} 
			
			
			return  <DataTable  columns={columns} data={html} pagination={true} />;
		}
	}
	//this.deleteBet(e.target.value)
	submit = (e) => {
		var value=e.target.value;
		confirmAlert({
		  title: 'Confirm to submit',
		  message: 'Are you sure to do this.',
		  buttons: [
			{
			  label: 'Yes',
			  onClick: () => this.deleteBet(value)

			},
			{
			  label: 'No',
			  
			}
		  ]
		});
	  };


	render() {
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
		return (
			<div>
			{this.goToIndex()}
				<Nav />
				<Menu />
				<div id="wrapper"> 
					
					<div id="content-wrapper">
						<div className="container-fluid re_man_p0">  
							
					   <div className="card">
					    <div className="card-header breadcrumb">Bet History</div>
						  <div className="card-body">
						  <form onSubmit={this.handleSubmit}>
						   <div className="row">
				          
						<div className="col-6 col-md-2">
                        <div className="select-report  form-group">
                           <select id="bind_opt_select" className="form-control"  name="event_type"  onChange={this.handleChange} >
                              <option value="" >Please Select</option>
                              <option value="soccer">Football</option>
                              <option value="tennis">Tennis</option>
							  <option value="cricket">Cricket</option>
                           </select>
                        </div>
                        </div>
						<div className="col-6 col-md-2">
						<div className="select-report  form-group">
                           <select id="bind_opt_select" className="form-control"  name="type_data"  onChange={this.handleChange123} >
                              <option value="" >Please Select</option>
                              <option value="match">Match</option>
							  <option value="delete">Deleted</option>
                           </select>
                        </div>
                        </div>
						
						 <div className="col-6 col-md-2">
                        <div className="datepicker-wrapper form-group">
                        <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange111}
      />
                           <i className="fas fa-calendar-alt"></i>
                        </div> 
                        </div>
						
                       <div className=" col-md-111 re_none tc mt-2 ">
						<span className="">to</span> 
                        </div> 
						
						<div className="col-6 col-md-2">
                        <div className="datepicker-wrapper form-group">
                        <DatePicker
        selected={this.state.endDate}
        onChange={this.handleChange1}
      />
                           <i className="fas fa-calendar-alt"></i>
                        </div>
                        </div>
						
                        <div className=" col-md-2">
                           <button className="btn btn-primary modb" value="submit" type="submit">Submit</button>
                        </div>
                        </div>
                     </form>
								{this.state.getResults11}
									
									<div className="coupon-card coupon-card-first">
										<div className="" id="home_match_data">
										{this.showTableHtml()} 
										</div>
									</div>
								
								</div>
							</div>
								
							
							<div></div>
						</div>
					</div>

				</div><Footer/>
			</div>
		);
	}
}

export default MyBetList;