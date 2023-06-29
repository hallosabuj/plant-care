import React, { Component } from 'react'
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

class SwaggerUIPage extends Component {
  render() {
    return (
      <div>
        <SwaggerUI url="/api/docs/swagger.json" />
      </div>
    )
  }
}

export default SwaggerUIPage