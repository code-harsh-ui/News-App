// Similarly we also need to remove {Component} from import
import React from 'react'

// Similarly we are changing this class based component into function based component
// As we know this is fucntion based component that is why we need to pass props in this function parameter to get the props from NewsContainer.js file
function Card (props) {

   // In function based component "this" keyword is not required for props
    let { title, description, imgUrl, newsUrl, publishedAt, author, source } = props

    return (
      <div className='my-4'>
        <div className="card" style={{ width: "20rem", height: "33rem" }}>
          <div style={{display: 'flex', justifyContent: 'flex-end', position:'absolute', right:'0'}} > 
          <span className="badge rounded-pill bg-danger">
            {source}
          </span>
          </div>
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

export default Card
