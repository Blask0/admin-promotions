import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import { Alert, Layout, PageHeader, PageBlock } from 'vtex.styleguide'

import ArchivedPromotionsList from './components/Promotions/ArchivedPromotionsList'

import { getErrorsInfo } from './utils/errors'

class ArchivedPromotionsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
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

  render() {
    const { navigate } = this.context
    const { showError } = this.state
    const { intl, error } = this.props

    const [errorInfo] = getErrorsInfo(error)

    return (
      <Fragment>
        <Layout
          fullWidth
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
              title={intl.formatMessage({
                id: 'promotions.promotion.archived.title',
              })}
              subtitle={intl.formatMessage({
                id: 'promotions.promotion.archived.subtitle',
              })}
            />
          }>
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
          <PageBlock>
            <div className="mt4 w-100">
              <ArchivedPromotionsList />
            </div>
          </PageBlock>
        </Layout>
      </Fragment>
    )
  }
}

ArchivedPromotionsPage.contextTypes = {
  navigate: PropTypes.func,
}

ArchivedPromotionsPage.propTypes = {
  intl: intlShape,
  error: PropTypes.object,
}

export default compose(injectIntl)(ArchivedPromotionsPage)
