import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import { IconDelete, TimePicker } from 'vtex.styleguide'

function getDates({ from, to }) {
  let fromDate
  if (from.hours !== undefined && from.minutes !== undefined) {
    fromDate = new Date()
    fromDate.setHours(from.hours, from.minutes, 0, 0)
  }

  let toDate
  if (to.hours !== undefined && to.minutes != undefined) {
    toDate = new Date()
    toDate.setHours(to.hours, to.minutes, 0, 0)
  }

  return { fromDate, toDate }
}

function createTime(date) {
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
  }
}

function handleChange(callback, { from, to }) {
  callback &&
    callback({
      target: {
        from,
        to,
      },
    })
}

function TimeRange({ intl, excludable, from, to, onChange: callback }) {
  const { fromDate, toDate } = getDates({ from, to })

  return (
    <div className="flex flex-row items-center">
      <div className="mr3">
        <TimePicker
          label={from.label}
          locale={intl.locale}
          timeIntervals={60}
          value={fromDate}
          onChange={date => {
            const from = createTime(date)
            handleChange(callback, { from, to })
          }}
        />
      </div>
      <div className="mr3">
        <TimePicker
          label={to.label}
          locale={intl.locale}
          timeIntervals={60}
          error={toDate && fromDate && toDate.getTime() <= fromDate.getTime()}
          value={toDate}
          onChange={date => {
            const to = createTime(date)
            handleChange(callback, { from, to })
          }}
        />
      </div>
      <div className="mr7 c-muted-1">
        {excludable ? (
          <div className="pointer">
            <IconDelete />
          </div>
        ) : (
          <svg width={16} height={16} />
        )}
      </div>
    </div>
  )
}

TimeRange.propTypes = {
  excludable: false,
}

TimeRange.propTypes = {
  intl: intlShape,
  excludable: PropTypes.bool,
  from: PropTypes.shape({
    label: PropTypes.string,
    hours: PropTypes.string.isRequired,
    minutes: PropTypes.string.isRequired,
  }).isRequired,
  to: PropTypes.shape({
    label: PropTypes.string,
    hours: PropTypes.string.isRequired,
    minutes: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func,
}

export default injectIntl(TimeRange)
