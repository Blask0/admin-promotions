import React, { useState } from 'react'
import { Query } from 'react-apollo'

import getSalesChannels from '../graphql/getSalesChannels.graphql'

import { uniqByProp } from '../utils'

export type SallesChannelsData = {
  getSalesChannels?: {
    id: string
    name: string
    currencyCode: string
  }[]
}

export type SallesChannel = {
  id: string
  name: string
  currencyCode: string
}

export type WithSalesChannelsProps = {
  searchForSallesChannels: (searchTerm: string) => React.SetStateAction<string>
}

const withSalesChannels = <T extends WithSalesChannelsProps>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithSalesChannels = (props: T) => {
    const [name, setName] = useState('')

    return (
      <Query<SallesChannelsData> query={getSalesChannels} variables={{ name }}>
        {({ loading, error, data }) => (
          <WrappedComponent
            {...props}
            loading={loading}
            error={error}
            salesChannels={
              data && data.getSalesChannels
                ? uniqByProp(data.getSalesChannels, 'id')
                : []
            }
            searchForSallesChannels={searchTerm => setName(searchTerm)}
          />
        )}
      </Query>
    )
  }

  return WithSalesChannels
}

export default withSalesChannels
