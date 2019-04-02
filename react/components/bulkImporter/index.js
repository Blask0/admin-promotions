import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import { Button, ModalDialog, Spinner } from 'vtex.styleguide'
import FileModal from './fileModal'
import {
  mapProductsToSelect,
  mapSkusToSelect,
  mapBrandsToSelect,
  mapCategoriesToSelect,
  mapCollectionsToSelect,
} from '../../utils/mappers'

class BulkImporter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isImportModalOpen: false,
      file: undefined,
      isFileBeingUploaded: false,
      mappers: {
        product: mapProductsToSelect,
        sku: mapSkusToSelect,
        brand: mapBrandsToSelect,
        category: mapCategoriesToSelect,
        collection: mapCollectionsToSelect,
      },
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
    const { updateQueryParams, name } = this.props

    if (file) {
      const reader = new FileReader()
      reader.onload = (function(that) {
        return function(event) {
          const contents = event.target.result
          const items = contents.split('\n')
          updateQueryParams && updateQueryParams({ ids: items, field: name })
          that.setState({ isFileBeingUploaded: true })
        }
      })(this)

      reader.readAsText(file)
    }
  }

  componentDidUpdate = () => {
    const { loading, bulkInfo, update, name } = this.props
    const { isFileBeingUploaded, mappers } = this.state

    if (!loading && isFileBeingUploaded && bulkInfo) {
      const options = bulkInfo ? mappers[name](bulkInfo.uploadedInfo) : []

      this.setState({
        isFileBeingUploaded: false,
        isImportModalOpen: !this.state.isImportModalOpen,
      })

      update(options, bulkInfo.notFound)
    }
  }

  render() {
    const { productQueryIsLoading, name } = this.props
    const formattedMessageId = `promotions.promotion.import.modal.title.${name}`

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
          <FileModal
            titleId={formattedMessageId}
            updateFile={this.updateFile}
          />
          {this.state.isFileBeingUploaded && (
            <div className="flex items-center mt7">
              <Spinner />
              <div className="ml5">
                <FormattedMessage id="promotions.promotion.import.modal.catalog" />
              </div>
            </div>
          )}
        </ModalDialog>
      </Fragment>
    )
  }
}

BulkImporter.propTypes = {
  intl: intlShape,
  update: PropTypes.func,
  bulkInfo: PropTypes.object,
  loading: PropTypes.bool,
  updateQueryParams: PropTypes.func,
  productQueryIsLoading: PropTypes.bool,
  name: PropTypes.string,
}

export default injectIntl(BulkImporter)
