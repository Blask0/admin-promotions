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
      limitPerStore: false,
      limitPerClient: false,
    }
  }

  isOriginSelected = origin => this.props.restriction.origin === origin

  render() {
    const {
      intl,
      restriction: {
        limitPerAffectedItems,
        perStore,
        perClient,
        maxNumOfAffectedItems,
        restrictTradePolicies,
        restrictionVerb,
        restrictedTradePolicies,
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
          <div className="pl5 w-20 pv3">
            <Input
              placeholder=""
              type="number"
              value={perStore}
              onChange={e => {
                updatePageState({ perStore })
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
          <div className="pv3 pl5 w-20">
            <Input
              placeholder=""
              type="number"
              value={perClient}
              onChange={e => {
                updatePageState({ perClient })
              }}
            />
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
          <div className="pl5 w-20 pv3">
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
