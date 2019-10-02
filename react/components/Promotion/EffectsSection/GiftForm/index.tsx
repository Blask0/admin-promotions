import React, { useRef } from 'react'
import { injectIntl, InjectedIntlProps } from 'react-intl'

import { EXPERIMENTAL_Select, Input } from 'vtex.styleguide'

import withSkus, { Sku, WithSkusProps } from '../../../../connectors/withSkus'
import { mapSkusToSelect } from '../../../../utils/mappers'

type Field<T> = {
  value: T
  error?: string
  focus?: boolean
}

type GiftEffect = {
  maxQuantityPerPurchase: Field<number>
  skus: Field<Sku[]>
}

export type Props = {
  giftEffect: GiftEffect
  skus: Sku[]
  loading?: boolean
  searchForSkus: WithSkusProps['searchForSkus']
  onChange: (newGiftEffect: Partial<GiftEffect>) => void
}

const GiftForm: React.FC<Props & InjectedIntlProps> = ({
  intl,
  skus,
  giftEffect,
  loading,
  searchForSkus,
  onChange,
}) => {
  const skusRef = useRef<any>(null)
  const maxQuantityPerPurchaseRef = useRef<any>(null)

  return (
    <div className="mh4 mt7">
      <div className="mv4 w-80">
        <EXPERIMENTAL_Select
          label={intl.formatMessage({
            id: 'promotions.promotion.effects.gifts.skus',
          })}
          options={mapSkusToSelect(skus)}
          errorMessage={giftEffect.skus.error}
          value={giftEffect.skus.value}
          ref={skusRef}
          loading={loading}
          multi
          onChange={(selected: Sku[]) => {
            onChange({
              skus: {
                ...giftEffect.skus,
                value: selected,
                error: undefined,
              },
            })
          }}
          onSearchInputChange={(term: string) => searchForSkus(term)}
        />
      </div>

      <div className="pv3 w-30">
        <Input
          placeholder={intl.formatMessage({
            id: 'promotions.promotion.effects.quantitySelectable.placeholder',
          })}
          label={intl.formatMessage({
            id: 'promotions.promotion.effects.quantitySelectable.label',
          })}
          type="number"
          min="1"
          value={giftEffect.maxQuantityPerPurchase.value}
          ref={maxQuantityPerPurchaseRef}
          errorMessage={giftEffect.maxQuantityPerPurchase.error}
          onChange={(e: { target: { value: number } }) => {
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
    </div>
  )
}

export default withSkus(injectIntl(GiftForm))
