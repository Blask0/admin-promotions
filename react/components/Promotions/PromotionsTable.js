import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import omitBy from 'lodash/omitBy'

import { Table } from 'vtex.styleguide'

import {
  filterPromotions,
  sortPromotions,
  paginate,
} from '../../utils/promotions'

import { getFilterOptions } from '../utils/filterBarUtils'

const ROWS_PER_PAGE_OPTIONS = [5, 10, 15, 25]

class PromotionsTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataSort: {
        sortedBy: 'name',
        sortOrder: 'ASC',
      },
      pagination: {
        page: 1,
        rowsPerPage: ROWS_PER_PAGE_OPTIONS[0],
      },
      inputSearchValue: '',
      filters: [],
      width: 0,
    }
  }

  handleWindowResize = () => {
    const { width } = this.state
    const newWidth = window.innerWidth || 0
    if (width !== newWidth) {
      this.setState({ width: newWidth })
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => {})
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

  handleRowsPerPageChange = (event, rowsPerPage) => {
    this.setState(({ pagination }) => ({
      pagination: {
        ...pagination,
        rowsPerPage: parseInt(rowsPerPage),
      },
    }))
  }

  handleNextPageClick = () => {
    this.setState(({ pagination }) => ({
      pagination: {
        ...pagination,
        page: pagination.page + 1,
      },
    }))
  }

  handlePrevPageClick = () => {
    this.setState(({ pagination }) => ({
      pagination: {
        ...pagination,
        page: pagination.page - 1,
      },
    }))
  }

  render() {
    const { navigate } = this.context
    const { dataSort, inputSearchValue, pagination, filters, width } = this.state
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

    const { items, from, to } = paginate(
      sortPromotions(filterPromotions(promotions, filters), dataSort),
      pagination
    )

    // hides legacy column if there is no legacy promotions after filter
    const hasAnyLegacyPromotions = items.some(promo => !promo.effectType)
    const newSchema = {
      ...schema,
      properties: {
        ...omitBy(schema.properties, (value, key) => !hasAnyLegacyPromotions && key === 'legacy')
      },
    }

    return (
      <div>
        <Table
          density="low"
          updateTableKey={`promotions-table-${width}-${hasAnyLegacyPromotions}`}
          schema={newSchema}
          loading={loading}
          emptyStateLabel={emptyStateLabel}
          filters={{
            alwaysVisibleFilters: ['effect', 'status', 'startDate', 'endDate'],
            options: getFilterOptions(intl),
            onChangeStatements: filters => this.setState({ filters }),
            statements: filters,
            clearAllFiltersButtonLabel: intl.formatMessage({
              id: 'admin/promotions.filterBar.clearAllFilters',
            })
          }}
          items={items}
          onRowClick={onRowClick}
          pagination={{
            onNextClick: this.handleNextPageClick,
            onPrevClick: this.handlePrevPageClick,
            currentItemFrom: from + 1,
            currentItemTo: to,
            onRowsChange: this.handleRowsPerPageChange,
            textShowRows: intl.formatMessage({
              id: 'promotions.promotions.pagination.showRows',
            }),
            textOf: intl.formatMessage({
              id: 'promotions.promotions.pagination.of',
            }),
            totalItems: promotions.length,
            rowsOptions: ROWS_PER_PAGE_OPTIONS,
          }}
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
                      onClick: () => {
                        // temporary until vtex.admin-iframe-container is fixed
                        window.top.location.replace(
                          '/admin/rnb/#/benefit/new?type=regular'
                        )
                        // navigate({
                        //   to: '/admin/rnb/#/benefit/new?type=regular',
                        // })
                      },
                    },
                    {
                      label: intl.formatMessage({
                        id: 'promotions.promotions.newPromotion.combo',
                      }),
                      onClick: () => {
                        // temporary until vtex.admin-iframe-container is fixed
                        window.top.location.replace(
                          '/admin/rnb/#/benefit/new?type=combo'
                        )
                        // navigate({
                        //   to: '/admin/rnb/#/benefit/new?type=combo',
                        // })
                      },
                    },
                    {
                      label: intl.formatMessage({
                        id: 'promotions.promotions.newPromotion.forThePriceOf',
                      }),
                      onClick: () => {
                        // temporary until vtex.admin-iframe-container is fixed
                        window.top.location.replace(
                          '/admin/rnb/#/benefit/new?type=forThePriceOf'
                        )
                        // navigate({
                        //   to: '/admin/rnb/#/benefit/new?type=forThePriceOf',
                        // })
                      },
                    },
                    {
                      label: intl.formatMessage({
                        id: 'promotions.promotions.newPromotion.progressive',
                      }),
                      onClick: () => {
                        // temporary until vtex.admin-iframe-container is fixed
                        window.top.location.replace(
                          '/admin/rnb/#/benefit/new?type=progressive'
                        )
                        // navigate({
                        //   to: '/admin/rnb/#/benefit/new?type=progressive',
                        // })
                      },
                    },
                    {
                      label: intl.formatMessage({
                        id: 'promotions.promotions.newPromotion.buyAndWin',
                      }),
                      onClick: () => {
                        // temporary until vtex.admin-iframe-container is fixed
                        window.top.location.replace(
                          '/admin/rnb/#/benefit/new?type=buyAndWin'
                        )
                        // navigate({
                        //   to: '/admin/rnb/#/benefit/new?type=buyAndWin',
                        // })
                      },
                    },
                    {
                      label: intl.formatMessage({
                        id: 'promotions.promotions.newPromotion.campaign',
                      }),
                      onClick: () => {
                        // temporary until vtex.admin-iframe-container is fixed
                        window.top.location.replace(
                          '/admin/rnb/#/benefit/new?type=campaign'
                        )
                        // navigate({
                        //   to: '/admin/rnb/#/benefit/new?type=campaign',
                        // })
                      },
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

export default injectIntl(PromotionsTable)
