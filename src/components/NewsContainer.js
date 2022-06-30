import React, { Component } from 'react'
import Card from './Card'

export class NewsContainer extends Component {


  constructor() {
    super();
    this.state = {
      newsData: [],
      loading: false,
      //! It really important to understand the intial value of page is 1 and we'll update this value in next and prev functions 
      page: 1,
      totalResults: 1
    }

  }


  async componentDidMount() {
    let url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=cfe6186e249941bab158966357415194&page=1&pageSize=18'
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({ newsData: parsedData.articles, totalResults: parsedData.totalResults })
    console.log(this.state.totalResults) // 38
  }

  // It is must convert a function to async when we are fetching an api
  handleNextClick = async() => {
    console.log('next')
    // When we click on next button we are adding page = 1+1 in url to fetch the next page
    //! As we know the intial value of this.state.page is 1 which we have defined in useState and here we are updating the url by adding 1 to fetch the second page e.g 1+1 = 2 when we click on next button this function will execute
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=cfe6186e249941bab158966357415194&page=${this.state.page + 1}&pageSize=18`
    let data = await fetch(url)
    let parsedData = await data.json()

    //! And second important thing is when we fetch the second page using this.state.page + 1 we must update the value of page as well which is 1 initailly in "useState" so that when we click the next button again the logic will go like this = updated value of this.state.page = 2 + 1 = 3
    this.setState({
      page: this.state.page + 1, //! with the help of setState we are also updating the value of "useState Page" simultaneoulsy so that when we click the next button again the recent value of page will become 2 so it will help to fetch the 3rd page by using recent value of page 2+1
      newsData: parsedData.articles
    })
  }
  
  
  handlePreviousClick = async() => {
  //! Assumming that we are on page 2 so when we click on prev button this function will get execute and it fetch the page 1 url using the logic - this.state.page = 2 -1 = page 1
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=cfe6186e249941bab158966357415194&page=${this.state.page - 1}&pageSize=18`
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      page: this.state.page - 1, //! with the help of setState we are also updating the value of "useState Page" simultaneoulsy so that when we click the prev button again the recent value of page will become 1 so it will help to fetch the 1st page again by using recent value of page 2-1
      newsData: parsedData.articles
    })
  }


  render() {
    return (
      <>
        <div className="container my-3">
          <h1>Top Headlines</h1>
          <div className="row">
            {this.state.newsData.map(function (element) {

              return <div key={element.url} className="col-md-4">
                <Card
                  title={element.title ? element.title.slice(0, 50) : "Nothing to show"}
                  description={element.description ? element.description.slice(0, 170) : "Nothing to show"}
                  imgUrl={!element.urlToImage ? 'https://pbs.twimg.com/profile_images/1108430392267280389/ufmFwzIn_400x400.png' : element.urlToImage} newsUrl={element.url}

                />
              </div>
            })}
          </div>

          {/* //?------------------------ Previous and Next buttons -----------------------*/}

          <div className="container d-flex justify-content-between">
            {/* In class component we need to use "this" keyword to call a function */}
            <button disabled={this.state.page <= 1} type='button' className='btn btn-dark' onClick={this.handlePreviousClick}>&larr; Previous</button>
            {/* And here this logic says "disable this button" if the latest value of this.state.page is greater than 3 and here 3 is page size as we know we are showing 18 articles in each page and we have total 38 articles so it will divided into 3 pages to fill all the articles */}
            {/* <button disabled={this.state.page + 1 > 3}  type='button' className='btn btn-dark' onClick={this.handleNextClick}>&rarr; Next</button> */}
            {/*//! or */}
            {/* we can use math.ceil and this.state.totalResults to set page no automatically */}
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 18)} type='button' className='btn btn-dark' onClick={this.handleNextClick}> Next &rarr;</button>
          </div>
        </div>
      </>
    )
  }
}

export default NewsContainer