import React, { useState } from 'react'
import { Query } from 'react-apollo'

import getCategories from '../graphql/getCategories.graphql'

export type CategoriesData = {
  getCategories?: {
    id: string
    name: string
  }[]
}

export type Category = {
  id: string
  name: string
}

export type WithCategoriesProps = {
  searchForCategories: (searchTerm: string) => React.SetStateAction<string>
}

const withCategories = <T extends WithCategoriesProps>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithCategories = (props: T) => {
    const [name, setName] = useState('')

    return (
      <Query<CategoriesData> query={getCategories} variables={{ name }}>
        {({ loading, error, data }) => (
          <WrappedComponent
            {...props}
            loading={loading}
            error={error}
            categories={data && data.getCategories}
            searchForCategories={searchTerm => setName(searchTerm)}
          />
        )}
      </Query>
    )
  }

  return WithCategories
}

export default withCategories
