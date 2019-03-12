import { Toggle, Spinner } from 'vtex.styleguide'

import withPromotionActivation from '../../connectors/withPromotionActivation'

export const PromotionActivationToggle = withPromotionActivation(
  ({ promotion: promo, promotionActivation, loading }) => {
    const promotion = { ...promo }
    return loading ? (
      <Spinner />
    ) : (
      <Toggle
        checked={promotion.isActive}
        onClick={e => e.stopPropagation()}
        onChange={e => {
          promotion.isActive = e.target.checked
          promotionActivation({
            variables: {
              promotion,
            },
          })
        }}
      />
    )
  }
)
