import { Sku } from '../../connectors/withSkus'
import { Brand } from '../../connectors/withBrands'
import { Category } from '../../connectors/withCategories'
import { Collection } from '../../connectors/withCollections'
import { Product } from '../../connectors/withProducts'
import { Seller } from '../../connectors/withSellers'
import { SallesChannel } from '../../connectors/withSalesChannels'

export const mapSkusToSelect = (skus: Sku[]) =>
  skus.map(sku => ({
    label: `${sku.id} - ${sku.product.name} - ${sku.name}`,
    value: sku.id,
  }))

export const mapBrandsToSelect = (brands: Brand[]) =>
  brands.map(brand => ({
    label: brand.name,
    value: brand.id,
  }))

export const mapCategoriesToSelect = (categories: Category[]) =>
  categories.map(category => ({
    label: category.name,
    value: category.id,
  }))

export const mapCollectionsToSelect = (collections: Collection[]) =>
  collections.map(collection => ({
    label: collection.name,
    value: collection.id,
  }))

export const mapProductsToSelect = (products: Product[]) =>
  products.map(product => ({
    label: `${product.id} - ${product.name}`,
    value: product.id,
  }))

export const mapSellersToSelect = (sellers: Seller[]) =>
  sellers.map(seller => ({
    label: seller.name,
    value: seller.id,
  }))

export const mapSalesChannelsToSelect = (salesChannels: SallesChannel[]) =>
  salesChannels.map(salesChannel => ({
    label: `${salesChannel.name} - ${salesChannel.currencyCode}`,
    value: salesChannel.id,
  }))
