import axios from 'axios'
import { HttpError } from '../errors/httpError'

const getProducts = async (_, args, { vtex: ioContext, request }, query) => {
  const productsURL = `https://${
    ioContext.account
  }.vtexcommercestable.com.br/api/catalog_system/pvt/products/GetProducts/?filter=${
    args.q
  }&page=${
    args.page
  }&pagesize=${
    args.itemsPerPage
  }`

  return await axios
    .get(productsURL, {
      headers: {
        Authorization: ioContext.authToken,
      },
    })
    .then(
      response => ({
        products: response.data.items.map(product => ({
          id: product.productId,
          name: product.productName,
          detailUrl: product.detailUrl,
          imageUrl: product.imageUrl,
          skus: product.stockKeepingUnitBasicDtoCollection.map(sku => ({
            id: sku.id,
            name: sku.skuName,
            isKit: sku.isKit,
            kitItems: sku.skuKitItems
          }))
        })),
        pagination: {
          page: response.data.paging.page,
          itemsPerPage: response.data.paging.perPage,
          totalItems: response.data.paging.total,
          totalPages: response.data.paging.pages
        }
      }),
      error => {
        const errorMsg = 'Error fetching products'
        throw new HttpError(errorMsg, error)
      })
}

export default getProducts