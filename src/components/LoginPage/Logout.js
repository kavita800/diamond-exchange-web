import React, { Component } from 'react';
import Header from '../Header/Header';
import {Link,Redirect} from "react-router-dom";
import axios from "axios";
import Moment from 'moment';  

class Index extends Component {
  constructor(props){
    super(props); 
      
  } 
  componentDidMount() { 
    localStorage.clear();
    window.location='Login';
} 
  render() { 
    return (
      <div> 
      </div>
    );
  }
}

export default Index;
