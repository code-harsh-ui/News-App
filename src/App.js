import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import NewsContainer from './components/NewsContainer';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

//? To use react-top-loading-bar first we need to install npm package using this command
//! npm i react-top-loading-bar --force

// Then we need to import the component from package.json file
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  // Here in state we have only one object which is "progress" and we can create states without constructor as well when we don't require to executes "states" before render method  

  state = { progressState: 0 }

  // Here we have a function named "setProgress" which have a parameter "progressPara" in this function we are updating the state value "progressState" from the value which we'll get from the parameter "progressPara"
  setProgress = (progressPara) => {
    this.setState({ progressState: progressPara })

  }

  render() {
    return (
      <>
        <Router>
          <NavBar />
          {/* Here we have top loading bar component which we bring from npm package and in this component we are passing some props in which we have a "progress" props in this props we are passing the value of state "progressState" value should be in "number" format */}
          <LoadingBar
            //! Remember this prop name "color" is alsp predefined
            color='#f11946' // string
            //! Remember this prop name "progress" for npm package is predifined
            progress={this.state.progressState} // number
            //! Remember this prop name "height" for npm package is predifined
            height={7} // number
          />
          <Routes>
            <Route path="/"
              //! In this "NewsContainer" component we are passing a function props "setProgress"
              element={<NewsContainer progressProp={this.setProgress} key='general' category='general' />}
            />
            <Route path="/business"
              element={<NewsContainer progressProp={this.setProgress} key='business' category='business' />}
            />
            <Route path="/entertainment"
              element={<NewsContainer progressProp={this.setProgress} key='entertainment' category='entertainment' />}
            />
            <Route path="/general"
              element={<NewsContainer progressProp={this.setProgress} key='general' category='general' />}
            />
            <Route path="/health"
              element={<NewsContainer progressProp={this.setProgress} key='health' category='health' />}
            />
            <Route path="/science"
              element={<NewsContainer progressProp={this.setProgress} key='science' category='science' />}
            />
            <Route path="/sports"
              element={<NewsContainer progressProp={this.setProgress} key='sports' category='sports' />}
            />
            <Route path="/technology"
              element={<NewsContainer progressProp={this.setProgress} key='technology' category='technology' />}
            />
          </Routes>
        </Router>
      </>
    )
  }
}



