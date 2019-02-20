import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import { Checkbox, EXPERIMENTAL_Select } from 'vtex.styleguide'

import withProducts from '../../../connectors/withProducts'

class GiftForm extends Component {
  mapProducts = products =>
    products.map(product => ({
      label: `${product.id} - ${product.name}`,
      value: product.id,
    }))

  render() {
    const {
      intl,
      giftEffect,
      products,
      onChange,
      updateQueryParams,
    } = this.props
    const productOptions = this.mapProducts(products)

    return (
      <Fragment>
        <div className="mh4 mt7">
          <div className="mv4 w-80">
            <EXPERIMENTAL_Select
              label={'Products'}
              options={productOptions}
              defaultValue={productOptions[0]}
              multi
              onChange={selected => {
                onChange({ products: selected })
              }}
              onSearchInputChange={searchedValue => {
                updateQueryParams &&
                  updateQueryParams({
                    name: searchedValue,
                  })
              }}
            />
          </div>

          <div className="mv4">
            <Checkbox
              checked={giftEffect.multiplier}
              id="giftMultiplier"
              label={intl.formatMessage({
                id: 'promotions.promotion.effects.giftMultiplier.label',
              })}
              name="giftMultiplier-checkbox-group"
              onChange={e => onChange({ multiplier: !giftEffect.multiplier })}
              value="giftMultiplier"
            />
          </div>

          <div className="mv4">
            <Checkbox
              checked={giftEffect.limitQuantityPerPurchase}
              id="selectableLimit"
              label={intl.formatMessage({
                id: 'promotions.promotion.effects.limitQuantityOfGifts.label',
              })}
              name="selectableLimit-checkbox-group"
              onChange={e =>
                onChange({
                  limitQuantityPerPurchase: !giftEffect.limitQuantityPerPurchase,
                })
              }
              value="selectableLimit"
            />
          </div>
        </div>
      </Fragment>
    )
  }
}

GiftForm.propTypes = {
  intl: intlShape,
  products: PropTypes.object,
  updateQueryParams: PropTypes.func.isRequired,
}

export default withProducts(injectIntl(GiftForm))
