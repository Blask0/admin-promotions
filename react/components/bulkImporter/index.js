import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import { Button, ModalDialog } from 'vtex.styleguide'
import FileModal from './fileModal'
import withProductsOptions from '../../connectors/withProductsOptions'

class BulkImporter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isImportModalOpen: false,
      file: undefined,
    }
  }

  updateFile = file => {
    this.setState({ file })
  }

  handleModalToggle = () => {
    this.setState({ isImportModalOpen: !this.state.isImportModalOpen })
  }

  handleConfirmation = () => {
    this.handleModalToggle()
    const { file } = this.state
    const { update, updateQueryParams, uploadedFile } = this.props

    // there is a bug when you try to remove one item from select

    // Check why do old ui have to make a post

    if (file) {
      const reader = new FileReader()
      reader.onload = function(event) {
        const contents = event.target.result
        const items = contents.split('\n')
        updateQueryParams &&
          updateQueryParams({
            ids: items,
          })
        console.log(uploadedFile)
        const options = uploadedFile.products.map(product => ({
          label: product.name,
          id: product.id,
        }))
        console.log(options)
        update(options)
      }

      reader.readAsText(file)
    }
  }

  render() {
    const { modalTitle } = this.props

    return (
      <Fragment>
        <Button variation="tertiary" onClick={this.handleModalToggle}>
          <FormattedMessage id="promotions.promotion.import" />
        </Button>
        <ModalDialog
          centered
          confirmation={{
            onClick: this.handleConfirmation,
            label: 'Ok',
          }}
          cancelation={{
            onClick: this.handleModalToggle,
            label: 'Cancel',
          }}
          isOpen={this.state.isImportModalOpen}
          onClose={this.handleModalToggle}>
          <FileModal titleId={modalTitle} updateFile={this.updateFile} />
        </ModalDialog>
      </Fragment>
    )
  }
}

BulkImporter.propTypes = {
  intl: intlShape,
  update: PropTypes.func,
  uploadedFile: PropTypes.object,
  updateQueryParams: PropTypes.func,
}

export default withProductsOptions(injectIntl(BulkImporter))
