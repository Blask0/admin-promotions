import React from 'react'

import { RadioGroup } from 'vtex.styleguide'
import OriginRestrictionOption from './OriginRestrictionItem'

type Props = {
  origin: string
  onChange: (origin: Props['origin']) => void
}

const OriginRestriction: React.FC<Props> = ({ origin, onChange }) => {
  console.log(origin)
  return (
    <RadioGroup
      name="origin-restriction"
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
  )
}

export default OriginRestriction
