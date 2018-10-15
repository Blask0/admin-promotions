import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Columns extends PureComponent {
  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        aria-hidden="true"
        style={this.props.style}
      >
        <circle
          cx="12"
          cy="12"
          r="11"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          fill="none"
          d="M6 8.625H18V18H6V8.625Z"
          stroke="#F71963"
          strokeWidth="2"
        />
        <path
          fill="currentColor"
          d="M6 6H18V8.375H6V6Z"
          stroke="#F71963"
          strokeWidth="2"
        />
        <line
          fill="currentColor"
          x1="12.2222"
          y1="9.11761"
          x2="12.2222"
          y2="17.3529"
          stroke="#F71963"
          strokeWidth="2"
        />
      </svg>
    )
  }
}

Columns.propTypes = {
  style: PropTypes.object,
}

export default Columns
