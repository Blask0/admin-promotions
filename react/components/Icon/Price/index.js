import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Price extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
  }

  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        style={this.props.style}
      >
        <path
          d="M27 21L31 16L27 11V5H21L16 1L11 5H5V11L1 16L5 21V27H11L16 31L21 27H27V21Z"
          stroke="#111111"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="square"
        />
      </svg>
    )
  }
}

export default Price
