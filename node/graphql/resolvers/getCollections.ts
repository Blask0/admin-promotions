import axios from 'axios'
import { HttpError } from '../errors/httpError'

const getCollections = async (_, info, { vtex: ioContext, request }, query) => {
  const collectionsURL = `https://${
    ioContext.account
  }.vtexcommercestable.com.br/api/catalog_system/pvt/collection/list/7`

  return await axios
    .get(collectionsURL, {
      headers: {
        Authorization: ioContext.authToken,
      },
    })
    .then(
      response => (
        response.data.map(collection => ({
          id: collection.Id,
          name: collection.Name,
        }))
      ),
      error => {
        const errorMsg = 'Error fetching collections'
        throw new HttpError(errorMsg, error)
      }
    )
}

export default getCollections