import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Truck extends PureComponent {
  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="15"
        height="15"
        aria-hidden="true"
        style={this.props.style}
      >
        <g className="nc-icon-wrapper" fill="currentColor">
          <path
            fill="currentColor"
            d="M15.3,6.1l-2.6-0.9l-1.8-4.6C10.8,0.2,10.4,0,10,0H1C0.4,0,0,0.4,0,1v12c0,0.6,0.4,1,1,1h3.3 c0.6,1.2,1.8,2,3.2,2c1.4,0,2.6-0.8,3.2-2.1c0.1,0,0.2,0.1,0.3,0.1h4c0.6,0,1-0.4,1-1V7C16,6.6,15.7,6.2,15.3,6.1z M14,12h-3 c0,0,0,0,0,0c-0.2-1.7-1.7-3-3.5-3c-1.8,0-3.2,1.3-3.4,3H2V2h7.3l1.7,4.4c0.1,0.3,0.3,0.5,0.6,0.6L14,7.7V12z"
          />{' '}
          <path data-color="color-2" d="M7,3H5v3c0,0.6,0.4,1,1,1h3V5H7V3z" />
        </g>
      </svg>
    )
  }
}

Truck.propTypes = {
  style: PropTypes.object,
}

export default Truck
