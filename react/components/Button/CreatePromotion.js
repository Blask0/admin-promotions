import React, { PureComponent } from 'react'
import { Link } from 'render'

import { Button } from 'vtex.styleguide'

class CreatePromotion extends PureComponent {
  render() {
    return (
      <Link to="/admin/promotions/create-promotion">
        <Button variation="primary">Create promotion</Button>
      </Link>
    )
  }
}

export default CreatePromotion
