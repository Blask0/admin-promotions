import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import { Alert, Layout, PageHeader, PageBlock } from 'vtex.styleguide'

import PromotionsTable from './components/Promotions/PromotionsTable'
import withPromotions from './connectors/withPromotions'
import { getErrorsInfo } from './utils/errors'

class PromotionsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputSearchValue: '',
      showError: true,
    }

    this.alertRef = React.createRef()
  }

  componentDidUpdate() {
    const { showError } = this.state
    const { error } = this.props
    if (error && showError) {
      this.alertRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }

  componentDidMount = () => {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  handleSearchChange = e => {
    this.setState({
      inputSearchValue: e.target.value,
    })
  }

  handleSearchClear = e => {
    this.setState({
      inputSearchValue: '',
    })
    this.props.updateQueryParams({
      name: '',
      effect: '',
    })
  }

  handleSearchSubmit = e => {
    e.preventDefault()

    const { inputSearchValue } = this.state

    this.props.updateQueryParams({
      name: inputSearchValue,
      effect: inputSearchValue,
    })
  }

  handlePromotionDeletion = () => {
    this.props.refetchPromotions()
  }

  render() {
    const { inputSearchValue, showError } = this.state
    const {
      intl,
      promotions = [],
      loading,
      error,
      refetchPromotions,
    } = this.props

    const [errorInfo] = getErrorsInfo(error)

    return (
      <Layout fullWidth pageHeader={<PageHeader title="Promotions" />}>
        {error && showError && (
          <div className="mb5">
            <Alert
              ref={this.alertRef}
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
          <PromotionsTable
            promotions={promotions}
            loading={loading}
            error={error}
            inputSearchValue={inputSearchValue}
            handleSearchChange={this.handleSearchChange}
            handleSearchClear={this.handleSearchClear}
            handleSearchSubmit={this.handleSearchSubmit}
            handlePromotionDeletion={this.handlePromotionDeletion}
          />
        </PageBlock>
      </Layout>
    )
  }
}

PromotionsPage.propTypes = {
  intl: intlShape,
  promotions: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.object,
  loading: PropTypes.bool,
  refetch: PropTypes.func,
  updateQueryParams: PropTypes.func,
}

export default compose(
  withPromotions,
  injectIntl
)(PromotionsPage)
