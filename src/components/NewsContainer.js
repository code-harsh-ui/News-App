import React, { Component } from 'react'
import Card from './Card'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

//? To use infinite scroll first we need to instal npm package 
//! npm i react-infinite-scroll-component 
// then we need to import the component from react-infinite-scroll-component
import InfiniteScroll from "react-infinite-scroll-component";


export class NewsContainer extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      newsData: [],
      loading: false,
      page: 1,
      totalResults: 1,
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
  }



  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cfe6186e249941bab158966357415194&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState(
      {
        newsData: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
      }
    )
    // console.log(this.state.newsData.length) // 9 because pageSize is 9
    // console.log(this.state.totalResults) // 9 because pageSize is 9
  }

  async componentDidMount() {
    this.updateNews()
  }

  // This fetchMoreData function being called in infiniteScroll component and in this function we are concating the more data

  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cfe6186e249941bab158966357415194&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState(
      {
        //! Here we are adding the next data in previous data using concat method
        newsData: this.state.newsData.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        page: this.state.page + 1
      }
    )

    // console.log(this.state.newsData.length) 
  }

  render() {
    return (
      <>
        <h1 className='text-center'>NewsMonkey - {this.capitalizeFirstLetter(this.props.category)}</h1>
        {/* Here we have used infiniteScroll component which is get from npm package */}
        <InfiniteScroll
          dataLength={this.state.newsData.length}
          next={this.fetchMoreData}
          // this condition state that if the newsData length is not equal to totalResults then return "true" or else "false"
          // And if this props "hasMore" contains "true" it means it have more data left
          hasMore={this.state.newsData.length !== this.state.totalResults}
          // Here we are using our "spinner" component in loader
          loader={< Spinner />}
        >
          <div className="container">
            <div className="row">
              {/* Here we are using second parameter to the "key" property uniquely */}
              {this.state.newsData.map(function (element, index) {
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
}

export default NewsContainer

