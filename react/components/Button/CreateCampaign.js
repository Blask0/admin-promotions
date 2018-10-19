import React, { PureComponent } from 'react'
import { Link } from 'render'

import { Button } from 'vtex.styleguide'

class CreateCampaign extends PureComponent {
  render() {
    return (
      <Link to="/admin/campaigns/create-campaign">
        <Button variation="primary">Create campaign</Button>
      </Link>
    )
  }
}

export default CreateCampaign
