import getAffiliates from './resolvers/getAffiliates'
import getBenefits from './resolvers/getBenefits'
import getCampaigns from './resolvers/getCampaigns'
import getCategories from './resolvers/getCategories'
import getCollections from './resolvers/getCollections'
import getShippingTypes from './resolvers/getShippingTypes'

export const resolvers = {
  Query: {
    getAffiliates: getAffiliates,
    getBenefits: getBenefits,
    getCampaigns: getCampaigns,
    getCategories: getCategories,
    getCollections: getCollections,
    getShippingTypes: getShippingTypes,
  }
};
