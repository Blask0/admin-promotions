import axios from 'axios'

import getBenefits from './resolvers/getBenefits'
import getCampaigns from './resolvers/getCampaigns'
import getCategories from './resolvers/getCategories'

export const resolvers = {
  Query: {
    getBenefits: getBenefits,
    getCampaigns: getCampaigns,
    getCategories: getCategories
  }
};
