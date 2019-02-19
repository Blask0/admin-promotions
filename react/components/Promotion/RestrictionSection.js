import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import {
  RadioGroup,
  Checkbox,
  Input,
  EXPERIMENTAL_Select,
} from 'vtex.styleguide'
import withSalesChannels from '../../connectors/withSalesChannels'

class RestrictionSection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      limitPerStore: !!props.perStore,
      limitPerClient: !!props.perClient,
      limitPerAffectedItems: !!props.maxNumOfAffectedItems,
      restrictTradePolicies: !!props.restrictedSalesChannels,
    }
  }

  isOriginSelected = origin => this.props.restriction.origin === origin

  render() {
    const {
      intl,
      restriction: {
        perStore,
        perClient,
        maxNumOfAffectedItems,
        restrictSalesChannelVerb,
        restrictedSalesChannels,
        origin,
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
        value: 'not.any',
      },
    ]

    return (
      <Fragment>
        <h4 className="t-heading-4 mt0">
          <FormattedMessage id="promotions.promotion.restriction.title" />
        </h4>

        <div className="pv3">
          <Checkbox
            checked={this.state.limitPerStore}
            id="limitPerStoreActivation"
            label={intl.formatMessage({
              id: 'promotions.promotion.restriction.limit.perStore',
            })}
            name="limitPerStoreActivation-checkbox-group"
            onChange={e =>
              this.setState({ limitPerStore: !this.state.limitPerStore })
            }
            value="limitPerStoreActivation"
          />
        </div>

        {this.state.limitPerStore && (
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
                    value: e.target.value,
                  },
                })
              }}
            />
          </div>
        )}

        <div className="pv3">
          <Checkbox
            checked={this.state.limitPerClient}
            id="limitPerClientActivation"
            label={intl.formatMessage({
              id: 'promotions.promotion.restriction.limit.perClient',
            })}
            name="limitPerClientActivation-checkbox-group"
            onChange={e =>
              this.setState({ limitPerClient: !this.state.limitPerClient })
            }
            value="limitPerClientActivation"
          />
        </div>

        {this.state.limitPerClient && (
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
                    value: e.target.value,
                  },
                })
              }}
            />
          </div>
        )}

        <div className="pv3">
          <Checkbox
            checked={this.state.limitPerAffectedItems}
            id="limitPerAffectedItems"
            label={intl.formatMessage({
              id:
                'promotions.promotion.restriction.limit.perAffectedItems.label',
            })}
            name="limitPerAffectedItems-checkbox-group"
            onChange={e =>
              this.setState({
                limitPerAffectedItems: !this.state.limitPerAffectedItems,
              })
            }
            value="limitPerAffectedItems"
          />
        </div>

        {this.state.limitPerAffectedItems && (
          <div className="pv3 pl5 w-30">
            <Input
              placeholder={intl.formatMessage({
                id:
                  'promotions.promotion.restriction.limit.perAffectedItems.placeholder',
              })}
              type="number"
              value={maxNumOfAffectedItems.value}
              errorMessage={maxNumOfAffectedItems.error}
              onChange={e => {
                updatePageState({
                  maxNumOfAffectedItems: {
                    value: e.target.value,
                  },
                })
              }}
            />
          </div>
        )}

        <div className="pv3">
          <Checkbox
            className="pv4"
            checked={this.state.restrictTradePolicies}
            id="restrictTradePolicies"
            label={intl.formatMessage({
              id:
                'promotions.promotion.restriction.restrictTradePolicies.label',
            })}
            name="restrictTradePolicies-checkbox-group"
            onChange={e =>
              this.setState({
                restrictTradePolicies: !this.state.restrictTradePolicies,
              })
            }
            value="restrictTradePolicies"
          />
        </div>

        {this.state.restrictTradePolicies && (
          <div className="pv3 flex flex-row">
            <div className="w-30 pl5">
              <EXPERIMENTAL_Select
                options={verbs}
                value={restrictSalesChannelVerb || verbs[0]}
                loading={loading}
                multi={false}
                onChange={selected => {
                  updatePageState({ restrictSalesChannelVerb: selected })
                }}
              />
            </div>
            <div className="pl2 flex-grow-1">
              <EXPERIMENTAL_Select
                placeholder={intl.formatMessage({
                  id:
                    'promotions.promotion.restriction.restrictTradePolicies.placeholder',
                })}
                options={mappedSalesChannels}
                value={restrictedSalesChannels}
                loading={loading}
                onChange={selected => {
                  updatePageState({ restrictedSalesChannels: selected })
                }}
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
            onChange={event => {
              updatePageState({ origin: event.target.value })
            }}
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
