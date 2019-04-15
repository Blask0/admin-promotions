import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import {
  Alert,
  Layout,
  ModalDialog,
  PageHeader,
  PageBlock,
  Tab,
  Tabs,
} from 'vtex.styleguide'

import PromotionsTable from './components/Promotions/PromotionsTable'
import AccountLimitsAlert from './components/Promotions/AccountLimitsAlert'

import archivingPromotionById from './connectors/archivingPromotionById'
import withAccountLimits from './connectors/withAccountLimits'
import withPromotions from './connectors/withPromotions'
import withArchivedPromotions from './connectors/withArchivedPromotions'

import { getErrorsInfo } from './utils/errors'
import unarchivePromotionById from './connectors/unarchivingPromotionById'

const TABS = {
  table: 'table',
  trash: 'trash',
}

class PromotionsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentTab: TABS.table,
      showError: true,
      isPromotionModalOpened: false,
    }

    this.errorAlert = {
      ref: React.createRef(),
    }
  }

  componentDidUpdate() {
    const { showError } = this.state
    const { error } = this.props
    if (error && showError) {
      this.errorAlert.ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }

  componentDidMount = () => {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  handleTabChange = tabKey => {
    this.setState({ currentTab: TABS[tabKey] })
  }

  getLineActions = () => {
    const { navigate } = this.context
    const { intl } = this.props
    return [
      {
        label: () =>
          intl.formatMessage({
            id: 'promotions.promotions.actions.duplicate',
          }),
        onClick: ({ rowData: { id } }) => {
          navigate({
            page: 'admin.promotions.PromotionPage',
            params: {
              id: 'new',
              duplicate: id,
            },
          })
        },
      },
      {
        label: () =>
          intl.formatMessage({
            id: 'promotions.promotions.actions.delete',
          }),
        isDangerous: true,
        onClick: ({ rowData: { id, name } }) => {
          this.setState({
            isPromotionModalOpened: true,
            promotionToBeDeleted: {
              id,
              name,
            },
          })
        },
      },
    ]
  }

  getArchivedLineActions = () => {
    const { intl, unarchivePromotionById } = this.props
    return [
      {
        label: () =>
          intl.formatMessage({
            id: 'promotions.promotions.actions.recover',
          }),
        onClick: ({ rowData: { id } }) => {
          unarchivePromotionById({
            variables: {
              id,
            },
          }).then(() => {
            window.postMessage({ action: { type: 'START_LOADING' } }, '*')
            window.location.reload()
          })
        },
      },
    ]
  }

  handlePromotionDeletionModalConfirmed = () => {
    const {
      promotionToBeDeleted: { id },
    } = this.state
    const { archivePromotionById } = this.props
    const archive = archivePromotionById({
      variables: {
        id,
      },
    })
    archive.then(() => {
      window.postMessage({ action: { type: 'START_LOADING' } }, '*')
      window.location.reload()
      this.setState({
        isPromotionModalOpened: false,
        promotionToBeDeleted: undefined,
      })
    })
  }

  handlePromotionDeletionModalCanceled = () => {
    this.setState({
      isPromotionModalOpened: false,
      promotionToBeDeleted: undefined,
    })
  }

  render() {
    const {
      currentTab,
      showError,
      isPromotionModalOpened,
      promotionToBeDeleted: { name: promotionToBeDeletedName } = {},
    } = this.state
    const {
      intl,
      loading,
      error,
      promotions = [],
      updatePromotionsQueryParams,
      archivedPromotionsLoading,
      archivedPromotionsError,
      archivedPromotions = [],
      updateArchivedPromotionsQueryParams,
      accountLimits,
    } = this.props

    const [errorInfo] = getErrorsInfo(error)

    return (
      <Fragment>
        <Layout fullWidth pageHeader={<PageHeader title="Promotions" />}>
          {error && showError && (
            <div className="mb5">
              <Alert
                ref={this.errorAlert.ref}
                type="error"
                onClose={() => this.setState({ showError: false })}
                action={{
                  label: intl.formatMessage({
                    id: 'promotions.promotion.error.reload',
                  }),
                  onClick: () => window.location.reload(),
                }}>
                <div className="flex flex-column">
                  <FormattedMessage
                    id={`promotions.promotion.error.reason.${errorInfo.reason}`}
                  />
                  <span>
                    OperationId: <strong>{errorInfo.operationId}</strong>
                  </span>
                </div>
              </Alert>
            </div>
          )}
          {accountLimits && (
            <div className="mb5">
              <AccountLimitsAlert
                promotions={promotions}
                accountLimits={accountLimits}
              />
            </div>
          )}
          <PageBlock>
            <Tabs>
              <Tab
                label="Promotions"
                active={currentTab === TABS.table}
                onClick={() => this.handleTabChange('table')}>
                <div className="mt4">
                  <PromotionsTable
                    loading={loading}
                    error={error}
                    promotions={promotions}
                    accountLimits={accountLimits}
                    lineActions={this.getLineActions()}
                    updatePromotionsSearchParams={updatePromotionsQueryParams}
                    handlePromotionDeletion={this.handlePromotionDeletion}
                  />
                </div>
              </Tab>
              <Tab
                label="🗑 Trash"
                active={currentTab === TABS.trash}
                onClick={() => this.handleTabChange('trash')}>
                <div className="mt4">
                  <PromotionsTable
                    loading={archivedPromotionsLoading}
                    error={archivedPromotionsError}
                    promotions={archivedPromotions}
                    lineActions={this.getArchivedLineActions()}
                    updatePromotionsSearchParams={
                      updateArchivedPromotionsQueryParams
                    }
                  />
                </div>
              </Tab>
            </Tabs>
          </PageBlock>
        </Layout>

        <ModalDialog
          centered
          confirmation={{
            onClick: this.handlePromotionDeletionModalConfirmed,
            label: intl.formatMessage({
              id: 'promotions.promotions.deletionModal.confirm',
            }),
          }}
          cancelation={{
            onClick: this.handlePromotionDeletionModalCanceled,
            label: intl.formatMessage({
              id: 'promotions.promotions.deletionModal.cancel',
            }),
          }}
          isOpen={isPromotionModalOpened}
          showCloseIcon={false}
          closeOnEsc={false}
          closeOnOverlayClick={false}>
          <h1>
            <FormattedMessage id="promotions.promotions.deletionModal.title" />
          </h1>
          <p>
            <FormattedMessage id="promotions.promotions.deletionModal.text" />
            <strong> {promotionToBeDeletedName}</strong>?
          </p>
        </ModalDialog>
      </Fragment>
    )
  }
}

PromotionsPage.propTypes = {
  intl: intlShape,
  error: PropTypes.object,
  loading: PropTypes.bool,
  promotions: PropTypes.arrayOf(PropTypes.object),
  updatePromotionsQueryParams: PropTypes.func,
  archivedPromotionsError: PropTypes.object,
  archivedPromotionsLoading: PropTypes.bool,
  archivedPromotions: PropTypes.arrayOf(PropTypes.object),
  updateArchivedPromotionsQueryParams: PropTypes.func,
}

export default compose(
  archivingPromotionById,
  unarchivePromotionById,
  withAccountLimits,
  withPromotions,
  withArchivedPromotions,
  injectIntl
)(PromotionsPage)
