import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import { Checkbox, DatePicker, Collapsible } from 'vtex.styleguide'

import { fieldShape } from '../../../utils/propTypes'
import AdvancedScheduling from './AdvancedScheduling'

function Scheduling({ intl, generalInfo, updatePageState }) {
  const [advancedSchedulingOpened, setAdvancedSchedulingOpened] = useState(
    false
  )

  const tzLabel = Intl.DateTimeFormat().resolvedOptions().timeZone

  return (
    <Fragment>
      <hr className="b--muted-4 bt-0" />
      <div className="flex flex-row mt7">
        <div className="w-50">
          <h4 className="t-heading-4 mt0 mb4">
            <FormattedMessage id="promotions.promotion.generalInfo.scheduling.title" />
          </h4>
          <span className="c-muted-1 t-small-s">
            <FormattedMessage id="promotions.promotion.generalInfo.scheduling.briefExplanation" />
          </span>
        </div>
        <div className="flex flex-column w-50">
          <div className="mv4">
            <DatePicker
              locale={intl.locale}
              onChange={date => {
                updatePageState({
                  startDate: date,
                })
              }}
              value={generalInfo.startDate}
              helpText={intl.formatMessage(
                {
                  id: 'promotions.promotion.generalInfo.tz',
                },
                {
                  tz: generalInfo.tz,
                  tzLabel,
                }
              )}
              label={intl.formatMessage({
                id: 'promotions.promotion.generalInfo.startDate',
              })}
            />
          </div>
          <div className="mv4">
            <Checkbox
              checked={generalInfo.hasEndDate}
              id="hasEndDate"
              label={intl.formatMessage({
                id: 'promotions.promotion.generalInfo.hasEndDate',
              })}
              name="limitPerActivation-checkbox-group"
              onChange={() => {
                updatePageState({
                  hasEndDate: !generalInfo.hasEndDate,
                  endDate: !generalInfo.hasEndDate
                    ? {
                      value: addDays(new Date(), 1),
                    }
                    : {
                      value: undefined,
                    },
                })
              }}
              value="hasEndDate"
            />
          </div>
          {generalInfo.hasEndDate ? (
            <div className="mt4">
              <DatePicker
                locale={intl.locale}
                onChange={date => {
                  updatePageState({
                    endDate: {
                      value: date,
                    },
                  })
                }}
                errorMessage={generalInfo.endDate.error}
                value={generalInfo.endDate.value}
                label={intl.formatMessage({
                  id: 'promotions.promotion.generalInfo.endDate',
                })}
              />
            </div>
          ) : null}
          <div className="mv4">
            <Collapsible
              header={
                <span className="c-action-primary">Recurrency settings</span>
              }
              onClick={e => setAdvancedSchedulingOpened(e.target.opened)}
              opened={advancedSchedulingOpened}>
              <div className="ml6">
                <AdvancedScheduling
                  value={generalInfo.recurrency}
                  onChange={e => {
                    updatePageState({
                      recurrency: e.target.value,
                    })
                  }}
                />
              </div>
            </Collapsible>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

Scheduling.propTypes = {
  intl: intlShape,
  generalInfo: PropTypes.shape({
    name: fieldShape(PropTypes.string),
    isActive: PropTypes.bool,
    startDate: PropTypes.instanceOf(Date),
    hasEndDate: PropTypes.bool,
    endDate: fieldShape(PropTypes.instanceOf(Date)),
    tz: PropTypes.number,
    cron: PropTypes.string,
  }),
  updatePageState: PropTypes.func,
}

export default injectIntl(Scheduling)
