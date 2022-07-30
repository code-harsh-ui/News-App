import React, { Component } from 'react'
import Card from './Card'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


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


  constructor() {
    super();
    this.state = {
      newsData: [],
      loading: false,
      page: 1,
      totalResults: 1
    }
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cfe6186e249941bab158966357415194&page=1&pageSize=${this.props.pageSize}`
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
  }

  handleNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cfe6186e249941bab158966357415194&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      page: this.state.page + 1,
      newsData: parsedData.articles,
      loading: false
    })
  }


  handlePreviousClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cfe6186e249941bab158966357415194&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      page: this.state.page - 1,
      newsData: parsedData.articles,
      loading: false
    })
  }

  render() {
    if (this.state.loading === true) {
      return <Spinner />
    }
    else {
      return (
        <>
          <div className="container my-3">
            {/* Here we get the props from App.js file with the help of this we can change headlines dynamically for each categories */}
            <h1 className='text-center'>{this.props.head}</h1>
            <div className="row">

              {this.state.newsData.map(function (element) {
                return <div key={element.url} className="col-md-4">
                  <Card
                    title={element.title ? element.title.slice(0, 50) : "Nothing to show"}
                    description={element.description ? element.description.slice(0, 170) : "Nothing to show"}
                    //? here we've used ! not of operator
                    imgUrl={!element.urlToImage ? 'https://pbs.twimg.com/profile_images/1108430392267280389/ufmFwzIn_400x400.png' : element.urlToImage} newsUrl={element.url}

                    /* //!  As we know we are getting this date in string format to change this string into date object we can use new Date() object to method so that we can use all methods of date object like stringVar.getDate(), stringVar.getSeconds, stringVar.toGMTString() - this helps to change the format of date from "UTC" to "GMT" and here we have used this same method to change the date from "ISO String" to "GMT" */
                    // And here we have passed two props from api element "publishedAt" and "author"
                    publishedAt={new Date(element.publishedAt).toGMTString()}

                    // Here we used ternary operator to state that if author is defined then "place the author name from api" and if author is not defined the use this value "unknown"
                    author={element.author ? element.author : 'unknown'}

                    // we have also passed a prop to card component from api
                    source = {element.source.name}

                  />
                </div>
              })}

              <div className="container d-flex justify-content-between">
                <button disabled={this.state.page <= 1} type='button' className='btn btn-dark' onClick={this.handlePreviousClick}>&larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
              </div>

            </div>
          </div>
        </>
      )
    }
  }
}

export default NewsContainer

