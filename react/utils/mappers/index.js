export const mapSkusToSelect = skus =>
  skus.map(element => ({
    label: `${element.sku.id} - ${element.product.name} - ${element.sku.name}`,
    value: element.sku.id,
  }))

export const mapBrandsToSelect = brands =>
  brands.map(brand => ({
    label: brand.name,
    value: brand.id,
  }))

export const mapCategoriesToSelect = categories =>
  categories.map(category => ({
    label: category.name,
    value: category.id,
  }))

export const mapCollectionsToSelect = collections =>
  collections.map(collection => ({
    label: collection.name,
    value: collection.id,
  }))

export const mapProductsToSelect = products =>
  products.map(product => ({
    label: `${product.id} - ${product.name}`,
    value: product.id,
  }))

export const mapSellersToSelect = sellers =>
  sellers.map(seller => ({
    label: seller.name,
    value: seller.id,
  }))
