import axios from 'axios'
import { HttpError } from '../errors/httpError'

const getBrands = async (_, args, { vtex: ioContext, request }, query) => {
  const brandsURL = `https://${
    ioContext.account
  }.vtexcommercestable.com.br/api/catalog_system/pvt/brand/list/${
    args.q
  }`

  return await axios
    .get(brandsURL, {
      headers: {
        Authorization: ioContext.authToken,
      },
    })
    .then(
      response => (response.data),
      error => {
        const errorMsg = 'Error fetching brands'
        throw new HttpError(errorMsg, error)
      })
}

export default getBrands