import axios from 'axios'
import { HttpError } from '../errors/httpError'

const getCampaigns = async (_, info, { vtex: ioContext, request }, query) => {
  const conditionsURL = `https://api.vtex.com/${
    ioContext.account
  }/conditions/campaign/condition`

  return await axios
    .get(conditionsURL, {
      headers: {
        Authorization: ioContext.authToken
      }
    })
    .then(
      response => response.data,
      error => {
        const errorMsg = 'Error querying for all campaigns'
        throw new HttpError(errorMsg, error)
      }
    )
}

export default getCampaigns