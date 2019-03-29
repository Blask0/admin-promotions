import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import { Button, ModalDialog, Spinner } from 'vtex.styleguide'
import FileModal from './fileModal'
import { mapProductsToSelect } from '../../utils/mappers'

class BulkImporter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isImportModalOpen: false,
      file: undefined,
      isFileBeingUploaded: false,
    }
  }

  updateFile = file => {
    this.setState({ file })
  }

  handleModalToggle = () => {
    this.setState({ isImportModalOpen: !this.state.isImportModalOpen })
  }

  handleConfirmation = () => {
    const { file } = this.state
    const { updateQueryParams } = this.props

    if (file) {
      const reader = new FileReader()
      reader.onload = (function(that) {
        return function(event) {
          const contents = event.target.result
          const items = contents.split('\n')
          updateQueryParams && updateQueryParams({ ids: items })
          that.setState({ isFileBeingUploaded: true })
        }
      })(this)

      reader.readAsText(file)
    }
  }

  componentDidUpdate = () => {
    const { loading, uploadedFile, update } = this.props
    const { isFileBeingUploaded } = this.state

    if (!loading && isFileBeingUploaded) {
      const options = mapProductsToSelect(uploadedFile.products)
      this.setState({ isFileBeingUploaded: false })
      update(options, uploadedFile.notFound)
      this.setState({ isImportModalOpen: !this.state.isImportModalOpen })
    }
  }

  render() {
    const { modalTitle, productQueryIsLoading } = this.props

    return (
      <Fragment>
        <Button
          variation="tertiary"
          onClick={this.handleModalToggle}
          disabled={productQueryIsLoading}>
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
          <div className="flex flex-row mt5">
            <Spinner
              status={this.state.isFileBeingUploaded ? 'working' : 'idle'}
            />
            {this.state.isFileBeingUploaded && (
              <span>
                <FormattedMessage id="promotions.promotion.import.modal.catalog" />
              </span>
            )}
          </div>
        </ModalDialog>
      </Fragment>
    )
  }
}

BulkImporter.propTypes = {
  intl: intlShape,
  modalTitle: PropTypes.string,
  update: PropTypes.func,
  uploadedFile: PropTypes.object,
  loading: PropTypes.bool,
  updateQueryParams: PropTypes.func,
  productQueryIsLoading: PropTypes.bool,
}

export default injectIntl(BulkImporter)
