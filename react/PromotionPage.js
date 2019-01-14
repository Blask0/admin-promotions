import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import {
  Layout,
  PageBlock,
  PageHeader,
  Button,
  Checkbox,
  Input,
  DatePicker,
  Radio,
} from 'vtex.styleguide'

import SelectableCard from './components/SelectableCard'
import Price from './components/Icon/Price'
import Gift from './components/Icon/Gift'
import Shipping from './components/Icon/Shipping'
import Reward from './components/Icon/Reward'

import EligibilitySection from './components/Promotion/EligibilitySection'
import GeneralSection from './components/Promotion/GeneralSection'

import savingPromotion from './connectors/savingPromotion'

class PromotionPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      promotion: {
        generalInfo: {
          hasEndDate: false, // temporary, this should be on promotion json
        },
        effectType: null, // oneOf ['price', 'gift', 'shipping', 'reward']
        eligibility: {
          allCustomers: true,
          statements: [],
          operator: 'all',
        }
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

  handleChangeGeneralInfo = (generalInfo) => {
    this.setState({generalInfo})
  }

  componentDidMount = () => {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  selectEffect = effect => {
    this.setState(prevState => ({
      promotion: {
        ...prevState.promotion,
        effectType: effect,
      },
    }))
  }

  isEffectSelected = effect => this.state.promotion.effectType === effect

  canSave = () => true

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

  render() {
    const { navigate } = this.context
<<<<<<< HEAD
    const { promotion } = this.state
    const { hasEndDate, effect, eligibility } = promotion
    const {
      intl,
      params: { id },
      savePromotion,
    } = this.props
=======
    const { canSave, generalInfo, selectedEffect, allCustomersElligible } = this.state
    const { intl, params: { id } } = this.props
>>>>>>> General Section exported as a component

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
<<<<<<< HEAD
          <GeneralSection/>
=======
          <GeneralSection generalInfo={generalInfo}
              onChange={this.handleChangeGeneralInfo}/>
>>>>>>> General Section exported as a component
        </PageBlock>
        <PageBlock>
          <h4 className="t-heading-4 mt0">
            <FormattedMessage id="promotions.promotion.effects.title" />
          </h4>
          <div className="flex flex-row">
            <div className="mh3">
              <SelectableCard
                selected={this.isEffectSelected('price')}
                onClick={() => this.selectEffect('price')}>
                <div className="flex flex-column items-center center tc ph5">
                  <Price />
                  <div className="t-heading-4 b mt5">
                    <FormattedMessage id="promotions.promotion.effects.price" />
                  </div>
                </div>
              </SelectableCard>
            </div>
            <div className="mh3">
              <SelectableCard
                selected={this.isEffectSelected('gift')}
                onClick={() => this.selectEffect('gift')}>
                <div className="flex flex-column items-center center tc ph5">
                  <Gift />
                  <div className="t-heading-4 b mt5">
                    <FormattedMessage id="promotions.promotion.effects.gift" />
                  </div>
                </div>
              </SelectableCard>
            </div>
            <div className="mh3">
              <SelectableCard
                selected={this.isEffectSelected('shipping')}
                onClick={() => this.selectEffect('shipping')}>
                <div className="flex flex-column items-center center tc ph5">
                  <Shipping />
                  <div className="t-heading-4 b mt5">
                    <FormattedMessage id="promotions.promotion.effects.shipping" />
                  </div>
                </div>
              </SelectableCard>
            </div>
            <div className="mh3">
              <SelectableCard
                selected={this.isEffectSelected('reward')}
                onClick={() => this.selectEffect('reward')}>
                <div className="flex flex-column items-center center tc ph5">
                  <Reward />
                  <div className="t-heading-4 b mt5">
                    <FormattedMessage id="promotions.promotion.effects.reward" />
                  </div>
                </div>
              </SelectableCard>
            </div>
          </div>
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
