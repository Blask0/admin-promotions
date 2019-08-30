import React from 'react'
import { InjectedIntl, injectIntl, InjectedIntlProps } from 'react-intl'

import { SelectObject, SelectObjectProps } from '../../../Conditions/Objects'

import { SelectValue } from '../../../Conditions/Objects/SelectObject'

interface MarketingTagsSelectProps
  extends SelectObjectProps,
    InjectedIntlProps {
  onChange: (
    value: MarketingTagsSelectProps['value'],
    error?: SelectObjectProps['error']
  ) => void
  value: SelectValue[]
}

const MarketingTagsSelect: React.FC<MarketingTagsSelectProps> = ({
  onChange,
  intl,
  ...props
}) => {
  return (
    <SelectObject
      {...props}
      creatable
      multi
      onChange={(value: MarketingTagsSelectProps['value']) => {
        const error = value.some(
          item =>
            typeof item.value === 'string' && !item.value.match(/^\w+=\w+/g)
        )
          ? intl.formatMessage({
              id:
                'promotions.promotion.elligibility.marketingTags.errorMessage',
            })
          : undefined
        onChange(value, error)
      }}
      placeholder={intl.formatMessage({
        id: 'promotions.promotion.elligibility.marketingTags.placeholder',
      })}
    />
  )
}

const MarketingTagsSelectObject = injectIntl<MarketingTagsSelectProps>(
  MarketingTagsSelect
)

const marketingTags = (intl: InjectedIntl) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.marketingTags.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.marketingTags.verb.any',
        }),
        value: 'any',
        object: (props: any) => <MarketingTagsSelectObject {...props} />,
      },
      // {
      //   label: intl.formatMessage({
      //     id: 'promotions.promotion.elligibility.marketingTags.verb.not.any',
      //   }),
      //   value: 'not.any',
      //   object: {
      //     renderFn: renderSelectObject,
      //     extraParams: {
      //       queryInfo: {
      //         connector: WrappedComponent => props => (
      //           <WrappedComponent {...props} />
      //         ),
      //         dataGetter: () => [],
      //       },
      //       placeholder: intl.formatMessage({
      //         id: 'promotions.promotion.elligibility.marketingTags.placeholder',
      //       }),
      //       validation: {
      //         execute: selected =>
      //           selected.filter(({ value }) => !value.match(/^\w+=\w+/g))
      //             .length === 0,
      //         errorMessage: intl.formatMessage({
      //           id:
      //             'promotions.promotion.elligibility.marketingTags.errorMessage',
      //         }),
      //       },
      //       multi: true,
      //       creatable: true,
      //       update: update,
      //     },
      //   },
      // },
    ],
  }
}

export default marketingTags
