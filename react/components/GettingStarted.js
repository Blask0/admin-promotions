import React, { PureComponent } from 'react'
import CreatePromotionButton from './Button/CreatePromotion'
import Columns from './Icon/Columns'
import { WrappedGift } from './Icon/Gift'
import User from './Icon/User'

class GettingStarted extends PureComponent {
  static BulletPoint = props => {
    return (
      <div className="dt pv5">
        <span className="dtc v-mid c-emphasis">{props.icon}</span>
        <span className="dtc v-mid f5 w5 c-muted-1 pl4">{props.text}</span>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h1 className="f3 normal ma0">Getting Started</h1>
        <p className="f5">
          Welcome to our new Promotions Admin (Formerly known as Rates and
          Benefits). Here, you can:
        </p>
        <div className="flex flex-wrap items-center justify-between">
          <GettingStarted.BulletPoint
            icon={<User />}
            text="Define the target audience for your promotiomns"
          />
          <GettingStarted.BulletPoint
            icon={<WrappedGift />}
            text="Provide discounts, free shipping, gifts and much more"
          />
          <GettingStarted.BulletPoint
            icon={<Columns />}
            text="Manage audiences and promotions on the same page"
          />
        </div>
        <div className="pt6 tc">
          <CreatePromotionButton />
          <a className="db pt4" href="https://www.google.com/">
            Learn More
          </a>
        </div>
      </div>
    )
  }
}

export default GettingStarted
