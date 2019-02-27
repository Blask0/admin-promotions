export const RESTRICT_SALES_CHANNEL_VERB_OPTIONS = [
  {
    label: 'is any of',
    value: 'any',
  },
  {
    label: 'is not any of',
    value: 'not.any',
  },
]

export const mapSalesChannelsToSelect = salesChannels =>
  salesChannels.map(salesChannel => ({
    label: salesChannel.name,
    value: salesChannel.id,
  }))
