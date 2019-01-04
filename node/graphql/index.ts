import getAffiliates from './resolvers/getAffiliates'
import getBenefits from './resolvers/getBenefits'
import getBrands from "./resolvers/getBrands";
import getCampaigns from './resolvers/getCampaigns'
import getCategories from './resolvers/getCategories'
import getCollections from './resolvers/getCollections'
import getPaymentmethods from './resolvers/getPaymentMethods'
import getProducts from './resolvers/getProducts'
import getSalesChannels from "./resolvers/getSalesChannels";
import getSellers from "./resolvers/getSellers";
import getShippingTypes from './resolvers/getShippingTypes'
import getSku from './resolvers/getSku'

export const resolvers = {
  Query: {
    getAffiliates: getAffiliates,
    getBenefits: getBenefits,
    getBrands: getBrands,
    getCampaigns: getCampaigns,
    getCategories: getCategories,
    getCollections: getCollections,
    getPaymentMethods: getPaymentmethods,
    getProducts: getProducts,
    getSalesChannels: getSalesChannels,
    getSellers: getSellers,
    getShippingTypes: getShippingTypes,
    getSku: getSku,
  }
};
