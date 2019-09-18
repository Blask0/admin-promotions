import React from 'react'
import { FormattedMessage } from 'react-intl'

import { RadioGroup } from 'vtex.styleguide'

import OriginRestrictionOption from './OriginRestrictionItem'

type Props = {
  origin: string
  onChange: (origin: Props['origin']) => void
}

const OriginRestriction: React.FC<Props> = ({ origin, onChange }) => {
  return (
    <>
      <div className="mt6 mb4">
        <FormattedMessage id="promotions.promotion.restriction.origin" />
      </div>
      <RadioGroup
        name="origin-restriction"
        hideBorder
        options={[
          {
            value: 'marketplace',
            label: <OriginRestrictionOption id="marketplace" />,
          },
          {
            value: 'fulfillment',
            label: <OriginRestrictionOption id="fulfillment" />,
          },
        ]}
        value={origin}
        onChange={e => onChange(e.currentTarget.value)}
      />
    </>
  )
}

export default OriginRestriction
