import React from 'react'
import {
  injectIntl,
  InjectedIntlProps,
  FormattedMessage,
  defineMessages,
} from 'react-intl'

import { Checkbox, Link } from 'vtex.styleguide'

type GeneralInfo = {
  highlight: boolean
}

export type Props = {
  generalInfo: GeneralInfo
  updatePageState: (newGiftEffect: Partial<Props['generalInfo']>) => void
}

const AppearanceSection: React.FC<Props & InjectedIntlProps> = ({
  intl,
  generalInfo,
  updatePageState,
}) => {
  return (
    <>
      <h4 className="t-heading-4 mt0">
        <FormattedMessage id="promotions.promotion.appearance" />
      </h4>

      <Checkbox
        checked={generalInfo.highlight}
        id="highlight"
        label={intl.formatMessage(messages.effectFilterLabel)}
        name="highlight-checkbox"
        onChange={() => {
          updatePageState({
            highlight: !generalInfo.highlight,
          })
        }}
      />
      <span className="mt2 ml6 f6 c-muted-1">
        <FormattedMessage id="promotions.promotion.generalInfo.highlight.helpText" />
        <Link
          href="https://help.vtex.com/tutorial/configurando-promocao-com-destaque-flag--tutorials_2295"
          target="_blank"
          mediumWeigth>
          Help Center
        </Link>
      </span>
    </>
  )
}

export default injectIntl(AppearanceSection)

const messages = defineMessages({
  effectFilterLabel: {
    id: 'promotions.promotion.generalInfo.highlight',
    defaultMessage: 'Highlight promotion in product shelves and product page.',
    description: 'Label for highlight checkbox',
  },
})
