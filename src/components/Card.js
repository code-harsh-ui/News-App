import React, { Component } from 'react'

export default class Card extends Component {
  render() {

    let { title, description, imgUrl, newsUrl, publishedAt, author, source } = this.props

    return (
      <div className='my-3'>
        <div className="card" style={{ width: "20rem", height: "33rem" }}>
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '60px'}}>
            {source}
          </span>
          <img style={{ height: "12rem" }} src={imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}..</h5>
            <p className="card-text">{description}...</p>
            <p style={{ position: "absolute", bottom: "6rem" }} className="card-text"><small className="text-muted">By {author}</small></p>
            <p style={{ position: "absolute", bottom: "4rem" }} className="card-text"><small className="text-danger">Published at {publishedAt}</small></p>
            <a style={{ position: "absolute", bottom: "2rem" }} href={newsUrl} target='_blank' rel="noopener noreferrer" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}
