import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'

import {
  Layout,
  PageBlock,
  PageHeader,
  Button,
  Alert,
  withToast,
} from 'vtex.styleguide'

import EffectsSection from './components/Promotion/EffectsSection'
import EligibilitySection from './components/Promotion/EligibilitySection'
import GeneralSection from './components/Promotion/GeneralSection'
import RestrictionSection from './components/Promotion/RestrictionSection'

import withSalesChannels from './connectors/withSalesChannels'
import withPromotion from './connectors/withPromotion'
import savingPromotion from './connectors/savingPromotion'

import { newPromotion, prepareToSave } from './utils/promotion'
import { isTimeValid, isToBeforeFrom } from './utils/promotion/recurrency'
import { getErrorsInfo } from './utils/errors'
import {
  validateGeneralInfoSection,
  validateEffectsSection,
  validateRestrictionSection,
  validateEligibilitySection,
  getUniqueCurrencyCodes,
} from './utils/promotion/validation'

class PromotionPage extends Component {
  constructor(props) {
    super(props)

    const { intl, promotion, salesChannels } = props

    this.state = {
      promotion: newPromotion(intl, promotion, salesChannels),
      isSaving: false,
      showError: true,
    }

    this.multipleCurrencies = {
      ref: React.createRef(),
      focus: false,
    }

    this.errorAlert = {
      ref: React.createRef(),
      focus: false,
    }
  }

  componentDidUpdate() {
    const { showError } = this.state
    const { error } = this.props
    if (error && showError) {
      this.errorAlert.ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
      this.errorAlert.focus = false
    }

    if (this.multipleCurrencies.focus) {
      this.multipleCurrencies.ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
      this.multipleCurrencies.focus = false
    }
  }

  componentDidMount() {
    window.top &&
      window.top.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
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

  canSave = () => {
    const { promotion } = this.state
    const { intl, salesChannels } = this.props

    const {
      generalInfo,
      isValid: isGeneralInfoValid,
    } = validateGeneralInfoSection(promotion.generalInfo, intl)

    const { effects, isValid: isEffectsValid } = validateEffectsSection(
      promotion.effects,
      intl
    )

    const {
      eligibility,
      isValid: isEligibilityValid,
    } = validateEligibilitySection(promotion.eligibility, intl)

    const {
      restriction,
      isValid: isRestrictionValid,
    } = validateRestrictionSection(promotion.restriction, salesChannels, intl)

    this.setState(prevState => ({
      promotion: {
        ...prevState.promotion,
        generalInfo,
        effects,
        restriction,
        eligibility,
      },
    }))

    return (
      isGeneralInfoValid &&
      isEffectsValid &&
      isEligibilityValid &&
      isRestrictionValid
    )
  }

  handleSave = promotion => {
    this.setState({ isSaving: true, showError: true })
    this.errorAlert.focus = true
    const { navigate } = this.context
    const { savePromotion, intl } = this.props
    const preparedPromotion = prepareToSave(promotion, intl)
    savePromotion({
      variables: {
        promotion: preparedPromotion,
      },
    })
      .then(() => {
        navigate({
          page: 'admin.app.promotions',
        })
        window.top &&
          window.top.postMessage({ action: { type: 'START_LOADING' } }, '*')
      })
      .finally(() => this.setState({ isSaving: false }))
  }

  render() {
    const { navigate } = this.context
    const { promotion, isSaving, showError } = this.state
    const { generalInfo, eligibility, effects, restriction } = promotion
    const {
      intl,
      params: { id },
      loading,
      error,
      salesChannels,
    } = this.props

    const [errorInfo] = getErrorsInfo(error)

    const uniqueCurrencyCodes = getUniqueCurrencyCodes(
      restriction,
      salesChannels
    )

    const currencyCode =
      uniqueCurrencyCodes.length === 1 ? uniqueCurrencyCodes[0] : undefined

    return loading ? null : (
      <Layout
        pageHeader={
          <PageHeader
            linkLabel={intl.formatMessage({
              id: 'promotions.promotion.linkLabel',
            })}
            onLinkClick={() => {
              navigate({
                page: 'admin.app.promotions',
              })
            }}
            title={
              id
                ? intl.formatMessage({ id: 'promotions.promotion.title' })
                : intl.formatMessage({ id: 'promotions.promotion.titleNew' })
            }
          />
        }>
        {error && showError && (
          <div className="mb5">
            <Alert
              ref={this.errorAlert.ref}
              type="error"
              onClose={() => this.setState({ showError: false })}>
              <div className="flex flex-column">
                <FormattedMessage
                  id={`promotions.promotion.error.reason.${errorInfo.reason}`}
                />
                <span>
                  OperationId: <strong>{errorInfo.operationId}</strong>
                </span>
              </div>
            </Alert>
          </div>
        )}
        {!loading && !currencyCode ? (
          <div className="mb5">
            <Alert
              ref={this.multipleCurrencies.ref}
              type={
                restriction.restrictedSalesChannels.error ? 'error' : 'warning'
              }
              action={{
                label: intl.formatMessage({
                  id: 'promotions.promotion.multipleCurrencies.action',
                }),
                onClick: () => {
                  this.setState(
                    ({ promotion }) => ({
                      promotion: {
                        ...promotion,
                        restriction: {
                          ...promotion.restriction,
                          isRestrictingSalesChannels: true,
                        },
                      },
                    }),
                    () => {
                      restriction.restrictedSalesChannels.ref.current.focus()
                    }
                  )
                },
              }}>
              <FormattedMessage
                id={`promotions.promotion.multipleCurrencies.${
                  restriction.restrictedSalesChannels.error
                    ? 'error'
                    : 'warning'
                }`}
                values={{
                  currencies: uniqueCurrencyCodes.join(', '),
                }}
              />
            </Alert>
          </div>
        ) : null}
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
        <div className="flex flex-row">
          <Button
            variation="primary"
            isLoading={isSaving}
            onClick={() => {
              if (this.canSave()) {
                this.handleSave(promotion)
              }
            }}>
            <FormattedMessage id="promotions.promotion.save" />
          </Button>
          <Button variation="tertiary">
            <FormattedMessage id="promotions.promotion.cancel" />
          </Button>
        </div>
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
  withSalesChannels,
  withPromotion,
  savingPromotion,
  withToast,
  injectIntl
)(PromotionPage)
