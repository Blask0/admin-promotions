import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

class FileModal extends Component {
  constructor(props) {
    super(props)
  }

  uploadFile = event => {
    const file = event.target.files[0]
    const { updateFile } = this.props

    updateFile(file)
  }

  render() {
    const { titleId } = this.props

    return (
      <Fragment>
        <h1>
          <FormattedMessage id={titleId} />
        </h1>
        <span>
          <input type="file" onChange={this.uploadFile} />
        </span>
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
  updateFile: PropTypes.func,
}

export default injectIntl(FileModal)
