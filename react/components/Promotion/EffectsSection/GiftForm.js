import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import { Checkbox, EXPERIMENTAL_Select, Input } from 'vtex.styleguide'

import { fieldShape } from '../../../utils/propTypes'
import { mapSkusToSelect } from '../../../utils/mappers'
import withSkus from '../../../connectors/withSkus'
import { applyFocus } from '../../../utils/functions'

class GiftForm extends Component {
  componentDidUpdate = () => {
    const {
      giftEffect: { skus, maxQuantityPerPurchase },
      onChange,
    } = this.props

    if (skus.focus) {
      applyFocus({
        changeObject: {
          skus,
        },
        changeFunction: onChange,
      })
    }

    if (maxQuantityPerPurchase.focus) {
      applyFocus({
        changeObject: {
          maxQuantityPerPurchase,
        },
        changeFunction: onChange,
      })
    }
  }

  render() {
    const {
      intl,
      giftEffect,
      skus,
      loading,
      onChange,
      updateQueryParams,
    } = this.props

    const skuOptions = mapSkusToSelect(skus)

    return (
      <Fragment>
        <div className="mh4 mt7">
          <div className="mv4 w-80">
            <EXPERIMENTAL_Select
              label={intl.formatMessage({
                id: 'promotions.promotion.effects.gifts.skus',
              })}
              options={skuOptions}
              errorMessage={giftEffect.skus.error}
              value={giftEffect.skus.value}
              ref={giftEffect.skus.ref}
              loading={loading}
              multi
              onChange={selected => {
                onChange({
                  skus: {
                    ...giftEffect.skus,
                    value: selected,
                    error: undefined,
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
                min={1}
                value={giftEffect.maxQuantityPerPurchase.value}
                ref={giftEffect.maxQuantityPerPurchase.ref}
                errorMessage={giftEffect.maxQuantityPerPurchase.error}
                onChange={e => {
                  onChange({
                    maxQuantityPerPurchase: {
                      ...giftEffect.maxQuantityPerPurchase,
                      value: e.target.value,
                      error: undefined,
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
  multiplier: PropTypes.bool,
  limitQuantityPerPurchase: PropTypes.bool,
  maxQuantityPerPurchase: fieldShape(PropTypes.number),
  loading: PropTypes.bool,
  updateQueryParams: PropTypes.func.isRequired,
}

export default withSkus(injectIntl(GiftForm))
