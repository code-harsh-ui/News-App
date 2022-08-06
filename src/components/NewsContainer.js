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

  // to check the code flow of async await we created another object in states named "demo"

  constructor() {
    super();
    this.state = {
      newsData: [],
      loading: false,
      page: 1,
      totalResults: 1,
      demo: 1
    }
  }

  // And to replicate the "updateNews" function we have created a function named demo1
  async demo1() {
    console.log(this.state.demo)
  }

  // And the third replication is "demoFun" function of handleNextClick 
  // here we used async await method so that "demo1()" function will not called until the "this.setState" method will not set the "demo" value from 1 to 2
  demoFun = async () => {
    await this.setState({ demo: 2 })
    // because of async behaviour we get the update value of "demo" which is 2 in console
    this.demo1();
  }

  //! We are creating this function to fetch api and updating the values of states and with the help of this function we do not requrire to fetch the api again and again like we did previously in componentDidMount, handleNextClick and handlePreviousClick we just need to call this "update" function to fetch the Api from url

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
    // here we have used await it means as we know "if we update the values in state the updated value will not show up console" that is why we used await here so that first it will update the "page value" only then it will call the "updateNews" function
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
            <h1 className='text-center'>{this.props.head}</h1>
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
                {/* And here we have the test function "demoFun" which we created to under the flow of async await */} 
                <p>{this.state.demo}</p>
                <button onClick={this.demoFun}>click to change</button>
              </div>
            </div>
          </div>
        </>
      )
    }
  }
}

export default NewsContainer

