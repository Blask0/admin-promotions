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
import Present from './components/Icon/Present'
import Reward from './components/Icon/Reward'
import Truck from './components/Icon/Truck'
import Discount from './components/Icon/Discount'

class Promotion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      canSave: true,
      hasEndDate: false, // temporary, this should be on promotion json
      selectedEffect: null, // oneOf ['price', 'gift', 'shipping', 'reward']
      allCustomersElligible: true ,
    }
  }

  static contextTypes = {
    navigate: PropTypes.func,
  }

  static propTypes = {
    intl: intlShape,
  }

  componentDidMount = () => {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  selectEffect = effect => {
    this.setState({ selectedEffect: effect })
  }

  isEffectSelected = effect => this.state.selectedEffect === effect

  render() {
    const { navigate } = this.context
    const { canSave, hasEndDate, selectedEffect, allCustomersElligible } = this.state
    const { intl, params: { id } } = this.props

    return (
      <Layout
        pageHeader={
          <PageHeader
            linkLabel={intl.formatMessage({ id: 'promotions.promotion.linkLabel' })}
            onLinkClick={() => {
              navigate({
                page: 'admin/index',
              })
            }}
            title={id
              ? intl.formatMessage({ id: 'promotions.promotion.title' })
              : intl.formatMessage({ id: 'promotions.promotion.titleNew' })
            }>
          </PageHeader>
        }>
        <PageBlock>
          <h4 className="t-heading-4 mt0">
            <FormattedMessage id="promotions.promotion.info.title" />
          </h4>
          <Input label={intl.formatMessage({ id: "promotions.promotion.info.name" })} />
          <div className="mv4">
            <DatePicker
              locale={intl.locale}
              onChange={() => {}}
              value={new Date()}
              label={intl.formatMessage({ id: "promotions.promotion.info.startDate" })} />
          </div>
          <Checkbox
            checked={hasEndDate}
            label={intl.formatMessage({ id: "promotions.promotion.info.endDateCheck" })}
            onChange={e => this.setState({ hasEndDate: !hasEndDate })}
          />
          {hasEndDate
            ? <div className="mt4">
                <DatePicker
                  locale={intl.locale}
                  onChange={() => {}}
                  value={new Date() + 7 * 24 * 60 * 60 * 1000}
                  label={intl.formatMessage({ id: "promotions.promotion.info.startDate" })} />
              </div>
            : null
          }
        </PageBlock>
        <PageBlock>
          <h4 className="t-heading-4 mt0">
            <FormattedMessage id="promotions.promotion.effects.title" />
          </h4>
          <div className="flex flex-row">
            <div className="mh3">
              <SelectableCard selected={this.isEffectSelected('price')} onClick={() => this.selectEffect('price')}>
                <div className="flex flex-column items-center center tc ph5">
                  <Discount />
                  <div className="t-heading-4 b mt5">
                    <FormattedMessage id="promotions.promotion.effects.price" />
                  </div>
                </div>
              </SelectableCard>
            </div>
            <div className="mh3">
              <SelectableCard selected={this.isEffectSelected('gift')} onClick={() => this.selectEffect('gift')}>
                <div className="flex flex-column items-center center tc ph5">
                  <Present />
                  <div className="t-heading-4 b mt5">
                    <FormattedMessage id="promotions.promotion.effects.gift" />
                  </div>
                </div>
              </SelectableCard>
            </div>
            <div className="mh3">
              <SelectableCard selected={this.isEffectSelected('shipping')} onClick={() => this.selectEffect('shipping')}>
                <div className="flex flex-column items-center center tc ph5">
                  <Truck />
                  <div className="t-heading-4 b mt5">
                    <FormattedMessage id="promotions.promotion.effects.shipping" />
                  </div>
                </div>
              </SelectableCard>
            </div>
            <div className="mh3">
              <SelectableCard selected={this.isEffectSelected('reward')} onClick={() => this.selectEffect('reward')}>
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
          <h4 className="t-heading-4 mt0">
            <FormattedMessage id="promotions.promotion.elligibility.title" />
          </h4>
          <Radio
            checked={allCustomersElligible}
            label={intl.formatMessage({ id: "promotions.promotion.elligibility.selectAll" })}
            onChange={e => this.setState({ allCustomersElligible: true })}
          />
          <Radio
            checked={!allCustomersElligible}
            label={intl.formatMessage({ id: "promotions.promotion.elligibility.selectSpecific" })}
            onChange={e => this.setState({ allCustomersElligible: false })}
          />
        </PageBlock>
        {
          canSave
            ? <div className="flex flex-row">
                <Button variation="primary">
                  <FormattedMessage id="promotions.promotion.save" />
                </Button>
                <Button variation="tertiary">
                  <FormattedMessage id="promotions.promotion.cancel" />
                </Button>
              </div>
            : null
        }
      </Layout>
    )
  }
}

export default injectIntl(Promotion)
