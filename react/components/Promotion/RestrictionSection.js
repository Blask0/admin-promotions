import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import { Checkbox, Input, EXPERIMENTAL_Select } from 'vtex.styleguide'
import withSalesChannels from '../../connectors/withSalesChannels'

class RestrictionSection extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      intl,
      restriction: {
        limitedUsage,
        limitPerActivations,
        limitPerAffectedItems,
        perStore,
        perClient,
        maxNumOfAffectedItems,
        accumulate,
        accumulateWithPromotions,
        accumulateWithManualPrices,
        externalMarketplaces,
        restrictTradePolicies,
        restrictionVerb,
        restrictedTradePolicies,
      },
      salesChannels = [],
      loading,
      updatePageState,
    } = this.props

    const mappedSalesChannels = salesChannels.map(salesChannel => ({
      label: salesChannel.name,
      value: salesChannel.id,
    }))

    const verbs = [
      {
        label: 'is any of',
        value: 'any',
      },
      {
        label: 'is not any of',
        value: 'not_any',
      },
    ]

    return (
      <Fragment>
        <h4 className="t-heading-4 mt0">
          <FormattedMessage id="promotions.promotion.restriction.title" />
        </h4>
        <div className="pv3">
          <Checkbox
            checked={limitedUsage}
            id="limitUsage"
            label={intl.formatMessage({
              id: 'promotions.promotion.restriction.limitUsage.label',
            })}
            name="default-checkbox-group"
            onChange={e => updatePageState({ limitedUsage: !limitedUsage })}
            value="limitUsage"
          />
        </div>

        {limitedUsage && (
          <div className="pl5 pv3">
            <Checkbox
              checked={limitPerActivations}
              id="limitPerActivation"
              label={intl.formatMessage({
                id: 'promotions.promotion.restriction.limitPerActivation.label',
              })}
              name="limitPerActivation-checkbox-group"
              onChange={e =>
                updatePageState({
                  limitPerActivations: !limitPerActivations,
                })
              }
              value="limitPerActivation"
            />

            {limitPerActivations && (
              <div className="pl7 w-20">
                <div className="pv3">
                  <Input
                    placeholder=""
                    type="number"
                    value={perStore}
                    label={intl.formatMessage({
                      id: 'promotions.promotion.restriction.limit.perStore',
                    })}
                    onChange={e => {
                      updatePageState({ perStore })
                    }}
                  />
                </div>
                <div className="pv3">
                  <Input
                    placeholder=""
                    type="number"
                    value={perClient}
                    label={intl.formatMessage({
                      id: 'promotions.promotion.restriction.limit.perClient',
                    })}
                    onChange={e => {
                      updatePageState({ perClient })
                    }}
                  />
                </div>
              </div>
            )}
            <div className="pv3">
              <Checkbox
                checked={limitPerAffectedItems}
                id="limitPerAffectedItems"
                label={intl.formatMessage({
                  id:
                    'promotions.promotion.restriction.limitPerAffectedItems.label',
                })}
                name="limitPerAffectedItems-checkbox-group"
                onChange={e =>
                  updatePageState({
                    limitPerAffectedItems: !limitPerAffectedItems,
                  })
                }
                value="limitPerAffectedItems"
              />
            </div>

            {limitPerAffectedItems && (
              <div className="pl7 w-20 pv3">
                <Input
                  placeholder=""
                  type="number"
                  value={maxNumOfAffectedItems}
                  onChange={e => {
                    updatePageState({ maxNumOfAffectedItems })
                  }}
                />
              </div>
            )}
          </div>
        )}
        <div className="pv3">
          <Checkbox
            checked={accumulate}
            id="accumulate"
            label={intl.formatMessage({
              id: 'promotions.promotion.restriction.accumulate.label',
            })}
            name="accumulate-checkbox-group"
            onChange={e => updatePageState({ accumulate: !accumulate })}
            value="accumulate"
          />
        </div>

        {accumulate && (
          <div className="pl5 pv3">
            <Checkbox
              checked={accumulateWithPromotions}
              id="accumulateWithPromotions"
              label={intl.formatMessage({
                id:
                  'promotions.promotion.restriction.accumulateWithPromotions.label',
              })}
              name="accumulateWithPromotions-checkbox-group"
              onChange={e =>
                updatePageState({
                  accumulateWithPromotions: !accumulateWithPromotions,
                })
              }
              value="accumulateWithPromotions"
            />
            <Checkbox
              checked={accumulateWithManualPrices}
              id="accumulateWithManualPrices"
              label={intl.formatMessage({
                id:
                  'promotions.promotion.restriction.accumulateWithManualPrices.label',
              })}
              name="accumulateWithManualPrices-checkbox-group"
              onChange={e =>
                updatePageState({
                  accumulateWithManualPrices: !accumulateWithManualPrices,
                })
              }
              value="accumulateWithManualPrices"
            />
          </div>
        )}
        <div className="pv3">
          <Checkbox
            checked={externalMarketplaces}
            id="externalMarketplaces"
            label={intl.formatMessage({
              id: 'promotions.promotion.restriction.externalMarketplaces.label',
            })}
            name="externalMarketplaces-checkbox-group"
            onChange={e =>
              updatePageState({
                externalMarketplaces: !externalMarketplaces,
              })
            }
            value="externalMarketplaces"
          />
        </div>
        <div className="pv3">
          <Checkbox
            className="pv4"
            checked={restrictTradePolicies}
            id="restrictTradePolicies"
            label={intl.formatMessage({
              id:
                'promotions.promotion.restriction.restrictTradePolicies.label',
            })}
            name="restrictTradePolicies-checkbox-group"
            onChange={e =>
              updatePageState({
                restrictTradePolicies: !restrictTradePolicies,
              })
            }
            value="restrictTradePolicies"
          />
        </div>

        {restrictTradePolicies && (
          <div className="w-100 pl5 pv3 flex flex-row">
            <div className="w-30 ph2">
              <EXPERIMENTAL_Select
                options={verbs}
                value={restrictionVerb || verbs[0]}
                loading={loading}
                multi={false}
                onChange={selected => {
                  updatePageState({ restrictionVerb: selected })
                }}
              />
            </div>
            <div className="flex-grow-1">
              <EXPERIMENTAL_Select
                placeholder={intl.formatMessage({
                  id:
                    'promotions.promotion.restriction.restrictTradePolicies.placeholder',
                })}
                options={mappedSalesChannels}
                value={restrictedTradePolicies}
                loading={loading}
                onChange={selected => {
                  updatePageState({ restrictedTradePolicies: selected })
                }}
              />
            </div>
          </div>
        )}
      </Fragment>
    )
  }
}

RestrictionSection.contextTypes = {
  navigate: PropTypes.func,
}

RestrictionSection.propTypes = {
  intl: intlShape,
  restriction: PropTypes.shape({
    limitedUsage: PropTypes.bool.isRequired,
    limitedUsage: PropTypes.bool.isRequired,
    limitPerActivations: PropTypes.bool.isRequired,
    limitPerAffectedItems: PropTypes.bool.isRequired,
    perStore: PropTypes.number,
    perClient: PropTypes.number,
    maxNumOfAffectedItems: PropTypes.number,
    accumulate: PropTypes.bool.isRequired,
  }).isRequired,
  updatePageState: PropTypes.func.isRequired,
}

export default withSalesChannels(injectIntl(RestrictionSection))
