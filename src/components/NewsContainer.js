import React, { Component } from 'react'
import Card from './Card'
import Spinner from './Spinner';


export class NewsContainer extends Component {

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
    // as we know we can access the props in class based component with the of 'this.props.propsName' keyword
    console.log('the pageSize props value is ', this.props.pageSize)
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=cfe6186e249941bab158966357415194&page=1&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData)

    this.setState(
      { newsData: parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading:false
    }
      )
    console.log(this.state.totalResults) // 38

  }

  handleNextClick = async () => {
    console.log('next')
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=cfe6186e249941bab158966357415194&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
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
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=cfe6186e249941bab158966357415194&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      page: this.state.page - 1,
      newsData: parsedData.articles,
      loading: false
    })
  }

  
  //! the async await behaviour - await holds the next tasks and it will take exit from that "next" function and it proceed next assign task which is "rendering the elements here" it means we placed loading = true before await in handleNextClick function it will take exit from that function and as we know according to this logic if loading == true it will show the spinner after that it will get back to complete the incomplete task of fetching the url and setting the loading === false then again the render method will execute and this time the else statement will executed. 
  
  // According to this logic we are saying render the spinner component if loading is === true else render the div elements.
  render() {
    if (this.state.loading === true) {
      // here spinner is a component
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
                {/* here total results if 38 and pageSize is 3 so if we divided 38/3 we get 12.666 and with the help of math.ceil we get '13' as a result so according to this logic we are saying that disable this button when this.state.page + 1 is greater than math.ceil means if the next page (this.state.page) is 14 and math.ceil value is 13 disable this button as we know the total items fits in 13 pages */}

                {/* and this.page.pageSize is coming from props which is located in NewsContainer File */}
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type='button' className='btn btn-dark' onClick={this.handleNextClick}>&rarr; Next</button>
              </div>

            </div>
          </div>
        </>
      )
    }
  }
}

export default NewsContainer