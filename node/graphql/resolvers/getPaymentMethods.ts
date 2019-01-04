import axios from 'axios'
import { HttpError } from '../errors/httpError'

const getPaymentMethods = async (_, info, { vtex: ioContext, request }, query) => {
  const paymentMethodsURL = `https://${
    ioContext.account
  }.vtexpayments.com.br/api/pvt/merchants/payment-systems`

  return await axios
    .get(paymentMethodsURL, {
      headers: {
        Authorization: ioContext.authToken,
      },
    })
    .then(
      response => (
        response.data.map(paymentMethod => ({
          id: paymentMethod.id,
          name: paymentMethod.name,
          description: paymentMethod.description,
        }))
      ),
      error => {
        const errorMsg = 'Error fetching payment methods'
        throw new HttpError(errorMsg, error)
      }
    )
}

export default getPaymentMethods