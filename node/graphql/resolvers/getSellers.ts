import axios from 'axios'
import { HttpError } from '../errors/httpError'

const getSellers = async (_, info, { vtex: ioContext, request }, query) => {
  const sellersURL = `https://${
    ioContext.account
  }.vtexcommercestable.com.br/api/catalog_system/pvt/seller/list`

  return await axios
    .get(sellersURL, {
      headers: {
        Authorization: ioContext.authToken,
      },
    })
    .then(
      response => (
        response.data.map(seller => ({
          id: seller.SellerId,
          name: seller.Name,
          email: seller.Email,
          description: seller.Description,
          isActive: seller.IsActive
        }))
      ),
      error => {
        const errorMsg = 'Error fetching payment methods'
        throw new HttpError(errorMsg, error)
      }
    )
}

export default getSellers