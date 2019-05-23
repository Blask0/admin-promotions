import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import { Alert, Layout, PageHeader, PageBlock } from 'vtex.styleguide'

import AccountLimitsAlert from './components/Promotions/AccountLimitsAlert'

import withAccountLimits from './connectors/withAccountLimits'
import withPromotions from './connectors/withPromotions'

import { getErrorsInfo } from './utils/errors'
import PromotionsList from './components/Promotions/PromotionsList'

const TABS = {
  table: 'table',
  trash: 'trash',
}

class PromotionsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentTab: TABS.table,
      showError: true,
    }

    this.errorAlert = {
      ref: React.createRef(),
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
    }
  }

  componentDidMount = () => {
    window.top && window.top.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  handleTabChange = tabKey => {
    this.setState({ currentTab: TABS[tabKey] })
  }

  getArchivedLineActions = () => {}

  isCreationDisabled = () => {
    const { promotions = [], accountLimits } = this.props
    const activePromotions = promotions.filter(({ isActive }) => isActive)
    return (
      accountLimits && activePromotions.length >= accountLimits.activePromotions
    )
  }

  render() {
    const { currentTab, showError } = this.state
    const { intl, error, promotions = [], accountLimits } = this.props

    const [errorInfo] = getErrorsInfo(error)

    return (
      <Fragment>
        <Layout fullWidth pageHeader={<PageHeader title="Promotions" />}>
          {error && showError && (
            <div className="mb5">
              <Alert
                ref={this.errorAlert.ref}
                type="error"
                onClose={() => this.setState({ showError: false })}
                action={{
                  label: intl.formatMessage({
                    id: 'promotions.promotion.error.reload',
                  }),
                  onClick: () => window.location.reload(),
                }}>
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
          {accountLimits && (
            <div className="mb5">
              <AccountLimitsAlert
                promotions={promotions}
                accountLimits={accountLimits}
              />
            </div>
          )}
          <PageBlock>
            <div className="mt4 w-100">
              <PromotionsList creationDisabled={this.isCreationDisabled()} />
            </div>
          </PageBlock>
        </Layout>
      </Fragment>
    )
  }
}

PromotionsPage.propTypes = {
  intl: intlShape,
  error: PropTypes.object,
  loading: PropTypes.bool,
  promotions: PropTypes.arrayOf(PropTypes.object),
}

export default compose(
  withAccountLimits,
  withPromotions,
  injectIntl
)(PromotionsPage)
