import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import { Checkbox, Input, DatePicker } from 'vtex.styleguide'

class GeneralSection extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { intl, generalInfo } = this.props

    return (
      <Fragment>
        <h4 className="t-heading-4 mt0">
          <FormattedMessage id="promotions.promotion.generalInfo.title" />
        </h4>
        <div className="mv4">
          <Input
            label={intl.formatMessage({
              id: 'promotions.promotion.generalInfo.status',
            })}
            value={generalInfo.status}
            onChange={e => {
              this.props.updatePageState({
                status: e.target.value,
              })
            }}
          />
        </div>
        <div className="mv4">
          <Input
            label={intl.formatMessage({
              id: 'promotions.promotion.generalInfo.name',
            })}
            value={generalInfo.name}
            onChange={e => {
              this.props.updatePageState({
                name: e.target.value,
              })
            }}
          />
        </div>
        <div className="mv4">
          <DatePicker
            locale={intl.locale}
            onChange={date => {
              this.props.updatePageState({
                startDate: date,
              })
            }}
            value={generalInfo.startDate}
            label={intl.formatMessage({
              id: 'promotions.promotion.generalInfo.startDate',
            })}
          />
        </div>
        <Checkbox
          checked={generalInfo.hasEndDate}
          id="hasEndDate"
          label={intl.formatMessage({
            id: 'promotions.promotion.generalInfo.hasEndDate',
          })}
          name="limitPerActivation-checkbox-group"
          onChange={() => {
            this.props.updatePageState({ hasEndDate: !generalInfo.hasEndDate })
          }}
          value="hasEndDate"
        />
        {generalInfo.hasEndDate ? (
          <div className="mt4">
            <DatePicker
              locale={intl.locale}
              onChange={date => {
                this.props.updatePageState({
                  endDate: date,
                })
              }}
              value={generalInfo.endDate}
              label={intl.formatMessage({
                id: 'promotions.promotion.generalInfo.endDate',
              })}
            />
          </div>
        ) : null}
      </Fragment>
    )
  }
}

GeneralSection.contextTypes = {
  navigate: PropTypes.func,
}

GeneralSection.propTypes = {
  intl: intlShape,
  generalInfo: PropTypes.shape({
    name: PropTypes.string,
    status: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    hasEndDate: PropTypes.bool,
    endDate: PropTypes.instanceOf(Date),
  }),
  updatePageState: PropTypes.func,
}

export default injectIntl(GeneralSection)
