import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Layout, PageHeader, PageBlock, Tabs, Tab } from 'vtex.styleguide'

import PromotionsTable from './components/Promotions/PromotionsTable'
import withPromotions from './connectors/withPromotions'
import PromotionsGantt from './components/Promotions/PromotionsGantt'

const TABS = {
  table: 'table',
  gantt: 'gantt',
}

class PromotionsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentTab: TABS.table,
    }
  }

  componentDidMount = () => {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  handlePromotionDeletion = () => {
    this.props.refetchPromotions()
  }

  handleTabChange = tabKey => {
    this.setState({ currentTab: TABS[tabKey] })
  }

  render() {
    const { currentTab } = this.state
    const { promotions = [], loading, updateQueryParams } = this.props

    return (
      <Layout fullWidth pageHeader={<PageHeader title="Promotions" />}>
        <PageBlock>
          <div>
            <Tabs>
              <Tab
                label="Table"
                active={currentTab === TABS.table}
                onClick={() => this.handleTabChange('table')}>
                <div className="mt4">
                  <PromotionsTable
                    promotions={promotions}
                    loading={loading}
                    updatePromotionsSearchParams={updateQueryParams}
                    handlePromotionDeletion={this.handlePromotionDeletion}
                  />
                </div>
              </Tab>
              <Tab
                label="Gantt"
                active={currentTab === TABS.gantt}
                onClick={() => this.handleTabChange('gantt')}>
                <div className="mt4">
                  <PromotionsGantt promotions={promotions} />
                </div>
              </Tab>
            </Tabs>
          </div>
        </PageBlock>
      </Layout>
    )
  }
}

PromotionsPage.propTypes = {
  promotions: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.object,
  loading: PropTypes.bool,
  refetch: PropTypes.func,
  updateQueryParams: PropTypes.func,
}

export default withPromotions(PromotionsPage)
