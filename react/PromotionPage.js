import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import { Layout, PageBlock, PageHeader, Button, Radio } from 'vtex.styleguide'

import EffectsSection from './components/Promotion/EffectsSection'
import EligibilitySection from './components/Promotion/EligibilitySection'
import GeneralSection from './components/Promotion/GeneralSection'

import savingPromotion from './connectors/savingPromotion'
import { addDays } from 'date-fns'

class PromotionPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      promotion: {
        generalInfo: {
          name: undefined,
          status: undefined,
          startDate: new Date(),
          hasEndDate: false, // temporary, this should be on promotion json
          endDate: addDays(new Date(), 1),
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
            discount: '',
            applyByOrderStatus: '', // oneOf possible order status
          },
        },
      },
    }
  }

  static contextTypes = {
    navigate: PropTypes.func,
  }

  static propTypes = {
    intl: intlShape,
    savePromotion: PropTypes.func,
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

  canSave = () => true

  render() {
    const { navigate } = this.context
    const { promotion } = this.state
    const { generalInfo, eligibility, effects } = promotion
    const {
      intl,
      params: { id },
      savePromotion,
    } = this.props

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
          />
        </PageBlock>
        <PageBlock>
          <EligibilitySection
            eligibility={eligibility}
            updatePageState={this.handleEligibilitySectionChange}
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

export default savingPromotion(injectIntl(PromotionPage))
