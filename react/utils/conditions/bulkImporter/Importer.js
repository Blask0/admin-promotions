import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import { Button } from 'vtex.styleguide'
import FileModal from './fileModal'

class Importer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isImportModalOpen: false,
    }
  }

  handleModalToggle = () => {
    this.setState({ isImportModalOpen: !isImportModalOpen })
  }

  render() {
    const {} = this.props

    return (
      <Fragment>
        <Button variation="tertiary" onClick={this.handleModalToggle}>
          Import
        </Button>
        <ModalDialog
          centered
          confirmation={{
            onClick: this.handleModalToggle,
            label: 'Ok',
          }}
          cancelation={{
            onClick: this.handleModalToggle,
            label: 'Cancel',
          }}
          isOpen={this.state.isImportModalOpen}
          onClose={this.handleModalToggle}>
          <FileModal />
        </ModalDialog>
      </Fragment>
    )
  }
}

Importer.contextTypes = {
  navigate: PropTypes.func,
}

Importer.propTypes = {
  intl: intlShape,
}

export default injectIntl(Importer)
