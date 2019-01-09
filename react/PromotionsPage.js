import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Layout, PageHeader, PageBlock } from 'vtex.styleguide'

import PromotionsTable from './components/Promotions/PromotionsTable';

class PromotionsPage extends Component {
  componentDidMount = () => {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  render() {
    return (
      <Layout 
        fullWidth
        pageHeader={
          <PageHeader title="Promotions" />
        }>
        <PageBlock>
          <PromotionsTable />
        </PageBlock>
      </Layout>
    )
  }
}

PromotionsPage.propTypes = {
  data: PropTypes.object,
  mutate: PropTypes.func,
}

export default PromotionsPage
