import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import { Checkbox, Input, Link, Toggle } from 'vtex.styleguide'
import Scheduling from './Scheduling'

import { fieldShape } from '../../../utils/propTypes'
import { applyFocus } from '../../../utils/functions'

class GeneralSection extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate = () => {
    const {
      generalInfo: { name, endDate },
      updatePageState,
    } = this.props

    if (name.focus) {
      applyFocus({
        changeObject: {
          name,
        },
        changeFunction: updatePageState,
      })
    }

    if (endDate.focus) {
      applyFocus({
        changeObject: {
          endDate,
        },
        changeFunction: updatePageState,
      })
    }
  }

  render() {
    const { intl, generalInfo, updatePageState } = this.props

    return (
      <>
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
                errorMessage={generalInfo.name.error}
                value={generalInfo.name.value}
                ref={generalInfo.name.ref}
                onChange={e => {
                  updatePageState({
                    name: {
                      ...generalInfo.name,
                      value: e.target.value,
                      error: undefined,
                    },
                  })
                }}
              />
            </div>
          </div>
        </div>
        <Scheduling
          generalInfo={generalInfo}
          updatePageState={updatePageState}
        />
        <hr className="b--muted-4 bt-0" />
        <div className="flex flex-row mv7">
          <div className="w-50">
            <h4 className="t-heading-4 mt0 mb4">
              <FormattedMessage id="promotions.promotion.accumulation.title" />
            </h4>
            {/* <span className="c-muted-1 t-small-s">
              <FormattedMessage id="promotions.promotion.accumulation.briefExplanation" />
            </span> */}
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
      </>
    )
  }
}

GeneralSection.propTypes = {
  intl: intlShape,
  generalInfo: PropTypes.shape({
    name: fieldShape(PropTypes.string),
    isActive: PropTypes.bool,
    startDate: PropTypes.instanceOf(Date),
    hasEndDate: PropTypes.bool,
    endDate: fieldShape(PropTypes.instanceOf(Date)),
    tz: PropTypes.number,
    cron: PropTypes.string,
  }),
  updatePageState: PropTypes.func,
}

export default injectIntl(GeneralSection)
