import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import { Layout, PageHeader, PageBlock } from 'vtex.styleguide'

import PromotionsTable from './components/Promotions/PromotionsTable'
import withPromotions from './connectors/withPromotions'
import { getErrorReasons } from './utils/errors'

class PromotionsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputSearchValue: '',
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
    const { inputSearchValue } = this.state
    const { intl, promotions = [], loading, error } = this.props

    const [errorReason] = getErrorReasons(error)
    const emptyPromotionsLabel = error
      ? intl.formatMessage({
        id: `promotions.promotion.error.reason.${errorReason}`,
      })
      : intl.formatMessage({
        id: 'promotions.promotions.table.emptyLabel',
      })

    return (
      <Layout fullWidth pageHeader={<PageHeader title="Promotions" />}>
        <PageBlock>
          <PromotionsTable
            promotions={promotions}
            loading={loading}
            emptyPromotionsLabel={emptyPromotionsLabel}
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

export default withPromotions(injectIntl(PromotionsPage))
