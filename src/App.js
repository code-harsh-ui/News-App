import './App.css';


import React, { Component } from 'react' // for class component
import NavBar from './components/NavBar'; // for Navbar component
import NewsContainer from './components/NewsContainer'; // for NewsContainer component

// Here we are creating a basic class based component using the snippet "rcc"

export default class App extends Component {
  render() {
    return (
     <>
     <NavBar/>
     <NewsContainer/>
     </>
    )
  }
}



