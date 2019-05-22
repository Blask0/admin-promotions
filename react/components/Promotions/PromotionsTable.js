import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import { Table } from 'vtex.styleguide'

import { sortPromotions } from '../../utils/promotions'

class PromotionsTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataSort: {
        sortedBy: null,
        sortOrder: null,
      },
      inputSearchValue: '',
    }
  }

  handleSearchChange = e => {
    this.setState({
      inputSearchValue: e.target.value,
    })
  }

  handleSearchClear = e => {
    this.setState(
      {
        inputSearchValue: '',
      },
      () => this.handleSearchSubmit(e)
    )
  }

  handleSearchSubmit = e => {
    e.preventDefault()

    const { inputSearchValue } = this.state

    this.props.onSearch({
      name: inputSearchValue,
      effect: inputSearchValue,
    })
  }

  handleSort = ({ sortOrder, sortedBy }) => {
    this.setState({
      dataSort: {
        sortedBy,
        sortOrder,
      },
    })
  }

  render() {
    const { navigate } = this.context
    const { dataSort, inputSearchValue } = this.state
    const {
      creationDisabled,
      emptyStateLabel,
      extraActions,
      intl,
      lineActions,
      loading,
      noNewLine,
      onRowClick,
      promotions,
      schema,
    } = this.props

    return (
      <div>
        <Table
          density="low"
          schema={schema}
          loading={loading}
          emptyStateLabel={emptyStateLabel}
          items={sortPromotions(promotions, dataSort)}
          onRowClick={onRowClick}
          toolbar={{
            inputSearch: {
              value: inputSearchValue,
              placeholder: intl.formatMessage({
                id: 'promotions.promotions.search',
              }),
              onChange: this.handleSearchChange,
              onClear: this.handleSearchClear,
              onSubmit: this.handleSearchSubmit,
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
            extraActions: extraActions,
            newLine: noNewLine
              ? null
              : {
                label: intl.formatMessage({
                  id: 'promotions.promotions.newPromotion',
                }),
                handleCallback: () => {
                  navigate({
                    page: 'admin.app.promotion',
                    params: {
                      id: 'new',
                    },
                  })
                },
                disabled: creationDisabled,
                actions: [
                  {
                    label: intl.formatMessage({
                      id: 'promotions.promotions.newPromotion.regular',
                    }),
                    onClick: () =>
                      navigate({
                        to: '/admin/rnb/#/benefit/new?type=regular',
                      }),
                  },
                  {
                    label: intl.formatMessage({
                      id: 'promotions.promotions.newPromotion.combo',
                    }),
                    onClick: () =>
                      navigate({
                        to: '/admin/rnb/#/benefit/new?type=combo',
                      }),
                  },
                  {
                    label: intl.formatMessage({
                      id: 'promotions.promotions.newPromotion.forThePriceOf',
                    }),
                    onClick: () =>
                      navigate({
                        to: '/admin/rnb/#/benefit/new?type=forThePriceOf',
                      }),
                  },
                  {
                    label: intl.formatMessage({
                      id: 'promotions.promotions.newPromotion.progressive',
                    }),
                    onClick: () =>
                      navigate({
                        to: '/admin/rnb/#/benefit/new?type=progressive',
                      }),
                  },
                  {
                    label: intl.formatMessage({
                      id: 'promotions.promotions.newPromotion.buyAndWin',
                    }),
                    onClick: () =>
                      navigate({
                        to: '/admin/rnb/#/benefit/new?type=buyAndWin',
                      }),
                  },
                ],
              },
          }}
          sort={dataSort}
          onSort={this.handleSort}
          lineActions={lineActions}
          fullWidth
        />
      </div>
    )
  }
}

PromotionsTable.contextTypes = {
  navigate: PropTypes.func,
}

PromotionsTable.propTypes = {
  creationDisabled: PropTypes.bool,
  emptyStateLabel: PropTypes.string,
  extraActions: PropTypes.shape({
    label: PropTypes.string,
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        handleCallback: PropTypes.func.isRequired,
      })
    ).isRequired,
  }),
  intl: intlShape,
  lineActions: PropTypes.shape({
    isDangerous: PropTypes.bool,
    label: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
  loading: PropTypes.bool,
  noNewLine: PropTypes.bool,
  promotions: PropTypes.arrayOf(PropTypes.object).isRequired,
  schema: PropTypes.object.isRequired,
}

export default PromotionsTable
