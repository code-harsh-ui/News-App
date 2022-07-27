import './App.css';


import React, { Component } from 'react'
import NavBar from './components/NavBar';
import NewsContainer from './components/NewsContainer';

//*----------- Routing --------------
// To use routing first we need install react-router-dom using the command 
// >> "npm install react-router-dom" <<
// Then we can import Router, Routes and Route to use routing

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <>
        {/* It's important wrap everythig in "Router" tag to use routing */}
        <Router>
          <NavBar />
          {/* Then we'll use "Routes" this is an alternative of switch in new upgraded version of react */}
          <Routes>
            {/* //! In these route path if click there is no change in category it means routing will not remount the component because we have same component in all paths so we need to remount these forcefully when we clicked on any of these categories to do that we use "key" to identify the components uniquely
            
            or

            //! we can just leave the anchor tag as it is in NavBar.js file where we used 'Link' and 'to'
            
            */}
            <Route path="/"
              element={<NewsContainer key='general' category='general'/>}
            />
            <Route path="/business"
              element={<NewsContainer key='business' category='business'/>}
            />
            <Route path="/entertainment"
              element={<NewsContainer key='entertainment' category='entertainment'/>}
            />
            <Route path="/general"
              element={<NewsContainer key='general' category='general'/>}
            />
            <Route path="/health"
              element={<NewsContainer key='health' category='health'/>}
            />
            <Route path="/science"
              element={<NewsContainer key='science' category='science'/>}
            />
            <Route path="/sports"
              element={<NewsContainer key='sports' category='sports'/>}
            />
            <Route path="/technology"
              element={<NewsContainer key= 'technology' category='technology'/>}
            />
          </Routes>
        </Router>
      </>
    )
  }
}



