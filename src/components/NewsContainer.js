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

  // Here we have created this function to capitalize the first letter and this function being called in constructor and render for capital heading
  capitalizeFirstLetter =(string)=>{
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

    // as we know in class based component we use constructor to define the "states" with its initail values
    // Here we are grabbing the title of the webpage using "document.title" and changing it dynamically using props which is coming from App.js file

    // document.title = this.props.head

    // or 
    
    // we can use "category" props to set title but we need to capitazile the "category" props as well we can also set categories to capital letter manually by pass another props "head" in "App.js" file but the props "category" are also used in "api url query" that is why we used "capitalize function" to make webpage title first letter capital

    // here we are calling capitalizeFirstLetter function using "this" keyword and passing this props "category" as an argument to that function.

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
  }

  async componentDidMount() {
    this.updateNews()
  }

  handleNextClick = async () => {
    await this.setState({ page: this.state.page + 1 })
    this.updateNews();
    console.log(this.state.page)
  }


  handlePreviousClick = async () => {
    await this.setState({ page: this.state.page - 1 })
    this.updateNews();
  }

  render() {
    if (this.state.loading === true) {
      return <Spinner />
    }
    else {
      return (
        <>
          <div className="container my-3">
            {/* <h1 className='text-center'>{this.props.head}</h1> */}
            <h1 className='text-center'>NewsMonkey - {this.capitalizeFirstLetter(this.props.category)}</h1>
            <div className="row">

              {this.state.newsData.map(function (element) {
                return <div key={element.url} className="col-md-4">
                  <Card
                    title={element.title ? element.title.slice(0, 50) : "Nothing to show"}
                    description={element.description ? element.description.slice(0, 170) : "Nothing to show"}
                    //? here we've used ! not of operator
                    imgUrl={!element.urlToImage ? 'https://pbs.twimg.com/profile_images/1108430392267280389/ufmFwzIn_400x400.png' : element.urlToImage} newsUrl={element.url}
                    publishedAt={new Date(element.publishedAt).toGMTString()}
                    author={element.author ? element.author : 'unknown'}
                    source={element.source.name}
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

