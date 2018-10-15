import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Gift extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
  }

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

export class WrappedGift extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
  }

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
          fill="currentColor"
          d="M19 8H17.8C17.9 7.70001 18 7.39996 18 7C18 5.29999 16.7 4 15 4C13.6 4 12.6 4.79999 12 5.70001C11.4 4.79999 10.4 4 9 4C7.29999 4 6 5.29999 6 7C6 7.39996 6.09998 7.70001 6.20001 8H5C4.44727 8 4 8.44775 4 9V12C4 12.5522 4.44727 13 5 13H6V19C6 19.5522 6.44727 20 7 20H17C17.5527 20 18 19.5522 18 19V13H19C19.5527 13 20 12.5522 20 12V9C20 8.44775 19.5527 8 19 8ZM15 6C15.6 6 16 6.39996 16 7C16 7.59998 15.6 8 15 8H13.2C13.4 7.09998 13.9 6 15 6ZM8 7C8 6.39996 8.40002 6 9 6C10.1 6 10.6 7.09998 10.8 8H9C8.40002 8 8 7.59998 8 7ZM8 13H11V18H8V13ZM16 18H13V13H16V18ZM18 11H6V10H18V11Z"
        />
      </svg>
    )
  }
}

export default Gift
