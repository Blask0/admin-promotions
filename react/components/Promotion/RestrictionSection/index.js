import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import { applyFocus } from '../../../utils/functions'

import { Checkbox, Input, EXPERIMENTAL_Select } from 'vtex.styleguide'
import OriginRestriction from './OriginRestriction'

import { fieldShape } from '../../../utils/propTypes'
import { getRestrictSalesChannelVerbOptions } from '../../../utils/constants'
import { mapSalesChannelsToSelect } from '../../../utils/mappers'
import withSalesChannels from '../../../connectors/withSalesChannels'

class RestrictionSection extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate = () => {
    const {
      restriction: {
        perStore,
        perClient,
        maxNumberOfAffectedItems,
        restrictedSalesChannels,
      },
      updatePageState,
    } = this.props

    if (perStore.focus) {
      applyFocus({
        changeObject: {
          perStore,
        },
        changeFunction: updatePageState,
      })
    }

    if (perClient.focus) {
      applyFocus({
        changeObject: {
          perClient,
        },
        changeFunction: updatePageState,
      })
    }

    if (maxNumberOfAffectedItems.focus) {
      applyFocus({
        changeObject: {
          maxNumberOfAffectedItems,
        },
        changeFunction: updatePageState,
      })
    }

    if (restrictedSalesChannels.focus) {
      applyFocus({
        changeObject: {
          restrictedSalesChannels,
        },
        changeFunction: updatePageState,
      })
    }
  }

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

    const restrictSalesChannelOptions = getRestrictSalesChannelVerbOptions(intl)

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
                  ...perStore,
                  value: undefined,
                  error: undefined,
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
              ref={perStore.ref}
              errorMessage={perStore.error}
              onChange={e => {
                updatePageState({
                  perStore: {
                    ...perStore,
                    value: parseInt(e.target.value),
                    error: undefined,
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
                  ...perClient,
                  value: undefined,
                  error: undefined,
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
              ref={perClient.ref}
              errorMessage={perClient.error}
              onChange={e => {
                updatePageState({
                  perClient: {
                    ...perClient,
                    value: parseInt(e.target.value),
                    error: undefined,
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
                  ...maxNumberOfAffectedItems,
                  value: undefined,
                  error: undefined,
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
              ref={maxNumberOfAffectedItems.ref}
              errorMessage={maxNumberOfAffectedItems.error}
              onChange={e => {
                updatePageState({
                  maxNumberOfAffectedItems: {
                    ...maxNumberOfAffectedItems,
                    value: parseInt(e.target.value),
                    error: undefined,
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
                restrictSalesChannelVerb: restrictSalesChannelVerb,
                restrictedSalesChannels: {
                  ...restrictedSalesChannels,
                  value: [],
                  error: undefined,
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
                options={restrictSalesChannelOptions}
                value={
                  restrictSalesChannelVerb || restrictSalesChannelOptions[0]
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
                ref={restrictedSalesChannels.ref}
                placeholder={intl.formatMessage({
                  id:
                    'promotions.promotion.restriction.restrictTradePolicies.placeholder',
                })}
                options={mapSalesChannelsToSelect(salesChannels)}
                value={restrictedSalesChannels.value}
                ref={restrictedSalesChannels.ref}
                errorMessage={restrictedSalesChannels.error}
                loading={loading}
                onChange={selected =>
                  updatePageState({
                    restrictedSalesChannels: {
                      ...restrictedSalesChannels,
                      value: selected,
                      error: undefined,
                    },
                  })
                }
              />
            </div>
          </div>
        )}
        <div className="pv3 w-70">
          <OriginRestriction
            origin={origin}
            onChange={origin =>
              updatePageState({
                origin,
              })
            }
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
