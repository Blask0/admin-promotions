import { Toggle } from 'vtex.styleguide'

import withPromotionActivation from '../../connectors/withPromotionActivation'

export const PromotionActivationToggle = withPromotionActivation(
  ({ promotion: promo, onActivationChange, promotionActivation }) => {
    const promotion = { ...promo }
    return (
      <Toggle
        checked={promotion.isActive}
        onClick={e => e.stopPropagation()}
        onChange={e => {
          promotion.isActive = e.target.checked
          promotionActivation({
            variables: {
              promotion,
            },
          }).then(() => onActivationChange())
        }}
      />
    )
  }
)
