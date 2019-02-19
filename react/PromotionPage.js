import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import { Layout, PageBlock, PageHeader, Button } from 'vtex.styleguide'

import EffectsSection from './components/Promotion/EffectsSection'
import EligibilitySection from './components/Promotion/EligibilitySection'
import GeneralSection from './components/Promotion/GeneralSection'
import RestrictionSection from './components/Promotion/RestrictionSection'

import withSalesChannels from './connectors/withSalesChannels'
import savingPromotion from './connectors/savingPromotion'

import { addDays } from 'date-fns'
import { compose } from 'react-apollo'

class PromotionPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      promotion: {
        id: '',
        generalInfo: {
          name: undefined,
          isActive: false,
          startDate: new Date(),
          hasEndDate: false, // temporary, this should be on promotion json
          endDate: addDays(new Date(), 1),
          tz: -new Date().getTimezoneOffset() / 60,
          isArchived: false,
          accumulateWithPromotions: false,
          accumulateWithManualPrices: false,
        },
        eligibility: {
          allCustomers: true,
          statements: [],
          operator: 'all',
        },
        effects: {
          activeEffectType: null, // oneOf ['price', 'gift', 'shipping', 'reward']
          price: {
            discountType: 'nominal', // oneOf ['nominal', 'percentual', 'priceTables']
            discount: '',
            appliesTo: null, // type: statements[], if null: applies to All products
          },
          gift: {
            products: [],
            multiplier: null,
            limitQuantityPerPurchase: null,
          },
          shipping: {
            discountType: 'nominal', // oneOf ['nominal', 'percentual', 'maximumValue']
            discount: '',
          },
          reward: {
            discountType: 'nominal', // oneOf ['nominal', 'percentual']
            discount: undefined,
            applyByOrderStatus: '', // oneOf possible order status
          },
        },
        restriction: {
          perStore: {
            value: undefined,
            error: undefined,
            focus: false,
          },
          perClient: {
            value: undefined,
            error: undefined,
            focus: false,
          },
          maxNumOfAffectedItems: {
            value: undefined,
            error: undefined,
            focus: false,
          },
          restrictSalesChannelVerb: undefined,
          restrictedSalesChannels: [], // idsSalesChannel
          origin: undefined,
        },
      },
    }
  }

  componentDidMount = () => {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  handleGeneralInfoChange = generalInfo => {
    this.setState(prevState => {
      return {
        promotion: {
          ...prevState.promotion,
          generalInfo: {
            ...prevState.promotion.generalInfo,
            ...generalInfo,
          },
        },
      }
    })
  }

  handleEffectsSectionChange = effects => {
    this.setState(prevState => ({
      promotion: {
        ...prevState.promotion,
        effects: {
          ...prevState.promotion.effects,
          ...effects,
        },
      },
    }))
  }

  handleEligibilitySectionChange = eligibility => {
    this.setState(prevState => ({
      promotion: {
        ...prevState.promotion,
        eligibility: {
          ...prevState.promotion.eligibility,
          ...eligibility,
        },
      },
    }))
  }

  handleRestrictionSectionChange = restriction => {
    this.setState(prevState => ({
      promotion: {
        ...prevState.promotion,
        restriction: {
          ...prevState.promotion.restriction,
          ...restriction,
        },
      },
    }))
  }

  componentDidMount = () => {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  selectEffect = effect => {
    this.setState(prevState => ({
      promotion: {
        ...prevState.promotion,
        effects: {
          ...prevState.promotion.effects,
          ...effects,
        },
      },
    }))
  }

  canSave = () => true

  getAffectedSalesChannels = () => {
    const { restrictedSalesChannelsIds, salesChannels } = this.props
    return restrictedSalesChannelsIds && restrictedSalesChannelsIds.length > 0
      ? salesChannels.filter(({ id }) =>
        restrictedSalesChannelsIds.includes(id)
      )
      : salesChannels.filter(({ id }) => id === '1')
  }

  render() {
    const { navigate } = this.context
    const { promotion } = this.state
    const { generalInfo, eligibility, effects, restriction } = promotion
    const {
      intl,
      params: { id },
      savePromotion,
    } = this.props

    const [{ currencyCode } = {}] = this.getAffectedSalesChannels()

    return (
      <Layout
        pageHeader={
          <PageHeader
            linkLabel={intl.formatMessage({
              id: 'promotions.promotion.linkLabel',
            })}
            onLinkClick={() => {
              navigate({
                page: 'admin/index',
              })
            }}
            title={
              id
                ? intl.formatMessage({ id: 'promotions.promotion.title' })
                : intl.formatMessage({ id: 'promotions.promotion.titleNew' })
            }
          />
        }>
        <PageBlock>
          <GeneralSection
            generalInfo={generalInfo}
            updatePageState={this.handleGeneralInfoChange}
          />
        </PageBlock>
        <PageBlock>
          <EffectsSection
            effects={effects}
            updatePageState={this.handleEffectsSectionChange}
            currencyCode={currencyCode}
          />
        </PageBlock>
        <PageBlock>
          <EligibilitySection
            eligibility={eligibility}
            updatePageState={this.handleEligibilitySectionChange}
            currencyCode={currencyCode}
          />
        </PageBlock>
        <PageBlock>
          <RestrictionSection
            restriction={restriction}
            updatePageState={this.handleRestrictionSectionChange}
          />
        </PageBlock>
        {this.canSave() ? (
          <div className="flex flex-row">
            <Button
              variation="primary"
              onClick={() => {
                console.log({
                  ...promotion,
                  eligibility: {
                    ...eligibility,
                    statements: JSON.stringify(eligibility.statements),
                  },
                })

                savePromotion({
                  variables: {
                    promotion: {
                      ...promotion,
                      eligibility: {
                        ...eligibility,
                        statements: JSON.stringify(eligibility.statements),
                      },
                    },
                  },
                })
              }}>
              <FormattedMessage id="promotions.promotion.save" />
            </Button>
            <Button variation="tertiary">
              <FormattedMessage id="promotions.promotion.cancel" />
            </Button>
          </div>
        ) : null}
      </Layout>
    )
  }
}

PromotionPage.contextTypes = {
  navigate: PropTypes.func,
}

PromotionPage.propTypes = {
  intl: intlShape,
  savePromotion: PropTypes.func,
}

export default compose(
  savingPromotion,
  withSalesChannels,
  injectIntl
)(PromotionPage)
