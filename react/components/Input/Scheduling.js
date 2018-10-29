import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import ToggleableDatepicker from './ToggleableDatepicker'

class Scheduling extends PureComponent {
  static defaultProps = {
    dateRange: { from: null, to: null },
  }

  checkValidDateRange = (from, to) => {
    // Start now, never end, or both
    if (!from || !to) {
      return true
    }
    if (from < to) {
      return true
    }
    return false
  }

  handleChange = (value, type) => {
    const valid =
      type === 'from'
        ? this.checkValidDateRange(value, this.props.dateRange.to)
        : this.checkValidDateRange(this.props.dateRange.from, value)

    this.setState({
      valid: valid,
    })

    this.props.onChange(value, type, valid)
  }

  render() {
    return (
      <div>
        <div className="w-50 pt5">
          <ToggleableDatepicker
            labelOff={this.props.intl.formatMessage({
              id: 'input.label.fromDate.off',
            })}
            labelOn={this.props.intl.formatMessage({
              id: 'input.label.fromDate.on',
            })}
            value={this.props.dateRange.from}
            onChange={value => {
              this.handleChange(value, 'from')
            }}
            error={!!this.props.errorMessage}
          />
        </div>
        <div className="w-50 pt5">
          <ToggleableDatepicker
            labelOff={this.props.intl.formatMessage({
              id: 'input.label.toDate.off',
            })}
            labelOn={this.props.intl.formatMessage({
              id: 'input.label.toDate.on',
            })}
            value={this.props.dateRange.to}
            onChange={value => {
              this.handleChange(value, 'to')
            }}
            error={!!this.props.errorMessage}
          />
        </div>

        {this.props.errorMessage && (
          <div className="red f6 mt3 lh-title">
            {this.props.intl.formatMessage({
              id: this.props.errorMessage,
            })}
          </div>
        )}
      </div>
    )
  }
}

Scheduling.propTypes = {
  dateRange: PropTypes.any,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
}

export default injectIntl(Scheduling)
