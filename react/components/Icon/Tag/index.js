import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Tag extends PureComponent {
  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="16"
        height="16"
        aria-hidden="true"
        style={this.props.style}
      >
        <g className="nc-icon-wrapper" fill="currentColor">
          <path
            fill="currentColor"
            d="M15.7,8.3l-8-8C7.5,0.1,7.3,0,7,0H1C0.4,0,0,0.4,0,1v6c0,0.3,0.1,0.5,0.3,0.7l8,8C8.5,15.9,8.7,16,9,16 s0.5-0.1,0.7-0.3l6-6C16.1,9.3,16.1,8.7,15.7,8.3z M9,13.6l-7-7V2h4.6l7,7L9,13.6z"
          />{' '}
          <circle data-color="color-2" cx="5" cy="5" r="1" />
        </g>
      </svg>
    )
  }
}

Tag.propTypes = {
  style: PropTypes.object,
}

export default Tag
