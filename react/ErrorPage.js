import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { Button, IconFailure } from 'vtex.styleguide'
import { injectIntl, FormattedMessage } from 'react-intl'

function stopAdminLoading() {
  window.top &&
    window.top.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
}

function ErrorPage({ error, actionMessageId, onActionExecuted }) {
  useEffect(stopAdminLoading, [])

  return (
    <div className="mt6 flex justify-center tc gray flex-wrap">
      <div>
        <p className="db f3 fw5 mb0">
          <IconFailure size={40} />
        </p>
        <div className="mv6 flex flex-column">
          <FormattedMessage
            id={`promotions.promotion.error.reason.${error.reason}`}
          />
          {error.operationId && (
            <span>
              OperationId: <strong>{error.operationId}</strong>
            </span>
          )}
        </div>
        <Button variation="secondary" size="small" onClick={onActionExecuted}>
          <div className="nowrap">
            <FormattedMessage id={actionMessageId} />
          </div>
        </Button>
      </div>
    </div>
  )
}

ErrorPage.proptypes = {
  error: PropTypes.object.isRequired,
  actionMessageId: PropTypes.string.isRequired,
  onActionExecuted: PropTypes.func,
}

export default injectIntl(ErrorPage)
