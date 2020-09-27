import React, { Component } from 'react';
import Header from '../Header/Header';
import {Link,Redirect} from "react-router-dom";
import axios from "axios";
import Moment from 'moment';
import Url from "../configure/configure.js";
import Nav from '../Include/Nav';
import Footer from '../Include/footer';
import Menu from '../Include/Menu';
import loadjs from 'loadjs';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
import DataTable from 'react-data-table-component';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const baseUrl = Url.baseUrl;

const $ = require('jquery');
const columns = [{
  dataField: 'id',
  text: 'Product ID'
}];

class Receive extends Component {
	
  constructor(props) {
    super(props);
	var accessToken = localStorage.getItem("token");
    this.state = {accessToken:accessToken,tabledata:"",respStatus:false,
    startDate: new Date(),
    endDate: new Date(),
    responsedData:[],
    html11:"",
    q:""
   };
   
   this.changeFormat = this.changeFormat.bind(this);
   
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

 handleSubmit =(event) => {
   let headers={
      Authorization:"Bearer "+ this.state.accessToken,
   }; 
   let sendData={
      startDate:this.state.startDate,
      endDate:this.state.endDate,
      q:this.state.q
      
    }; 
   event.preventDefault(); 
   axios.post(baseUrl + '/transactions',sendData, {headers}).then((resp) => {
      //this.handleModal("close");
   var respNew = resp.data;
   if(respNew.success === true){

      this.setState({tabledata:respNew.showdata,respStatus:respNew.success });
      this.changeFormat(respNew.showdata);
   }else{
      
      var newarry =[];
     
      this.changeFormat(newarry);
   }
   });
 }







  componentWillMount() {


        // setting header
         let headers={
            Authorization:"Bearer "+ this.state.accessToken,
        }; 

        axios.get(baseUrl + '/transactions', {headers}).then((resp) => {
            //this.handleModal("close");
			var respNew = resp.data;
			if(respNew.success === true){

            this.setState({tabledata:respNew.showdata,respStatus:respNew.success });
            this.changeFormat(respNew.showdata);
			}else{
            console.log(newarry);
            var newarry =[];
            this.changeFormat(newarry);
         }
      });
      
  }
  
  changeFormat = (arr) =>{
  
   
   let html = [];
		 if(arr!=''){
         
         console.log(this.state.tabledata);
         
            var newdata=arr;
            let amount =0;
             newdata.map(function(value, i){
               let credit="";
               let debit="";
             
                amount = value.amount ? amount+value.amount : ``;
              
               if (value.amount > 0) {
                   credit=value.amount
               }else{
                   debit=value.amount
               }



               var obj = {
                  date:Moment(value.createdDate).format('lll'),
                  s_no: i+1,
                  credit:credit,
                  debit: debit,
                  amount: amount,
                 
                  remark:value.remark,
                 
                }
                console.log(obj);
                html.push(obj);
                
             
               
              
    }); 
    this.setState({html11:html})
              
       }else{
         this.setState({html11:[]})
       }
       
      
	  
  }
  handleChange = (event)=> {
   this.setState({q:event.target.value})

  };
  render() {
	var accessToken = this.state.accessToken;
   
	if(accessToken==="" || accessToken===null){
		return(
				<Redirect to="/login" />
				);
   }
   var change_password=localStorage.getItem("change_password")
   if (change_password!=""  && change_password!=null) {
      return (
         <Redirect to="/change_password" />
      );
   }
   const data  = "";
   
   
   console.log();
    return (
	<div>
	
   <div>
				<Nav />
				<Menu />
				<div id="wrapper">
					<ul className="sidebar navbar-nav">
					{/*<li className="nav-item all_sp">
							<span>All Sports</span>
	</li>*/}
						<li>
							<ul className="tree">
								<li className="">
									<a href="/4" style={{ color: "black" }}>  Home</a>
								</li>
								<li className="nav-item nav-link">
									<a href="/4" style={{ color: "black" }}> Cricket</a>
								</li>
								<li className="nav-item nav-link">
									<a href="/2" style={{ color: "black" }}>Tennis</a>
								</li>
								<li className="nav-item nav-link">
									<a href="/1" style={{ color: "black" }}>Football</a>
								</li>
								<li className="nav-item nav-link">
									<a href="/7" style={{ color: "black" }}> Horse Riding</a>
								</li>
							</ul>
						</li>
					</ul>
					<div id="content-wrapper">
						<div className="container-fluid re_man_p0">
						
						<div className="card">
						<div className="card-header breadcrumb">
						Account Statement
						</div>
                  <div className="card-body">
                     <form onSubmit={this.handleSubmit}>
                        <div className="row">
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
                        <DatePicker className="form-control"
        selected={this.state.endDate}
        onChange={this.handleChange1}
      />
                           <i className="fas fa-calendar-alt"></i>
                        </div>
                        </div>
						<div className="col-12 col-md-2">
                        <div className="select-report  form-group">
                           <select id="bind_opt_select" className="form-control" name="q"  onChange={this.handleChange} >
                              <option value="1" selected="selected">All</option>
                              <option value="2">Deposite/Withdrow Report</option>
                              <option value="3">Game Report</option>
                           </select>
                        </div>
                        </div>
                        <div className=" col-12 col-md-2">
                           <button className="btn btn-primary modb" value="submit" type="submit">Submit</button>
                        </div>
                       
                        </div>
                     </form>
                     <div className="table-responsive rowp0 dot_table">
                        <div id="account-statement_wrapper " className="dataTables_wrapper ">
                          
                           
                                
                                 <BootstrapTable                
                              data={this.state.html11} 
                              striped={true} 
                              hover={true}
                              pagination 
                              ignoreSinglePage
                              search  searchPlaceholder='input something...'
                            >
                             
                              <TableHeaderColumn dataField="date"   isKey={true}>
                              Date
                              </TableHeaderColumn>
                              <TableHeaderColumn dataField="s_no" >
                              Sr No.
                              </TableHeaderColumn>
                              <TableHeaderColumn dataField="credit"   >
                              Credit
                              </TableHeaderColumn>
                              <TableHeaderColumn dataField="debit" >
                              Debit
                              </TableHeaderColumn>
                              
                              <TableHeaderColumn dataField="amount" >
                              Balance
                              </TableHeaderColumn>
                              <TableHeaderColumn dataField="remark" >
                              Remark
                              </TableHeaderColumn>
                          </BootstrapTable>
                      
                             
                          </div>
                     </div>
                  </div>
               </div>
						</div>
					</div>
				</div>
			</div><Footer/>
		
	

	
	</div>
	
    );
  }
}

export default Receive;
