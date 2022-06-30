import React, { Component } from 'react'

export default class Card extends Component {
  render() {    
        //! Here we've used object destructuring method to get the props object in assigned variable "title" and "description" 
    /* 
    ? Example:------
    let bioData = {
      name: "harsh",
      age: 25,
      language: "node.js",
      hob: {
          first: 'playing',
          sec: 'making videos'
      }
    }
    ! It is very important to put the variable name same from object keys in bioData while declaring
    let { name, age, language } = bioData; */

    // Here we are getting all the values in this.props in object form we are storing the values of that object in these variable using object destructuring method.
    let { title, description, imgUrl, newsUrl } = this.props

    return (
      <div className='my-3'>
        <div className="card" style={{ width: "20rem", height:"28rem" }}>
          <img style={{ height:"12rem" }} src={imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}..</h5>
            <p className="card-text">{description}...</p>
            {/* We can't use target blank in react without using rel="noopener noreferrer" */}
            <a href={newsUrl} target='_blank' rel="noopener noreferrer" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}
