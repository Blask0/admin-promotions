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
    const { intl, giftEffect, products, onChange } = this.props
    const options = this.mapProducts(products)

    return (
      <Fragment>
        <div className="mh4 mt7">
          <EXPERIMENTAL_Select
            label={'Products'}
            options={options}
            defaultValue={options[0]}
            multi={false}
            onChange={selected => {
              this.changeApplyByOrderStatus(selected.value)
            }}
          />

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
