import React from 'react'
import Card from './Card'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

// To use "states" like we did in class based component we need to import "useState" from react
import { useState } from 'react';

// And we import "useEffect" as well it is an alternative of componentDidMount
import { useEffect } from 'react'; 


// Here we changed "class based component" into function based component

function NewsContainer(props) {

  // In function based component we need to use "const" while creating variable
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Now we don't require "constructor" in function based component instead we use "useState" method to define initial value of states
  const [newsData, setNewsData] = useState([])
  // const [loading, setLoading] = useState(false) 
  const [page, setPage] = useState(1)
  const [totalResults, settotalResults] = useState(1)
  // As we know we do not require "this" keyword while calling any function in "function based componenet"
  document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`


  const updateNews = async ()=>{
    props.progressProp(30)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    // setLoading(true) 
    let data = await fetch(url)
    let parsedData = await data.json()
    props.progressProp(70)

        setNewsData(parsedData.articles)
        settotalResults(parsedData.totalResults)
        // setLoading(false) 
    
    props.progressProp(100)
  }

  // Here we are using 'useEffect' it is an alternative of "componentDidMount" in function based component
 useEffect(() => {
  updateNews() // so basically we are calling this function when our page loads using "useEffect hook"
  console.log('testing')
  //eslint-disable-next-line
 },[])
 

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
    let data = await fetch(url);
    let parsedData = await data.json();
        setNewsData(newsData.concat(parsedData.articles));
        settotalResults(parsedData.totalResults);
        setPage(page + 1);
  }

  // We removed render() method as well we do not required in function based component
  return (
    <>
      <h1 className='text-center'>NewsMonkey - {capitalizeFirstLetter(props.category)}</h1>
      <InfiniteScroll
        dataLength={newsData.length}
        next={fetchMoreData}
        hasMore={newsData.length !== totalResults}
        loader={< Spinner />}
      >
        <div className="container">
          <div className="row">
            {/* Now we don't need to use "this.state" to fetch the states as we are using 'useState' */}
            {newsData.map(function (element, index) {
              return <div key={index} className="col-md-4">
                <Card
                  title={element.title ? element.title.slice(0, 50) : "Nothing to show"}
                  description={element.description ? element.description.slice(0, 170) : "Nothing to show"}
                  imgUrl={!element.urlToImage ? 'https://pbs.twimg.com/profile_images/1108430392267280389/ufmFwzIn_400x400.png' : element.urlToImage} newsUrl={element.url}
                  publishedAt={new Date(element.publishedAt).toGMTString()}
                  author={element.author ? element.author : 'unknown'}
                  source={element.source.name}
                />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}

// In function based component we normally place prop types at the end "componentName.defaultProps" and "componentName.propTypes"

NewsContainer.defaultProps = {
  country: 'in',
  pageSize: 9,
  category: 'general'
}

NewsContainer.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default NewsContainer

