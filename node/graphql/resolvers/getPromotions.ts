import axios from 'axios'
import { HttpError } from '../errors/httpError'

const mockEffect = [
  'Price',
  'Gift',
  'Shipping',
  'Reward'
]

// add LRUCache

const getPromotions = async (_, args, { vtex: ioContext }) => {
  const promotionsURL = `http://${
    ioContext.account
  }.vtexcommercestable.com.br/api/rnb/pvt/benefits/calculatorconfiguration`

  return await axios
    .get(promotionsURL, {
      headers: {
        Authorization: ioContext.authToken
      },
    })
    .then(
      response => (
        response.data.items.map(promotion => ({
          id: promotion.idCalculatorConfiguration,
          name: promotion.name,
          beginDate: promotion.beginDate,
          endDate: promotion.endDate,
          isActive: promotion.isActive,
          description: promotion.description,
          effectType: promotion.effectType || mockEffect[Math.floor(Math.random() * 3) + 0],
          campaigns: promotion.Campaigns
        })).filter(promotion => (
          !!promotion.name.match(new RegExp(args.name, 'i')) || 
          !!promotion.effectType.match(new RegExp(args.effect, 'i'))
        ))
      ),
      error => {
        const errorMsg = 'Error fetching promotions'
        throw new HttpError(errorMsg, error)
      })
}

export default getPromotions