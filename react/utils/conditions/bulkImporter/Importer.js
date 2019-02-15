import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import { Button } from 'vtex.styleguide'

class Importer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {} = this.props

    return (
      <Fragment>
        <Button variation="tertiary">Import</Button>
      </Fragment>
    )
  }
}

EligibilitySection.contextTypes = {
  navigate: PropTypes.func,
}

EligibilitySection.propTypes = {
  intl: intlShape,
}

export default injectIntl(Importer)
