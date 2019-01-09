import React, { Component } from 'react'
import { Query } from 'react-apollo'

import getPromotions from '../graphql/getPromotions.graphql';

function withPromotions(WrappedComponent) {
  class WithPromotions extends Component {
    constructor(props) {
      super(props)

      this.state = {
        inputSearchValue: '',
        searchValue: ''
      }
    }

    handleSearchChange = (e) => {
      this.setState({ 
        inputSearchValue: e.target.value 
      })
    }

    handleSearchClear = (e) => {
      this.setState({ 
        inputSearchValue: '',
        searchValue: ''
      })
    }

    handleSearchSubmit = (e) => {
      this.setState({ 
        searchValue: this.state.inputSearchValue 
      })
      e.preventDefault()
    }

    render() {
      const { searchValue } = this.state

      return (
        <Query 
          query={getPromotions}
          variables={{
            name: searchValue,
            effect: searchValue
          }}>
          {({ loading, error, data }) => (
            <WrappedComponent
              {...this.props}
              loading={loading}
              error={error}
              promotions={data ? data.getPromotions : []}
              inputSearchValue={this.state.inputSearchValue}
              handleSearchChange={this.handleSearchChange}
              handleSearchClear={this.handleSearchClear}
              handleSearchSubmit={this.handleSearchSubmit}
            />
          )}
        </Query>
      )
    }
  }

  return WithPromotions
}

export default withPromotions
