import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import { Tag, Table, ModalDialog } from 'vtex.styleguide'
import { PromotionActivationToggle } from './PromotionActivationToggle'

import Price from '../Icon/Price'
import Gift from '../Icon/Gift'
import Shipping from '../Icon/Shipping'
import Reward from '../Icon/Reward'

import { toDate, format } from 'date-fns'

import archivingPromotionById from '../../connectors/archivingPromotionById'
import { compose } from 'react-apollo'

class PromotionsTable extends Component {
  constructor(props) {
    super(props)

    const { promotions } = props

    this.state = {
      orderedPromotions: promotions,
      dataSort: {
        sortedBy: null,
        sortOrder: null,
      },
      isPromotionModalOpened: false,
    }
  }

  componentDidUpdate = prevProps => {
    const { loading: prevLoading } = prevProps
    const { loading, promotions } = this.props
    if (prevLoading !== loading) {
      this.setState({ orderedPromotions: promotions })
    }
  }

  handlePromotionActivation = () => {
    const {
      dataSort: { sortedBy, sortOrder },
    } = this.state
    this.handleSort({ sortOrder, sortedBy })
  }

  getTableSchema = intl => ({
    properties: {
      activation: {
        title: ' ',
        width: 60,
        cellRenderer: ({ rowData: promotion }) => (
          <PromotionActivationToggle
            promotion={promotion}
            onActivationChange={this.handlePromotionActivation}
          />
        ),
      },
      name: {
        type: 'string',
        title: intl.formatMessage({
          id: 'promotions.promotion.generalInfo.name',
        }),
        sortable: true,
      },
      effectType: {
        type: 'string',
        title: intl.formatMessage({
          id: 'promotions.promotion.effects.title',
        }),
        sortable: true,
        cellRenderer: ({ cellData: effectType }) => {
          return (
            <div className="dt">
              {this.getEffectIcon(effectType)}
              <span className="dtc v-mid pl3">{effectType}</span>
            </div>
          )
        },
      },
      scope: {
        type: 'string',
        title: intl.formatMessage({
          id: 'promotions.promotion.effects.scope.title',
        }),
      },
      beginDate: {
        type: 'string',
        title: intl.formatMessage({
          id: 'promotions.promotion.generalInfo.startDate',
        }),
        sortable: true,
        cellRenderer: ({ cellData: beginDate }) => {
          const date = format(toDate(beginDate), 'PP')
          const time = format(toDate(beginDate), 'p')
          return (
            <div>
              <div className="dt">
                <span className="dtc v-mid">{date}</span>
              </div>
              <div className="dt">
                <span className="dtc v-mid">{time}</span>
              </div>
            </div>
          )
        },
      },
      endDate: {
        type: 'string',
        title: intl.formatMessage({
          id: 'promotions.promotion.generalInfo.endDate',
        }),
        sortable: true,
        cellRenderer: ({ cellData: endDate }) => {
          if (!endDate) {
            return (
              <div className="dt">
                <span className="dtc v-mid">-</span>
              </div>
            )
          }
          const date = format(toDate(endDate), 'PP')
          const time = format(toDate(endDate), 'p')
          return (
            <div>
              <div className="dt">
                <span className="dtc v-mid">{date}</span>
              </div>
              <div className="dt">
                <span className="dtc v-mid">{time}</span>
              </div>
            </div>
          )
        },
      },
      isActive: {
        type: 'boolean',
        title: 'Status',
        cellRenderer: ({ cellData: isActive }) => {
          const badgeProps = isActive
            ? { bgColor: '#8BC34A', color: '#FFFFFF', children: 'Active' }
            : { bgColor: '#727273', color: '#FFFFFF', children: 'Inactive' }
          return <Tag {...badgeProps} />
        },
      },
    },
  })

  getTableLineActions = () => {
    const { intl } = this.props
    const { navigate } = this.context
    return [
      {
        label: () =>
          intl.formatMessage({
            id: 'promotions.promotions.actions.duplicate',
          }),
        onClick: ({ rowData: { id } }) => {
          navigate({
            page: 'admin/promotion',
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

  getEffectIcon = effectType => {
    switch (effectType) {
      case 'Price':
        return <Price />
      case 'Gift':
        return <Gift />
      case 'Shipping':
        return <Shipping />
      case 'Reward':
        return <Reward />
    }
  }

  sortNameAlphapeticallyASC = (a, b) => {
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
  }

  sortNameAlphapeticallyDESC = (a, b) => {
    return a.name < b.name ? 1 : a.name > b.name ? -1 : 0
  }

  sortEffectAlphapeticallyASC = (a, b) => {
    return a.effectType < b.effectType
      ? -1
      : a.effectType > b.effectType
        ? 1
        : 0
  }

  sortEffectAlphapeticallyDESC = (a, b) => {
    return a.effectType < b.effectType
      ? 1
      : a.effectType > b.effectType
        ? -1
        : 0
  }

  sortStartDateASC = (a, b) => {
    return new Date(a.beginDate).getTime() < new Date(b.beginDate).getTime()
      ? -1
      : new Date(a.beginDate).getTime() > new Date(b.beginDate).getTime()
        ? 1
        : 0
  }

  sortStartDateDESC = (a, b) => {
    return new Date(a.beginDate).getTime() < new Date(b.beginDate).getTime()
      ? 1
      : new Date(a.beginDate).getTime() > new Date(b.beginDate).getTime()
        ? -1
        : 0
  }

  sortEndDateASC = (a, b) => {
    return new Date(a.endDate).getTime() < new Date(b.endDate).getTime()
      ? -1
      : new Date(a.endDate).getTime() > new Date(b.endDate).getTime()
        ? 1
        : 0
  }

  sortEndDateDESC = (a, b) => {
    return new Date(a.endDate).getTime() < new Date(b.endDate).getTime()
      ? 1
      : new Date(a.endDate).getTime() > new Date(b.endDate).getTime()
        ? -1
        : 0
  }

  handleSort = ({ sortOrder, sortedBy }) => {
    const { promotions } = this.props
    if (sortedBy === 'name') {
      const orderedPromotions =
        sortOrder === 'ASC'
          ? promotions.slice().sort(this.sortNameAlphapeticallyASC)
          : promotions.slice().sort(this.sortNameAlphapeticallyDESC)

      this.setState({
        orderedPromotions,
        dataSort: {
          sortedBy,
          sortOrder,
        },
      })
    } else if (sortedBy === 'effectType') {
      const orderedPromotions =
        sortOrder === 'ASC'
          ? promotions.slice().sort(this.sortEffectAlphapeticallyASC)
          : promotions.slice().sort(this.sortEffectAlphapeticallyDESC)

      this.setState({
        orderedPromotions,
        dataSort: {
          sortedBy,
          sortOrder,
        },
      })
    } else if (sortedBy === 'beginDate') {
      const orderedPromotions =
        sortOrder === 'ASC'
          ? promotions.slice().sort(this.sortStartDateASC)
          : promotions.slice().sort(this.sortStartDateDESC)

      this.setState({
        orderedPromotions,
        dataSort: {
          sortedBy,
          sortOrder,
        },
      })
    } else if (sortedBy === 'endDate') {
      const orderedPromotions =
        sortOrder === 'ASC'
          ? promotions.slice().sort(this.sortEndDateASC)
          : promotions.slice().sort(this.sortEndDateDESC)

      this.setState({
        orderedPromotions,
        dataSort: {
          sortedBy,
          sortOrder,
        },
      })
    } else {
      this.setState({
        orderedPromotions: promotions,
        dataSort: {
          sortedBy,
          sortOrder,
        },
      })
    }
  }

  handlePromotionDeletionModalConfirmed = () => {
    const {
      promotionToBeDeleted: { id, name },
    } = this.state
    const { archivePromotionById, handlePromotionDeletion } = this.props
    const archive = archivePromotionById({
      variables: {
        id,
      },
    })
    archive.then(response => {
      handlePromotionDeletion()
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
    const { navigate } = this.context
    const {
      intl,
      loading,
      inputSearchValue,
      handleSearchChange,
      handleSearchClear,
      handleSearchSubmit,
    } = this.props
    const {
      orderedPromotions,
      dataSort: { sortOrder, sortedBy },
      isPromotionModalOpened,
      promotionToBeDeleted: { name: promotionToBeDeletedName } = {},
    } = this.state
    const schema = this.getTableSchema(intl)

    return (
      <div>
        <Table
          schema={schema}
          items={orderedPromotions}
          density="low"
          loading={loading}
          onRowClick={({ rowData: { id } }) => {
            navigate({
              page: 'admin/promotion',
              params: {
                id: id,
              },
            })
          }}
          toolbar={{
            inputSearch: {
              value: inputSearchValue,
              placeholder: intl.formatMessage({
                id: 'promotions.promotions.search',
              }),
              onChange: handleSearchChange,
              onClear: handleSearchClear,
              onSubmit: handleSearchSubmit,
            },
            fields: {
              label: intl.formatMessage({
                id: 'promotions.promotions.table.filter.label',
              }),
              showAllLabel: intl.formatMessage({
                id: 'promotions.promotions.table.filter.showAll',
              }),
              hideAllLabel: intl.formatMessage({
                id: 'promotions.promotions.table.filter.hideAll',
              }),
            },
            newLine: {
              label: intl.formatMessage({
                id: 'promotions.promotions.newPromotion',
              }),
              handleCallback: () => {
                navigate({
                  page: 'admin/promotion',
                  params: {
                    id: 'new',
                  },
                })
              },
            },
          }}
          sort={{
            sortedBy: this.state.dataSort.sortedBy,
            sortOrder: this.state.dataSort.sortOrder,
          }}
          onSort={this.handleSort}
          lineActions={this.getTableLineActions()}
          fullWidth
        />

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
      </div>
    )
  }
}

PromotionsTable.contextTypes = {
  navigate: PropTypes.func,
}

PromotionsTable.propTypes = {
  intl: intlShape,
  promotions: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  inputSearchValue: PropTypes.string,
  handleSearchChange: PropTypes.func,
  handleSearchClear: PropTypes.func,
  handleSearchSubmit: PropTypes.func,
  handlePromotionDeletion: PropTypes.func,
}

export default compose(
  archivingPromotionById,
  injectIntl
)(PromotionsTable)
