import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

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
        <p>
          Some child content before the action buttons. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Praesent semper eget magna sit amet
          maximus. In rutrum, justo sodales euismod dignissim, justo orci
          venenatis lectus, vel semper turpis nunc a justo.
        </p>
      </Fragment>
    )
  }
}

FileModal.contextTypes = {
  navigate: PropTypes.func,
}

FileModal.propTypes = {
  intl: intlShape,
  titleId: propTypes.string,
}

export default injectIntl(FileModal)
