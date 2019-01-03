import axios from 'axios'
import { HttpError } from '../errors/httpError'

const getSalesChannels = async (_, info, { vtex: ioContext, request }, query) => {
  const salesChannelsURL = `http://${
    ioContext.account
  }.vtexcommercestable.com.br/api/catalog_system/pvt/saleschannel/bindings/list`

  return await axios
    .get(salesChannelsURL, {
      headers: {
        Authorization: ioContext.authToken,
      },
    })
    .then(
      response => (
        response.data.map(affiliates => ({
          id: affiliates.Id,
          name: affiliates.Name,
          isActive: affiliates.IsActive,
        }))
      ),
      error => {
        const errorMsg = 'Error fetching sales channels'
        throw new HttpError(errorMsg, error)
      })
}

export default getSalesChannels