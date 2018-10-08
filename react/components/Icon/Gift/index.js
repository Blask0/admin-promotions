import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Gift extends PureComponent {
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
            d="M15,4h-1.2000122C13.9000244,3.7000122,14,3.3999634,14,3c0-1.7000122-1.2999878-3-3-3 C9.5999756,0,8.5999756,0.7999878,8,1.7000122C7.4000244,0.7999878,6.4000244,0,5,0C3.2999878,0,2,1.2999878,2,3 c0,0.3999634,0.0999756,0.7000122,0.2000122,1H1C0.4472656,4,0,4.4477539,0,5v3c0,0.5522461,0.4472656,1,1,1h1v6 c0,0.5522461,0.4472656,1,1,1h10c0.5527344,0,1-0.4477539,1-1V9h1c0.5527344,0,1-0.4477539,1-1V5C16,4.4477539,15.5527344,4,15,4z M11,2c0.5999756,0,1,0.3999634,1,1c0,0.5999756-0.4000244,1-1,1H9.2000122C9.4000244,3.0999756,9.9000244,2,11,2z M4,3 c0-0.6000366,0.4000244-1,1-1c1.0999756,0,1.5999756,1.0999756,1.7999878,2H5C4.4000244,4,4,3.5999756,4,3z M4,9h3v5H4V9z M12,14H9 V9h3V14z M14,7H2V6h12V7z"
          />
        </g>
      </svg>
    )
  }
}

Gift.propTypes = {
  style: PropTypes.object,
}

export default Gift
