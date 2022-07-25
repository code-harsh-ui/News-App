import './App.css';


import React, { Component } from 'react'
import NavBar from './components/NavBar'; 
import NewsContainer from './components/NewsContainer';

export default class App extends Component {
  render() {
    return (
     <>
     <NavBar/>
     {/* //! Here we have used propTypes and defaultProps in NewsContainer component file that is why we have'nt used or passed any props here */}
     <NewsContainer/>
     </>
    )
  }
}



