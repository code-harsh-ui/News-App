import './App.css';
// Removing the "component" hook because now we are using function based component
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import NewsContainer from './components/NewsContainer';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


import LoadingBar from 'react-top-loading-bar'

// Now we have converted this file into function based component

function App (props) { 
 const apiKey = process.env.REACT_APP_NEWS_API 

 // Here we have removed the function called setProgres now we are using useState to set initial state of progresState
 const [progressState, setProgessState] = useState(0)


    return (
      <>
        <Router>
          <NavBar />
          <LoadingBar
            color='#f11946' // string
            progress={progressState} // number
            height={7} // number
          />
          <Routes>
            <Route path="/"
              element={<NewsContainer progressProp={setProgessState} apiKey = {apiKey} key='general' category='general' />}
            />
            <Route path="/business"
              element={<NewsContainer progressProp={setProgessState} apiKey = {apiKey} key='business' category='business' />}
            />
            <Route path="/entertainment"
              element={<NewsContainer progressProp={setProgessState} apiKey = {apiKey} key='entertainment' category='entertainment' />}
            />
            <Route path="/general"
              element={<NewsContainer progressProp={setProgessState} apiKey = {apiKey} key='general' category='general' />}
            />
            <Route path="/health"
              element={<NewsContainer progressProp={setProgessState} apiKey = {apiKey} key='health' category='health' />}
            />
            <Route path="/science"
              element={<NewsContainer progressProp={setProgessState} apiKey = {apiKey} key='science' category='science' />}
            />
            <Route path="/sports"
              element={<NewsContainer progressProp={setProgessState} apiKey = {apiKey} key='sports' category='sports' />}
            />
            <Route path="/technology"
              element={<NewsContainer progressProp={setProgessState} apiKey = {apiKey} key='technology' category='technology' />}
            />
          </Routes>
        </Router>
      </>
    )
 
}

export default App



