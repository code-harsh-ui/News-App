import React, { Component } from 'react'
import Card from './Card'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

//! it is important to import infiniteScroll component here so we can use the props which we are fetching from App.js file
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

  async componentDidMount() {
    this.props.progressProp(30)
    //! Here the apiKey we are fetching from App.js file as a prop to hide the 'apiKey
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url)
    let parsedData = await data.json()
    this.props.progressProp(70)
    this.setState(
      {
        newsData: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
      }
      )
      this.props.progressProp(100)
      
    }
    
    
    fetchMoreData = async () => {
      //! Here the apiKey we are fetching from App.js file as a prop to hide the 'apiKey
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState(
      {
        newsData: this.state.newsData.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        page: this.state.page + 1
      }
    )
  }

  render() {
    return (
      <>
        <h1 className='text-center'>NewsMonkey - {this.capitalizeFirstLetter(this.props.category)}</h1>
        <InfiniteScroll
          dataLength={this.state.newsData.length}
          next={this.fetchMoreData}
          hasMore={this.state.newsData.length !== this.state.totalResults}
          loader={< Spinner />}
        >
          <div className="container">
            <div className="row">
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

