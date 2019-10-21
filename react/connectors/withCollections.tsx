import React, { useState } from 'react'
import { Query } from 'react-apollo'

import getCollections from '../graphql/getCollections.graphql'

export type CollectionsData = {
  getCollections?: {
    id: string
    name: string
  }[]
}

export type Collection = {
  id: string
  name: string
}

export type WithCollectionsProps = {
  searchForCollections: (searchTerm: string) => React.SetStateAction<string>
}

const withCollections = <T extends WithCollectionsProps>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithCollections = (props: T) => {
    const [name, setName] = useState('')

    return (
      <Query<CollectionsData> query={getCollections} variables={{ name }}>
        {({ loading, error, data }) => (
          <WrappedComponent
            {...props}
            loading={loading}
            error={error && error.message}
            collections={data && data.getCollections}
            searchForCollections={searchTerm => setName(searchTerm)}
          />
        )}
      </Query>
    )
  }

  return WithCollections
}

export default withCollections
