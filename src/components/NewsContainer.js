import React, { Component } from 'react'
import Card from './Card'

export class NewsContainer extends Component {
  
  render() {
    return (
      <>
        <div className="container my-3">
          <h1>Top Headlines</h1>
          <div className="row">
            <div className="col-md-4">
            {/* //* We can also use components in the component  */}
            {/* //* And here we are sending props to Card.js component */}
            {/* //* to access the variable in class based component we use "this" keyword  */}
            <Card title="My Title" description="My desc" />
            </div>
            <div className="col-md-4">
              {/* //* We can also use components in the component */}
              {/* //* And here we are sending props to Card.js component  */}
              {/* //! The variable names must be same when we use in props in Card.js file */}
              <Card title="My Title" description="My desc" imgUrl = "https://images.indianexpress.com/2022/06/IND-SA-3rd-T20-Live.jpg" />
            </div>
            <div className="col-md-4">
              {/* //* We can also use components in the component  */}
              {/* //* And here we are sending props to Card.js component  */}
              <Card title="My Title" description="My desc" />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default NewsContainer