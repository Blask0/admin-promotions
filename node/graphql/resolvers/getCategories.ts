import axios from 'axios'
import { ApolloError } from 'apollo-server-errors'

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
        switch (error.response.status) {
          case 404:
            throw new ApolloError(errorMsg, 'NOT_FOUND', {
              error: {
                message: error.message,
                response: error.response
              }
            })
          case 500:
            throw new ApolloError(errorMsg, 'INTERNAL_SERVER_ERROR', {
              message: error.message,
              response: error.response
            })
        }
      }
    )
}

export default getCategories