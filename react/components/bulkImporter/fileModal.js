import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import { Button } from 'vtex.styleguide'

class FileModal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { titleId } = this.props

    return (
      <Fragment>
        <h1>
          <FormattedMessage id={titleId} />
        </h1>
        <Button variation="primary">
          <FormattedMessage id="promotions.promotion.import.modal.chooseFile" />
        </Button>
      </Fragment>
    )
  }
}

FileModal.contextTypes = {
  navigate: PropTypes.func,
}

FileModal.propTypes = {
  intl: intlShape,
  titleId: PropTypes.string,
}

export default injectIntl(FileModal)
