import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import { Checkbox, EXPERIMENTAL_Select, Input } from 'vtex.styleguide'

import withSkus from '../../../connectors/withSkus'

class GiftForm extends Component {
  mapSkus = skus =>
    skus.map(element => ({
      label: `${element.sku.id} - ${element.product.name} - ${
        element.sku.name
      }`,
      value: {
        id: element.sku.id,
        name: element.sku.name,
      },
    }))

  render() {
    const {
      intl,
      giftEffect,
      skus,
      loading,
      onChange,
      updateQueryParams,
    } = this.props

    const skuOptions = this.mapSkus(skus)

    return (
      <Fragment>
        <div className="mh4 mt7">
          <div className="mv4 w-80">
            <EXPERIMENTAL_Select
              label={intl.formatMessage({
                id: 'promotions.promotion.effects.gifts.skus',
              })}
              options={skuOptions}
              value={giftEffect.skus.value}
              loading={loading}
              multi
              onChange={selected => {
                onChange({
                  skus: {
                    value: selected,
                  },
                })
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
          {giftEffect.limitQuantityPerPurchase && (
            <div className="pv3 pl5 w-30">
              <Input
                placeholder={intl.formatMessage({
                  id:
                    'promotions.promotion.effects.quantitySelectable.placeholder',
                })}
                type="number"
                value={giftEffect.maxQuantityPerPurchase.value}
                errorMessage={giftEffect.maxQuantityPerPurchase.error}
                onChange={e => {
                  onChange({
                    maxQuantityPerPurchase: {
                      value: e.target.value,
                    },
                  })
                }}
              />
            </div>
          )}
        </div>
      </Fragment>
    )
  }
}

GiftForm.propTypes = {
  intl: intlShape,
  skus: PropTypes.object,
  loading: PropTypes.bool,
  updateQueryParams: PropTypes.func.isRequired,
}

export default withSkus(injectIntl(GiftForm))
