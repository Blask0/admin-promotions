import axios from 'axios'
import { HttpError } from '../errors/httpError'

const getPromotions = async (_, args, { vtex: ioContext }) => {
  const promotionsURL = `http://${
    ioContext.account
  }.vtexcommercestable.com.br/api/rnb/pvt/benefits/calculatorconfiguration`
  
  return await axios
    .get(promotionsURL, {
      headers: {
        Authorization: ioContext.authToken,
      },
    })
    .then(
      response => {
        console.log(response)
        // response.data.items.map(promotion => ({
        //   id: promotion.idCalculatorConfiguration,
        //   name: promotion.name,
        //   beginDate: promotion.beginDate,
        //   endDate: promotion.endDate,
        //   isActive: promotion.isActive,
        //   description: promotion.description,
        //   effectType: promotion.effectType,
        //   campaigns: promotion.Campaigns
        // }))
      },
      error => {
        const errorMsg = 'Error fetching promotions'
        throw new HttpError(errorMsg, error)
      })
}

export default getPromotions