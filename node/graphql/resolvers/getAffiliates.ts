import axios from 'axios'
import { HttpError } from '../errors/httpError'

const getAffiliates = async (_, info, { vtex: ioContext, request }, query) => {
  const affiliatesURL = `http://${
    ioContext.account
  }.vtexcommercestable.com.br/api/fulfillment/pvt/affiliates`

  return await axios
    .get(affiliatesURL, {
      headers: {
        Authorization: ioContext.authToken,
      },
    })
    .then(
      response => (
        response.data.map(affiliates => ({
          id: affiliates.id,
          name: affiliates.name,
          salesChannel: affiliates.salesChannel,
          followUpEmail: affiliates.followUpEmail,
          searchURIEndPoint: affiliates.searchURIEndPoint,
          searchURIEndpointAvailableVersions: affiliates.searchURIEndpointAvailableVersions,
          searchURIEndpointVersion: affiliates.searchURIEndpointVersion,
          useSellerPaymentMethod: affiliates.useSellerPaymentMethod,
        }))
      ),
      error => {
        const errorMsg = 'Error fetching affiliates'
        throw new HttpError(errorMsg, error)
      })
}

export default getAffiliates