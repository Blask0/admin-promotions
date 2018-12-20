
import getBenefits from './resolvers/getBenefits'
import getCampaigns from './resolvers/getCampaigns'
import getCategories from './resolvers/getCategories'
import getCollections from './resolvers/getCollections'

export const resolvers = {
  Query: {
    getBenefits: getBenefits,
    getCampaigns: getCampaigns,
    getCategories: getCategories,
    getCollections: getCollections,
  }
};
