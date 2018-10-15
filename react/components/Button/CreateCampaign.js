import React, { PureComponent } from 'react'

import { Button } from 'vtex.styleguide'

class CreateCampaign extends PureComponent {
  render() {
    return (
      <Button
        variation="primary"
        onClick={() => {
          alert('Open new campaign page!')
        }}
      >
        Create campaign
      </Button>
    )
  }
}

export default CreateCampaign
