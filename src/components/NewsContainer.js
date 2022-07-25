import React, { Component } from 'react'
import Card from './Card'
import Spinner from './Spinner'

// Here we are using propTypes to set the default props and its type to do so first we need to import propTypes from prop-types using "impt" snippet
import PropTypes from 'prop-types'


export class NewsContainer extends Component {

  //! alternative way of using propTypes and defaultProps with the help of "static variable"

  // defaultProps is used when we forget to pass any props in the component "here we used this NewsContainer component" in "App.js file" with no props passed in it that is why this default props values is being used for NewsContainer component
  static defaultProps = {
    country: 'in',
    pageSize: 9,
    //!( we can use any of these categories to fetch news of these categories )
    // category: 'business'
    // category: 'entertainment'
    // category: 'general'
    // category: 'health'
    category: 'science'
    // category: 'sports'
    // category: 'technology'

  }

  // Props types is used to set the types of props in this component it means if we defined this props as "string" we can't use the value in "number"

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
    // getting props country and pageSize from App.js file

    //! Like country and apiKey we also have another request parameter i.e category (business, entertainment, general, health, science, sports, technology)

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
    // getting props country and pageSize from App.js file

    //! Like country and apiKey we also have another request parameter i.e category (business, entertainment, general, health, science, sports, technology)

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
    // getting props country and pageSize from App.js file

    //! Like country and apiKey we also have another request parameter i.e category (business, entertainment, general, health, science, sports, technology)

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

//? or we can set propTypes in class component as well it means instead of using propTypes and defaultProps here we can place this in the class component using 'static variable'

// NewsContainer.defaultProps = {
//   country: 'in',
//   pageSize: 6
// }


// NewsContainer.propTypes = {
//   country: PropTypes.string,
//   pageSize : PropTypes.number
// }

export default NewsContainer

