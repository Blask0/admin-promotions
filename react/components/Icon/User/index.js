import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class User extends PureComponent {
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
        <g className="nc-icon-wrapper" fill="currentColor">
          <path
            fill="currentColor"
            d="M12 0C5.383 0 0 5.383 0 12C0 18.617 5.383 24 12 24C18.617 24 24 18.617 24 12C24 5.383 18.617 0 12 0ZM18.698 19.404C18.034 17.431 16.198 16 14 16H10C7.802 16 5.968 17.432 5.304 19.405C3.281 17.574 2 14.937 2 12C2 6.486 6.486 2 12 2C17.514 2 22 6.486 22 12C22 14.936 20.72 17.573 18.698 19.404Z"
          />
          <path
            fill="currentColor"
            d="M12 5C9.791 5 8 6.791 8 9V10C8 12.209 9.791 14 12 14C14.209 14 16 12.209 16 10V9C16 6.791 14.209 5 12 5Z"
          />
        </g>
      </svg>
    )
  }
}

User.propTypes = {
  style: PropTypes.object,
}

export default User
