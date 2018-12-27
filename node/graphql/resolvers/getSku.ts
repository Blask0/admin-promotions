import axios from 'axios'
import { HttpError } from '../errors/httpError'

const getSku = async (_, args, { vtex: ioContext, request }, query) => {
  const skuURL = `https://${
    ioContext.account
  }.vtexcommercestable.com.br/api/catalog_system/pvt/sku/stockkeepingunitbyid/${
    args.sku
  }`

  return await axios
    .get(skuURL, {
      headers: {
        Authorization: ioContext.authToken,
      },
    })
    .then(
      response => ({
        id: response.data.Id,
        name: response.data.SkuName,
        isKit: response.data.IsKit,
        kitItems: response.data.KitItems,
      }),
      error => {
        const errorMsg = 'Error fetching sku'
        throw new HttpError(errorMsg, error)
      })
}

export default getSku