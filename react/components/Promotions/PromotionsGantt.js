import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, FormattedMessage } from 'react-intl'

import { ButtonWithIcon, EXPERIMENTAL_Select, IconPlus } from 'vtex.styleguide'
import TimeLine from 'react-gantt-timeline'

import './PromotionsGantt.css'

const COLORS = ['#F71963', '#FF4785', '#FF82AC', '#FFEBF1', '#FFD6E4', '#FFBFD5', '#FFADC9', '#DD1659', '#C4144F', '#AB1145', '#F0F4FF', '#E0E9FF', '#E5FDCA', '#D2DEFC', '#D3FAA7', '#FFEFC9', '#FCE6B1', '#FFD6D6', '#FFB8B8', '#1144C2', '#0937AD', '#072C8A', '#134CD8', '#F0FCE3', '#8BC34A', '#FFE6E6', '#FF4C4C', '#E13232', '#E19D00', '#CC1818', '#D19200', '#84BA47', '#79B03A', '#FFF6E0', '#FFB100', '#306CFF', '#9BD952', '#FF6B6B', '#FFC542', '#477DFF', '#AFE86D', '#FF8C8C', '#FFD575', '#8FAFFF', '#CAF598', '#FFA6A6', '#FFE19C', '#979899', '#979899', '#979899', '#979899', '#979899', '#979899', '#979899', '#979899', '#979899', '#979899', '#979899', '#979899'];
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
  header: {
    //Targert the time header containing the information month/day of the week, day and time.
    top: {
      //Tartget the month elements
      style: {
        backgroundColor: 'white',
        color: '#979899',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderBottom: '1px solid #E3E4E6',
        fontFamily: 'Fabriga',
      }, //The style applied to the month elements
    },
    middle: {
      //Tartget elements displaying the day of week info
      style: {
        backgroundColor: 'white',
        color: '#979899',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderBottom: '1px solid #E3E4E6',
        fontFamily: 'Fabriga',
      }, //The style applied to the day of week elements
      selectedStyle: {},
    },
    bottom: {
      //Tartget elements displaying the day number or time
      style: {
        background: 'white',
        color: '#979899',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderBottom: '1px solid #E3E4E6',
        fontSize: 12,
        fontFamily: 'Fabriga',
      }, //the style tp be applied
      selectedStyle: {},
    },
  },
  taskList: {
    //the right side task list
    title: {
      //The title of the task list
      label: ' ', //The caption to display as title
      style: { backgroundColor: 'transparent', color: 'transparent' },
    },
    task: {
      // The items inside the list diplaying the task
      style: {
        backgroundColor: '#fbf9f9',
        fontFamily: 'Fabriga',
        textAlign: 'left',
        fontSize: 14,
        height: 32,
        borderBottom: '1px solid #F2F4F5',
        color: '#333',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }, // the style to be applied
    },
    verticalSeparator: {
      //the vertical seperator use to resize he width of the task list
      style: { backgroundColor: '#F2F4F5' }, //the style
      grip: {
        //the four square grip inside the vertical separator
        style: { backgroundColor: '#cfcfcd' }, //the style to be applied
      },
    },
  },
  dataViewPort: {
    //The are where we display the task
    rows: {
      //the row constainting a task
      style: {
        backgroundColor: 'transparent',
        borderBottom: '1px solid #F2F4F5',
        height: '60px',
      },
    },
    task: {
      // the task itself
      showLabel: false, //If the task display the a label
      style: {
        position: 'absolute',
        borderRadius: 14,
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'grey',
        height: 20,
      },
      selectedStyle: {}, //the style tp be applied  when selected
    },
  },
  links: {
    //The link between two task
    color: 'transparent',
    selectedColor: 'transparent',
  },
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
  return promotions.map((promotion, i) => ({
    id: promotion.id,
    start: new Date(promotion.beginDate),
    end: new Date(promotion.endDate || MAX_DATE_TIMESTAMP),
    name: promotion.name,
    // color: `#${intToRGB(hashCode(promotion.id))}`,
    // color: COLORS[i % COLORS.length],
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
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
        itemheight={24}
      />
    </Fragment>
  )
}

PromotionsGantt.propTypes = {
  promotions: PropTypes.arrayOf(PropTypes.object),
}

export default injectIntl(PromotionsGantt)
