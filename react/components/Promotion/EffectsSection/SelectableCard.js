import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { IconCheck } from 'vtex.styleguide'

const EFFECT_BOX_SIZE = { height: 132, width: 154 }

class SelectableCard extends PureComponent {
  render() {
    const { children, noPadding, selected, onClick } = this.props
    const padding = noPadding ? '' : 'pa6'

    return (
      <div
        className={selected ? 'ba br2 b--action-primary relative' : 'ba br2 b--transparent relative'}
        style={{ ...EFFECT_BOX_SIZE, borderWidth: '4px' }}>
        {selected ? (
          <div className="absolute right--1 top--1 br-100 h2 w2 bg-action-primary">
            <div className="pa3">
              <IconCheck color="white" />
            </div>
          </div>
        ) : null}
        <div
          style={{ boxShadow: '0 3px 9px 0 rgba(61, 62, 64, 0.2)' }}
          className={`vtex-card card w-100 b2 br2 bg-base c-on-base ${
            padding
          } ${
            onClick ? 'pointer' : ''
          }`}
          onClick={onClick ? () => onClick() : null}>
          {children}
        </div>
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
