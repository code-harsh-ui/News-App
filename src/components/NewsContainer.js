import React, { Component } from 'react'
import Card from './Card'

export class NewsContainer extends Component {


  constructor() {
    console.log('<constructor> will run before componentDidMount and render')
    super();
    // Here we are assigning an object to this state which is  "key = newsData" which is an empty array which we'll update using "this.setState" when we get the data from "api"
    this.state = {
      newsData: [],
      loading: false,
    }

  }

  // componentDidMount is a react life cycle method which execute after render function gets executed it means it inject the data after the "html cards" is rendered in the webpage

  // we have used async await method in componentDidMount to fetch the api data from news website
  async componentDidMount() {
    console.log('2.  <componentDidMount> will run after render')

    let url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=cfe6186e249941bab158966357415194'

    //! fetching the data from api
    let data = await fetch(url)
    //! storing that data in parsedData variable
    // to get the final data first we need to fetch the url in response then we parse this response into json using response.json()
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({ newsData: parsedData.articles })
  }


  render() {
    console.log('1.  <render> will run "after" constructor and "before" componentDid mount');
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
        </div>
      </>
    )
  }
}

export default NewsContainer