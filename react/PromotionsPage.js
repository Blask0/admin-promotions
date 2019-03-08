import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Layout, PageHeader, PageBlock, Button } from 'vtex.styleguide'

import PromotionsTable from './components/Promotions/PromotionsTable'
import withPromotions from './connectors/withPromotions'

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

  render() {
    const { inputSearchValue } = this.state
    const { promotions = [], loading } = this.props

    return (
      <Layout fullWidth pageHeader={<PageHeader title="Promotions" />}>
        <PageBlock>
          <PromotionsTable
            promotions={promotions}
            loading={loading}
            inputSearchValue={inputSearchValue}
            handleSearchChange={this.handleSearchChange}
            handleSearchClear={this.handleSearchClear}
            handleSearchSubmit={this.handleSearchSubmit}
          />
        </PageBlock>
      </Layout>
    )
  }
}

PromotionsPage.propTypes = {
  promotions: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.object,
  loading: PropTypes.bool,
  updateQueryParams: PropTypes.func,
}

export default withPromotions(PromotionsPage)
