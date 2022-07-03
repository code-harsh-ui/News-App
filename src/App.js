import './App.css';


import React, { Component } from 'react'
import NavBar from './components/NavBar'; 
import NewsContainer from './components/NewsContainer';

export default class App extends Component {
  render() {
    return (
     <>
     <NavBar/>
     {/* Here we are sending props to NewsContainer component to set page size as we know pageSize allows to show a desired number of items in the webpage fetched from an api */}
     <NewsContainer pageSize = {3}/>
     </>
    )
  }
}



