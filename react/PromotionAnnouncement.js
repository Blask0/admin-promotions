import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'

import cover from './assets/announcement_cover.jpg';

// import {
//   Layout,
//   PageBlock,
//   PageHeader,
//   Button,
//   Alert,
//   withToast,
// } from 'vtex.styleguide'

class PromotionAnnouncement extends Component {
  render() {
    return (
        <div className="pa9 bg-muted-5 c-on-base">
            <div className="center mw7">
                <h1 className="t-heading-1">
                    <FormattedMessage id="promotions.announcement.title" />
                </h1>

                <h2 className="t-heading-4 lh-copy mt0">
                    <FormattedMessage id="promotions.announcement.subtitle" />
                </h2>

                <img className="mv7" src={cover}/>

                <p className="t-body lh-copy">
                    <FormattedMessage id="promotions.announcement.a1" />
                </p>

                <p className="t-body lh-copy">
                    <FormattedMessage id="promotions.announcement.a2" />
                </p>

                <h3 className="t-heading-5 mt7">
                    <FormattedMessage id="promotions.announcement.b1" />
                </h3>

                <p className="t-body lh-copy">
                    <FormattedMessage id="promotions.announcement.b2" />
                </p>

                <h3 className="t-heading-5 mt7">
                    <FormattedMessage id="promotions.announcement.c1" />
                </h3>

                <ul className="t-body lh-copy">
                    <li>
                        <FormattedMessage id="promotions.announcement.c2" />
                    </li>
                    <li>
                        <FormattedMessage id="promotions.announcement.c3" />
                    </li>
                    <li>
                        <FormattedMessage id="promotions.announcement.c4" />
                    </li>
                    <li>
                        <FormattedMessage id="promotions.announcement.c5" />
                    </li>
                    <li>
                        <FormattedMessage id="promotions.announcement.c6" />
                    </li>
                </ul>       

                
                
                <h2 className="mt8">
                    <FormattedMessage id="promotions.announcement.d1" />
                </h2>

                <h3 className="t-heading-5 mt7">
                    <FormattedMessage id="promotions.announcement.e1" />
                </h3>

                <p className="t-body lh-copy">
                    <FormattedMessage id="promotions.announcement.e2" />
                </p>

                <ul className="t-body lh-copy">
                    <li>
                        <FormattedMessage id="promotions.announcement.e3" />
                    </li>
                    <li>
                        <FormattedMessage id="promotions.announcement.e4" />
                    </li>
                    <li>
                        <FormattedMessage id="promotions.announcement.e5" />
                    </li>
                    <li>
                        <FormattedMessage id="promotions.announcement.e6" />
                    </li>
                </ul>

                <h3 className="t-heading-5 mt7">
                    <FormattedMessage id="promotions.announcement.f1" />
                </h3>

                <p className="t-body lh-copy">
                    <FormattedMessage id="promotions.announcement.f2" />
                </p>                

                <ul className="t-body lh-copy">
                    <li>
                        <FormattedMessage id="promotions.announcement.f3" />
                    </li>
                    <li>
                        <FormattedMessage id="promotions.announcement.f4" />
                    </li>
                </ul>

                
                <h2 className="mt8">
                    <FormattedMessage id="promotions.announcement.g1" />
                </h2>

                <p className="t-body lh-copy">
                    <FormattedMessage id="promotions.announcement.g2" />
                </p>

                
                <hr className="b--black-10 bt-0 mv9"></hr>


                <p className="t-body lh-copy">
                    <FormattedMessage id="promotions.announcement.h1" />
                </p>

                
                <h2 className="mt8">
                    <FormattedMessage id="promotions.announcement.i1" />
                </h2>
                <h3 className="t-heading-5 mw6">
                    <FormattedMessage id="promotions.announcement.i2" />
                </h3>

                <div className="t-body lh-copy">
                    <FormattedMessage id="promotions.announcement.j1" />
                </div>

                <div className="t-body lh-copy">
                    <FormattedMessage id="promotions.announcement.j2" />
                </div>

            </div>
        </div>
    )
  }
}

PromotionAnnouncement.propTypes = {
  intl: intlShape
}

export default compose(injectIntl)(PromotionAnnouncement)
