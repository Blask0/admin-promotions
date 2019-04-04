import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, FormattedMessage } from 'react-intl'

import { ButtonWithIcon, EXPERIMENTAL_Select, IconPlus } from 'vtex.styleguide'
import TimeLine from 'react-gantt-timeline'

const LIGHT_ICON_SIZE = 16
const MAX_DATE_TIMESTAMP = 1999999999999
const VIEW_MODE_OPTIONS = [
  {
    value: 'day',
    label: 'Daily',
  },
  {
    value: 'week',
    label: 'Weekly',
  },
  {
    value: 'month',
    label: 'Monthly',
  },
  {
    value: 'year',
    label: 'Yearly',
  },
]

const GANTT_CONFIG = {
  // header: {
  //   // Targert the time header containing the information month/day of the week, day and time.
  //   top: {
  //     // Tartget the month elements
  //     style: { backgroundColor: '#134cd8' }, // The style applied to the month elements
  //   },
  //   middle: {
  //     // Tartget elements displaying the day of week info
  //     style: { backgroundColor: 'white', color: 'black' }, // The style applied to the day of week elements
  //     selectedStyle: { backgroundColor: '#b13525' }, // The style applied to the day of week elements when is selected
  //   },
  //   bottom: {
  //     // Tartget elements displaying the day number or time
  //     style: { background: 'grey', fontSize: 9 }, // the style tp be applied
  //     selectedStyle: { backgroundColor: '#b13525', fontWeight: 'bold' }, // the style tp be applied  when selected
  //   },
  // },
}

function hashCode(str) {
  var hash = 0
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hash
}

function intToRGB(i) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase()

  return '00000'.substring(0, 6 - c.length) + c
}

function mapPromotionsToGantt(promotions) {
  return promotions.map(promotion => ({
    id: promotion.id,
    start: new Date(promotion.beginDate),
    end: new Date(promotion.endDate || MAX_DATE_TIMESTAMP),
    name: promotion.name,
    // color: `#${intToRGB(hashCode(promotion.id))}`,
  }))
}

function PromotionsGantt({ promotions }) {
  const [viewMode, setViewMode] = useState(VIEW_MODE_OPTIONS[2])

  return (
    <Fragment>
      <div className="mb3 flex justify-end">
        <div className="mr3" style={{ minWidth: '150px' }}>
          <EXPERIMENTAL_Select
            value={viewMode}
            size="small"
            multi={false}
            options={VIEW_MODE_OPTIONS}
            onChange={value => {
              value && setViewMode(value)
            }}
          />
        </div>
        <ButtonWithIcon
          icon={<IconPlus solid size={LIGHT_ICON_SIZE} />}
          variation="primary"
          size="small">
          <FormattedMessage id="promotions.promotion.titleNew" />
        </ButtonWithIcon>
      </div>
      <TimeLine
        mode={viewMode.value}
        data={mapPromotionsToGantt(promotions)}
        config={GANTT_CONFIG}
        onSelectItem={(a, b, c) => console.log('hue', a, b, c)}
      />
    </Fragment>
  )
}

PromotionsGantt.propTypes = {
  promotions: PropTypes.arrayOf(PropTypes.object),
}

export default injectIntl(PromotionsGantt)
