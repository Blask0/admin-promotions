import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import PropTypes from 'prop-types'
import moment from 'moment'

import Input from '@vtex/styleguide/lib/Input'
import Toggle from '@vtex/styleguide/lib/Toggle'

import DatePicker from 'react-datepicker'
import { RenderContextConsumer } from 'render'

class ToggleableDatepicker extends Component {
  constructor(props) {
    super(props)

    // Show date picker if there is an initial value
    this.state = {
      isVisible: !!props.value,
    }
  }

  static defaultProps = {
    value: null,
  }

  handleDateChange = value => {
    if (this.props.onChange) {
      this.props.onChange(value ? value.format() : value)
    }
  }

  handleToggle = () => {
    if (this.state.isVisible) {
      // Hide datepicker: send null value
      this.handleDateChange(null)
    }

    // Toggle checkbox
    this.setState(prevState => ({
      isVisible: !prevState.isVisible,
    }))
  }

  render() {
    const { error, intl, labelOn, labelOff, value } = this.props
    const { isVisible } = this.state
    const input = <Input error={error} value={value} />
    return (
      <RenderContextConsumer>
        {({ culture: { locale } }) => (
          <div>
            <div style={{ width: 'fit-content' }}>
              <Toggle
                checked={!isVisible}
                label={labelOn}
                onChange={this.handleToggle}
                size="small"
              />
            </div>
            {isVisible && (
              <div className="pt3">
                <label className="vtex-input w-100">
                  <span className="vtex-input__label db mb3 w-100">
                    {labelOff}
                  </span>
                  <DatePicker
                    customInput={input}
                    selected={value ? moment(value) : null}
                    showTimeSelect
                    onChange={date => {
                      this.handleDateChange(date)
                    }}
                    timeCaption={intl.formatMessage({
                      id: 'input.hour',
                    })}
                    locale={locale}
                    dateFormat="L — LT"
                    timeIntervals={15}
                    timeFormat="HH:mm"
                    readOnly
                  />
                </label>
              </div>
            )}
          </div>
        )}
      </RenderContextConsumer>
    )
  }
}

ToggleableDatepicker.propTypes = {
  intl: intlShape.isRequired,
  labelOn: PropTypes.string.isRequired,
  labelOff: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
}

export default injectIntl(ToggleableDatepicker)
