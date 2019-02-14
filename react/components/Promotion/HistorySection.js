import React, { Component, Fragment } from 'react'
import Item from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import withAuditInfo from '../../connectors/withAuditInfo'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

class HistorySection extends Component {
  constructor(props) {
    super(props)

    TimeAgo.addLocale(en)
  }

  componentDidMount = () => {
    this.props.updateQueryParams({ promoId: this.props.promoId })
  }

  calculateOffset = (eventTime, timeAgo) => {
    console.log(new Date(eventTime))

    timeAgo.format(new Date())
    // "just now"

    timeAgo.format(Date.now() - 60 * 1000)
    // "a minute ago"

    timeAgo.format(Date.now() - 2 * 60 * 60 * 1000)
    // "2 hours ago"

    timeAgo.format(Date.now() - 24 * 60 * 60 * 1000)
    // "a day ago"
    console.log(timeAgo.format(new Date(eventTime)))
    return timeAgo.format(new Date(eventTime))
  }

  render() {
    const { auditInfo } = this.props
    const timeAgo = new TimeAgo('en-US')
    const listItems = auditInfo
      ? auditInfo.map(element => {
        const offset = this.calculateOffset(element.eventTime, timeAgo)
        const row = (
          <div>
            <strong>{element.author}</strong> made changes
            <span className="fr">{offset}</span>
          </div>
        )
        return <li className="mt6">{row}</li>
      })
      : []

    return (
      <div className="pl7 mb7">
        <h4 className="t-heading-4 mt0">
          <FormattedMessage id="promotions.promotion.history.title" />
        </h4>
        {/* {auditInfo
          ? auditInfo.map((item, index) => {
            console.log(Item)
            console.log('author ', item.author, index)
            console.log(auditInfo)
            // return (
            // //   <Item key={index} item={item.author} />
            // // <div>
            // //   <span>{index}</span>
            // //   <span>{item.author}</span>
            // // </div>
            // )
          })
          : null} */}

        {auditInfo ? <ul> {listItems} </ul> : null}
      </div>
    )
  }
}

HistorySection.propTypes = {
  intl: intlShape,
  promoId: PropTypes.string,
  updateQueryParams: PropTypes.func,
}

export default withAuditInfo(injectIntl(HistorySection))
