import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import withAuditInfo from '../../connectors/withAuditInfo'

class HistorySection extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { auditInfo } = this.props

    return (
      <Fragment>
        <div>
          {auditInfo.data.map((item, index) => (
            <Item key={index} item={item} />
          ))}
        </div>
      </Fragment>
    )
  }
}

HistorySection.propTypes = {
  intl: intlShape,
}

export default withAuditInfo(injectIntl(HistorySection))
