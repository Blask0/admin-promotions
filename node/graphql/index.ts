import axios from 'axios'

const storages = {
  prices: 'prices',
  campaign: 'campaign',
  pages: 'pages',
}

export const resolvers = {
  Query: {
    getCampaigns: async (_, info, { vtex: ioContext, request }, query) => {
      let finalResponse = {
        conditionsLimit: 0,
        conditions: [],
        error: undefined,
      }

      if (!storages.hasOwnProperty(info.conditionType)) {
        finalResponse.error = `Invalid storage type: "${info.conditionType}"`
        return finalResponse
      }

      const conditionsURL = `https://api.vtex.com/${
        ioContext.account
      }/conditions/${info.conditionType}/condition`

      await axios
        .get(conditionsURL, {
          headers: {
            Authorization: `${ioContext.authToken}`,
          },
        })
        .then(
          function(response) {
            console.log(
              `Fetched CONDITIONS of type ${info.conditionType} with success`
            )
            console.log(response.data.conditions)
            finalResponse = response.data
          },
          function(error) {
            console.log(
              `Error fetching conditions of type "${info.conditionType}": ${
                error.response.data
              }`
            )
            console.log(error)
            finalResponse.error = error.response.status
          }
        )

      return finalResponse
    },
    getBenefits: async () => {
      return [
        { name: 'get-headphone' },
        { name: '50-percent-off' },
        { name: 'free-shipping' },
      ]
    },
  },
}
