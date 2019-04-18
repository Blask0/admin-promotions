import { Toggle, Spinner } from 'vtex.styleguide'

import withPromotionActivation from '../../connectors/withPromotionActivation'

export const PromotionActivationToggle = withPromotionActivation(
  ({ promotion: promo, promotionActivation, loading }) => {
    const promotion = { ...promo }
    const now = new Date()
    const endDate = new Date(promotion.endDate)
    return loading ? (
      <Spinner />
    ) : (
      <Toggle
        checked={promotion.isActive}
        disabled={promotion.endDate && endDate.getTime() <= now.getTime()}
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
