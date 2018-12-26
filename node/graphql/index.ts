import getAffiliates from './resolvers/getAffiliates'
import getBenefits from './resolvers/getBenefits'
import getCampaigns from './resolvers/getCampaigns'
import getCategories from './resolvers/getCategories'
import getCollections from './resolvers/getCollections'
import getProducts from './resolvers/getProducts'
import getShippingTypes from './resolvers/getShippingTypes'
import getSku from './resolvers/getSku'

export const resolvers = {
  Query: {
    getAffiliates: getAffiliates,
    getBenefits: getBenefits,
    getCampaigns: getCampaigns,
    getCategories: getCategories,
    getCollections: getCollections,
    getProducts: getProducts,
    getShippingTypes: getShippingTypes,
    getSku: getSku,
  }
};
