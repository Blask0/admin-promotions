import axios from 'axios'
import { HttpError } from '../errors/httpError'

const getShippingTypes = async (_, info, { vtex: ioContext, request }, query) => {
  const shippingTypesURL = `http://logistics.vtexcommercestable.com.br/api/logistics/pvt/configuration/freights?an=${
    ioContext.account
  }`

  return await axios
    .get(shippingTypesURL, {
      headers: {
        Authorization: ioContext.authToken,
      },
    })
    .then(
      response => (
        response.data.map(shippingType => ({
          name: shippingType.name,
        }))
      ),
      error => {
        const errorMsg = 'Error fetching shipping types'
        throw new HttpError(errorMsg, error)
      })
}

export default getShippingTypes