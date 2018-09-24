import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {compose, graphql} from 'react-apollo'

import getCampaigns from './graphql/getCampaigns.graphql'

class Campaigns extends Component {
  render() {

    return (
      <div>
        Hello world
      </div>
    )
  }
}

Campaigns.propTypes = {
  data: PropTypes.object,
  mutate: PropTypes.func
}

//export default Campaigns
export default compose(
  graphql(getCampaigns, {
    options: ({ params }) => ({
      ssr: false,
      variables: { conditionType: "campaigns" },
    }),
  })
)(Campaigns)
