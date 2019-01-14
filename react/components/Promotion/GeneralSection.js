import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import {
    Checkbox,
    Input,
    DatePicker,
  } from 'vtex.styleguide'

class GeneralSection extends Component {
  constructor(props) {
    super(props)
  }

  static contextTypes = {
    navigate : PropTypes.func,
  }

  static propTypes = {
    intl: intlShape,
  }

  componentDidMount = () => {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  selectEffect = effect => {
    this.setState({ selectedEffect: effect })
  }

  isEffectSelected = effect => this.state.selectedEffect === effect

  render() {
    const { intl, generalInfo } = this.props

    return (
        <Fragment>
          <h4 className="t-heading-4 mt0">
            <FormattedMessage id="promotions.promotion.generalInfo.title" />
          </h4>
          <Input label={intl.formatMessage({ id: "promotions.promotion.generalInfo.name" })} />
          <div className="mv4">
            <DatePicker
              locale={intl.locale}
              onChange={() => {}}
              value={new Date()}
              label={intl.formatMessage({ id: "promotions.promotion.generalInfo.startDate" })} />
          </div>
          <Checkbox
            checked={generalInfo.hasEndDate}
            label={intl.formatMessage({ id: "promotions.promotion.generalInfo.endDateCheck" })}
            onChange={e => {
                generalInfo.hasEndDate = !generalInfo.hasEndDate
                this.props.onChange(generalInfo)
            }}/>
          {generalInfo.hasEndDate
            ? <div className="mt4">
                <DatePicker
                  locale={intl.locale}
                  onChange={() => {}}
                  value={new Date() + 7 * 24 * 60 * 60 * 1000}
                  label={intl.formatMessage({ id: "promotions.promotion.generalInfo.startDate" })} />
              </div>
            : null
          }
        </Fragment>
    )
  }
}

export default injectIntl(GeneralSection)
