import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import withAuditInfo from '../../connectors/withAuditInfo'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import pt from 'javascript-time-ago/locale/pt'
import es from 'javascript-time-ago/locale/es-AR'
import { Spinner } from 'vtex.styleguide'

class HistorySection extends Component {
  constructor(props) {
    super(props)

    TimeAgo.addLocale(en)
    TimeAgo.addLocale(pt)
    TimeAgo.addLocale(es)
  }

  componentDidMount = () => {
    this.props.updateQueryParams({ promoId: this.props.promoId })
  }

  calculateOffset = (eventTime, timeAgo) => {
    return timeAgo.format(new Date(eventTime))
  }

  render() {
    const { auditInfo, intl } = this.props
    const timeAgo = new TimeAgo(intl.locale)
    console.log(auditInfo)
    const listItems = auditInfo
      ? auditInfo.map(element => {
        const offset = this.calculateOffset(element.eventTime, timeAgo)
        const row = (
          <div className="overflow-hidden">
            <div className="w-80 truncate">
              <strong>{element.author}</strong>{' '}
              <FormattedMessage id="promotions.promotion.history.madeChanges" />
            </div>
            <span className="fr">{offset}</span>
          </div>
        )
        return <li className="mt6">{row}</li>
      })
      : []

    return (
      <div className="ph7 mb7">
        <h4 className="t-heading-4 mt0">
          <FormattedMessage id="promotions.promotion.history.title" />
        </h4>
        {auditInfo ? <ul> {listItems} </ul> : <Spinner />}
      </div>
    )
  }
}

HistorySection.propTypes = {
  intl: intlShape,
  promoId: PropTypes.string,
  updateQueryParams: PropTypes.func,
  auditInfo: PropTypes.array,
}

export default withAuditInfo(injectIntl(HistorySection))
