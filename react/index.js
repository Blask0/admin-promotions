import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Layout, PageHeader, PageBlock } from 'vtex.styleguide'

import PromotionsList from './components/Promotions/PromotionsList';

class Promotions extends Component {
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
          <PromotionsList />
        </PageBlock>
      </Layout>
    )
  }
}

Promotions.propTypes = {
  data: PropTypes.object,
  mutate: PropTypes.func,
}

export default Promotions
