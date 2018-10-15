import React, { PureComponent } from 'react'

import Columns from './Icon/Columns'
import User from './Icon/User'
import { WrappedGift } from './Icon/Gift'

import CreateCampaignButton from './Button/CreateCampaign'

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
        <p className="f5">Welcome to our new Campaigns Admin. Here, you can:</p>
        <div className="flex flex-wrap items-center justify-between">
          <GettingStarted.BulletPoint
            icon={<User />}
            text="Define the target audience for your campaigns"
          />
          <GettingStarted.BulletPoint
            icon={<WrappedGift />}
            text="Provide discounts, free shipping, gifts and much more"
          />
          <GettingStarted.BulletPoint
            icon={<Columns />}
            text="Manage campaigns and benefits on the same page"
          />
        </div>
        <div className="pt6 tc">
          <CreateCampaignButton />
          <a className="db pt4" href="https://www.google.com/">
            Learn More
          </a>
        </div>
      </div>
    )
  }
}

export default GettingStarted
