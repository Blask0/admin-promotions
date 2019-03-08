import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import {
  RadioGroup,
  Checkbox,
  Input,
  EXPERIMENTAL_Select,
} from 'vtex.styleguide'

import { fieldShape } from '../../utils/propTypes'
import { RESTRICT_SALES_CHANNEL_VERB_OPTIONS } from '../../utils/constants'
import { mapSalesChannelsToSelect } from '../../utils/mappers'
import withSalesChannels from '../../connectors/withSalesChannels'

class RestrictionSection extends Component {
  constructor(props) {
    super(props)
  }

  isOriginSelected = origin => this.props.restriction.origin === origin

  render() {
    const {
      intl,
      restriction: {
        isLimitingPerStore,
        perStore,
        isLimitingPerClient,
        perClient,
        isLimitingPerNumOfAffectedItems,
        maxNumberOfAffectedItems,
        isRestrictingSalesChannels,
        restrictSalesChannelVerb,
        restrictedSalesChannels,
        origin,
      },
      salesChannels = [],
      loading,
      updatePageState,
    } = this.props

    return (
      <Fragment>
        <h4 className="t-heading-4 mt0">
          <FormattedMessage id="promotions.promotion.restriction.title" />
        </h4>
        <div className="pv3">
          <Checkbox
            checked={isLimitingPerStore}
            id="limitPerStoreActivation"
            label={intl.formatMessage({
              id: 'promotions.promotion.restriction.limit.perStore',
            })}
            name="limitPerStoreActivation-checkbox-group"
            onChange={e =>
              updatePageState({
                isLimitingPerStore: !isLimitingPerStore,
                perStore: {
                  value: undefined,
                },
              })
            }
            value="limitPerStoreActivation"
          />
        </div>
        {isLimitingPerStore && (
          <div className="pv3 pl5 w-30">
            <Input
              placeholder={intl.formatMessage({
                id:
                  'promotions.promotion.restriction.limit.perStore.placeholder',
              })}
              type="number"
              value={perStore.value}
              errorMessage={perStore.error}
              onChange={e => {
                updatePageState({
                  perStore: {
                    value: parseInt(e.target.value),
                  },
                })
              }}
            />
          </div>
        )}
        <div className="pv3">
          <Checkbox
            checked={isLimitingPerClient}
            id="limitPerClientActivation"
            label={intl.formatMessage({
              id: 'promotions.promotion.restriction.limit.perClient',
            })}
            name="limitPerClientActivation-checkbox-group"
            onChange={e =>
              updatePageState({
                isLimitingPerClient: !isLimitingPerClient,
                perClient: {
                  value: undefined,
                },
              })
            }
            value="limitPerClientActivation"
          />
        </div>
        {isLimitingPerClient && (
          <div className="pv3 pl5 w-30">
            <Input
              placeholder={intl.formatMessage({
                id:
                  'promotions.promotion.restriction.limit.perClient.placeholder',
              })}
              type="number"
              value={perClient.value}
              errorMessage={perClient.error}
              onChange={e => {
                updatePageState({
                  perClient: {
                    value: parseInt(e.target.value),
                  },
                })
              }}
            />
          </div>
        )}
        <div className="pv3">
          <Checkbox
            checked={isLimitingPerNumOfAffectedItems}
            id="limitPerAffectedItems"
            label={intl.formatMessage({
              id:
                'promotions.promotion.restriction.limit.perAffectedItems.label',
            })}
            name="limitPerAffectedItems-checkbox-group"
            onChange={e =>
              updatePageState({
                isLimitingPerNumOfAffectedItems: !isLimitingPerNumOfAffectedItems,
                maxNumberOfAffectedItems: {
                  value: undefined,
                },
              })
            }
            value="limitPerAffectedItems"
          />
        </div>
        {isLimitingPerNumOfAffectedItems && (
          <div className="pv3 pl5 w-30">
            <Input
              placeholder={intl.formatMessage({
                id:
                  'promotions.promotion.restriction.limit.perAffectedItems.placeholder',
              })}
              type="number"
              value={maxNumberOfAffectedItems.value}
              errorMessage={maxNumberOfAffectedItems.error}
              onChange={e => {
                updatePageState({
                  maxNumberOfAffectedItems: {
                    value: parseInt(e.target.value),
                  },
                })
              }}
            />
          </div>
        )}
        <div className="pv3">
          <Checkbox
            className="pv4"
            checked={isRestrictingSalesChannels}
            id="restrictTradePolicies"
            label={intl.formatMessage({
              id:
                'promotions.promotion.restriction.restrictTradePolicies.label',
            })}
            name="restrictTradePolicies-checkbox-group"
            onChange={e =>
              updatePageState({
                isRestrictingSalesChannels: !isRestrictingSalesChannels,
                restrictSalesChannelVerb: undefined,
                restrictedSalesChannels: {
                  value: [],
                },
              })
            }
            value="restrictTradePolicies"
          />
        </div>
        {isRestrictingSalesChannels && (
          <div className="pv3 flex flex-row">
            <div className="w-30 pl5">
              <EXPERIMENTAL_Select
                options={RESTRICT_SALES_CHANNEL_VERB_OPTIONS}
                value={
                  restrictSalesChannelVerb ||
                  RESTRICT_SALES_CHANNEL_VERB_OPTIONS[0]
                }
                loading={loading}
                multi={false}
                onChange={selected =>
                  updatePageState({ restrictSalesChannelVerb: selected })
                }
              />
            </div>
            <div className="pl2 flex-grow-1">
              <EXPERIMENTAL_Select
                placeholder={intl.formatMessage({
                  id:
                    'promotions.promotion.restriction.restrictTradePolicies.placeholder',
                })}
                options={mapSalesChannelsToSelect(salesChannels)}
                value={restrictedSalesChannels.value}
                errorMessage={restrictedSalesChannels.error}
                loading={loading}
                onChange={selected =>
                  updatePageState({
                    restrictedSalesChannels: {
                      value: selected,
                    },
                  })
                }
              />
            </div>
          </div>
        )}
        <div className="mt7">
          <h4 className="t-heading-5 mt0">
            <FormattedMessage id="promotions.promotion.restriction.origin" />
          </h4>
          <RadioGroup
            name="origin"
            options={[
              {
                value: 'marketplace',
                label: (
                  <div>
                    <div className="b">
                      <FormattedMessage id="promotions.promotion.restriction.origin.marketplace" />
                    </div>
                    <div className="c-muted-1">
                      <FormattedMessage id="promotions.promotion.restriction.origin.marketplace.explanation" />
                    </div>
                  </div>
                ),
              },
              {
                value: 'fulfillment',
                label: (
                  <div>
                    <div className="b">
                      <FormattedMessage id="promotions.promotion.restriction.origin.fulfillment" />
                    </div>
                    <div className="c-muted-1">
                      <FormattedMessage id="promotions.promotion.restriction.origin.fulfillment.explanation" />
                    </div>
                  </div>
                ),
              },
            ]}
            value={origin}
            onChange={event => updatePageState({ origin: event.target.value })}
          />
        </div>
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
    isLimitingPerStore: PropTypes.bool.isRequired,
    perStore: fieldShape(PropTypes.number),
    isLimitingPerClient: PropTypes.bool.isRequired,
    perClient: fieldShape(PropTypes.number),
    isLimitingPerNumOfAffectedItems: PropTypes.bool.isRequired,
    maxNumberOfAffectedItems: fieldShape(PropTypes.number),
    isRestrictingSalesChannels: PropTypes.bool,
    restrictSalesChannelVerb: PropTypes.string,
    restrictedSalesChannels: fieldShape(PropTypes.array),
  }).isRequired,
  updatePageState: PropTypes.func.isRequired,
}

export default withSalesChannels(injectIntl(RestrictionSection))
