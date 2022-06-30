import React, { Component } from 'react'

export default class Card extends Component {
  render() {    
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
