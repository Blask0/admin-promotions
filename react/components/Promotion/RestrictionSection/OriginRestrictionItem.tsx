import React from 'react'
import { FormattedMessage } from 'react-intl'

type Props = {
  id: string
}

const OriginRestrictionOption: React.FC<Props> = ({ id }) => (
  <div>
    <FormattedMessage id={`promotions.promotion.restriction.origin.${id}`} />
    <div className="mt2 c-muted-1">
      <FormattedMessage
        id={`promotions.promotion.restriction.origin.${id}.explanation`}
      />
    </div>
  </div>
)

export default OriginRestrictionOption
