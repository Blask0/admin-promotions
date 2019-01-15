import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import {
    Toggle,
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
    generalInfo: PropTypes.object,
    onChange: PropTypes.func
  }

  render() {
    const { intl, generalInfo } = this.props

    return (
        <React.Fragment>
          <h4 className="t-heading-4 mt0">
            <FormattedMessage id="promotions.promotion.generalInfo.title" />
          </h4>
          <div className="mv4">
            <Input label={intl.formatMessage({ id: "promotions.promotion.generalInfo.status" })}
            value={generalInfo.status}
            onChange={e => {
                this.props.updatePageState({
                    status: e.target.value
                })
            }} />
          </div>
          <div className="mv4">
            <Input label={intl.formatMessage({ id: "promotions.promotion.generalInfo.name" })}
            value={generalInfo.name}
            onChange={e => {
                this.props.updatePageState({
                    name: e.target.value
                })
            }} />
          </div>
          <div className="mv4">
            <DatePicker
              locale={intl.locale}
              onChange={date => {
                this.props.updatePageState({
                    startDate: date
                })
              }}
              value={generalInfo.startDate}
              label={intl.formatMessage({ id: "promotions.promotion.generalInfo.startDate" })} />
          </div>
          <Toggle
            checked={generalInfo.hasEndDate}
            label={intl.formatMessage({ id: "promotions.promotion.generalInfo.hasEndDate" })}
            onChange={() => {
                this.props.updatePageState({hasEndDate: !generalInfo.hasEndDate})
            }}/>
          {generalInfo.hasEndDate
            ? <div className="mt4">
                <DatePicker
                  locale={intl.locale}
                  onChange={date => {
                    this.props.updatePageState({
                        endDate: date
                    })
                  }}                  
                  value={generalInfo.endDate}
                  label={intl.formatMessage({ id: "promotions.promotion.generalInfo.endDate" })} />
              </div>
            : null
          }
        </React.Fragment>
    )
  }
}

export default injectIntl(GeneralSection)
