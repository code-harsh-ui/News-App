import React, { Component } from 'react'
import Card from './Card'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export class NewsContainer extends Component {

  // If there is no props passed in NewsContainer component this default props being used for the component
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
            <h1 className='text-center'>Top Headlines</h1>
            <div className="row">

              {this.state.newsData.map(function (element) {
                return <div key={element.url} className="col-md-4">
                  <Card
                    title={element.title ? element.title.slice(0, 50) : "Nothing to show"}
                    description={element.description ? element.description.slice(0, 170) : "Nothing to show"}
                    //? here we've used ! not of operator
                    imgUrl={!element.urlToImage ? 'https://pbs.twimg.com/profile_images/1108430392267280389/ufmFwzIn_400x400.png' : element.urlToImage} newsUrl={element.url}

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

