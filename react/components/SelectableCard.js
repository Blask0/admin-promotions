import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class SelectableCard extends PureComponent {
  render() {
    const { children, noPadding, selected, onClick } = this.props
    const padding = noPadding ? '' : 'pa6'

    return (
      <div
        style={{ boxShadow: '0 3px 9px 0 rgba(61, 62, 64, 0.2)' }}
        className={`vtex-card card w-100 b2 br2 bg-base c-on-base ${padding} ${
          selected ? 'bg-action-primary white' : ''
        } ${onClick ? 'pointer' : ''}`}
        onClick={onClick ? () => onClick() : null}>
        {children}
      </div>
    )
  }
}

SelectableCard.propTypes = {
  /** Content of the card */
  children: PropTypes.node.isRequired,
  /** Use the full size of the card. */
  noPadding: PropTypes.bool,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
}

export default SelectableCard
