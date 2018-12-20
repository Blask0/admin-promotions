import axios from 'axios'
import { HttpError } from '../errors/httpError'

const getCategories = async (_, info, { vtex: ioContext, request }, query) => {
  const categoriesURL = `http://${
    ioContext.account
    }.vtexcommercestable.com.br/api/catalog_system/pub/category/listall`

  return await axios
    .get(categoriesURL, {
      headers: {
        Authorization: `Bearer ${ioContext.authToken}`,
      },
    })
    .then(
      response => (
        response.data.map(category => ({
          id: category.id,
          name: category.name
        }))
      ),
      error => {
        const errorMsg = 'Error querying for all product categories'
        throw new HttpError(errorMsg, error);
      }
    )
}

export default getCategories