import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import { Checkbox, Input, DatePicker, Toggle } from 'vtex.styleguide'

class GeneralSection extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { intl, generalInfo, updatePageState } = this.props

    return (
      <Fragment>
        <div className="flex flex-row mb6">
          <h4 className="t-heading-4 mt0 w-50">
            <FormattedMessage id="promotions.promotion.generalInfo.title" />
          </h4>
          <div className="flex flex-column w-50">
            <div className="mv4">
              <span className="vtex-input__label db mb3 w-100 c-on-base t-small ">
                <FormattedMessage id="promotions.promotion.generalInfo.status" />
              </span>
              <Toggle
                label={
                  generalInfo.isActive
                    ? intl.formatMessage({
                      id: 'promotions.promotion.generalInfo.status.active',
                    })
                    : intl.formatMessage({
                      id: 'promotions.promotion.generalInfo.status.inactive',
                    })
                }
                checked={generalInfo.isActive}
                onChange={() => {
                  updatePageState({
                    isActive: !generalInfo.isActive,
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
                  updatePageState({
                    name: e.target.value,
                  })
                }}
              />
            </div>
            <div className="mv4">
              <DatePicker
                locale={intl.locale}
                onChange={date => {
                  updatePageState({
                    startDate: date,
                  })
                }}
                value={generalInfo.startDate}
                label={intl.formatMessage({
                  id: 'promotions.promotion.generalInfo.startDate',
                })}
              />
            </div>
            <div className="mv4">
              <Checkbox
                checked={generalInfo.hasEndDate}
                id="hasEndDate"
                label={intl.formatMessage({
                  id: 'promotions.promotion.generalInfo.hasEndDate',
                })}
                name="limitPerActivation-checkbox-group"
                onChange={() => {
                  updatePageState({
                    hasEndDate: !generalInfo.hasEndDate,
                  })
                }}
                value="hasEndDate"
              />
            </div>
            {generalInfo.hasEndDate ? (
              <div className="mt4">
                <DatePicker
                  locale={intl.locale}
                  onChange={date => {
                    updatePageState({
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
          </div>
        </div>
        <hr className="b--muted-4 bt-0" />
        <div className="flex flex-row mt7">
          <div className="w-50">
            <h4 className="t-heading-4 mt0 mb4">
              <FormattedMessage id="promotions.promotion.accumulation.title" />
            </h4>
            <span className="c-muted-1 t-small-s">
              <FormattedMessage id="promotions.promotion.accumulation.briefExplanation" />
            </span>
          </div>
          <div className="flex flex-column w-50">
            <div className="mt4">
              <Checkbox
                checked={generalInfo.accumulateWithPromotions}
                id="accumulateWithPromotions"
                label={intl.formatMessage({
                  id:
                    'promotions.promotion.generalInfo.accumulateWithPromotions.label',
                })}
                name="accumulateWithPromotions-checkbox-group"
                onChange={e =>
                  updatePageState({
                    accumulateWithPromotions: !generalInfo.accumulateWithPromotions,
                  })
                }
                value="accumulateWithPromotions"
              />
            </div>

            <div className="mt3">
              <Checkbox
                checked={generalInfo.accumulateWithManualPrices}
                id="accumulateWithManualPrices"
                label={intl.formatMessage({
                  id:
                    'promotions.promotion.generalInfo.accumulateWithManualPrices.label',
                })}
                name="accumulateWithManualPrices-checkbox-group"
                onChange={e =>
                  updatePageState({
                    accumulateWithManualPrices: !generalInfo.accumulateWithManualPrices,
                  })
                }
                value="accumulateWithManualPrices"
              />
            </div>
          </div>
        </div>
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
    isActive: PropTypes.bool,
    startDate: PropTypes.instanceOf(Date),
    hasEndDate: PropTypes.bool,
    endDate: PropTypes.instanceOf(Date),
  }),
  updatePageState: PropTypes.func,
}

export default injectIntl(GeneralSection)
