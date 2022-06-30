import './App.css';


import React, { Component } from 'react' // for class component

// Here we are creating a basic class based component using the snippet "rcc"

export default class App extends Component {
  // We can also create a class variable and use it in the component using "this.variableName"
  name = "Holden"
  render() {
    return (
     <>
     <div>This is the first class based Component {this.name}</div>
     </>
    )
  }
}
