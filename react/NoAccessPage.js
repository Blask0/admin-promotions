import React, { useEffect } from 'react'

import { IconFailure } from 'vtex.styleguide'
import { injectIntl, FormattedMessage } from 'react-intl'

function stopAdminLoading() {
  window.top &&
    window.top.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
}

function NoAccessPage() {
  useEffect(stopAdminLoading, [])

  return (
    <div className="mt6 flex justify-center tc gray flex-wrap">
      <div>
        <p className="db f3 fw5 mb0">
          <IconFailure size={40} />
        </p>
        <div className="mv6">
          <FormattedMessage id="promotions.promotion.error.noAccess" />
        </div>
      </div>
    </div>
  )
}

NoAccessPage.proptypes = {}

export default injectIntl(NoAccessPage)
