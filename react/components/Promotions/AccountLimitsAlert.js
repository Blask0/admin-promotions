import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import { Alert } from 'vtex.styleguide'

const ref = React.createRef()

function AccountLimitsAlert({ intl, promotions, accountLimits }) {
  const percentual = promotions.length / accountLimits.activePromotions

  const alertProps =
    percentual >= 1
      ? {
        type: 'error',
        message: 'promotions.promotion.accountLimit.exceeded',
      }
      : percentual > 0.9
        ? {
          type: 'warning',
          message: 'promotions.promotion.accountLimit.warning',
        }
        : null

  return (
    alertProps && (
      <Alert ref={ref} type={alertProps.type}>
        {/* action={{
          label: intl.formatMessage({
            id: 'promotions.promotion.accountLimit.moreInfo',
          }),
          onClick: () => {},
        }} */}
        <FormattedMessage
          id={alertProps.message}
          values={{
            current: promotions.length,
            limit: accountLimits.activePromotions,
          }}
        />
      </Alert>
    )
  )
}

AccountLimitsAlert.propTypes = {
  intl: intlShape,
  promotions: PropTypes.arrayOf(PropTypes.object),
  accountLimits: PropTypes.shape({
    activePromotions: PropTypes.number,
  }).isRequired,
}

export default injectIntl(AccountLimitsAlert)
