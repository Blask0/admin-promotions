import React from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'

import EXPERIMENTAL_Conditions from '@vtex/styleguide/lib/EXPERIMENTAL_Conditions'
import utm from '../../utils/conditions/options/utm'

describe('Conditions', () => {
  function renderComponent({ options, statements }) {
    return render(
      <EXPERIMENTAL_Conditions
        options={options}
        statements={statements}
        operator={'all'}
        onChangeOperator={jest.fn()}
        onChangeStatements={jest.fn()}
      />
    )
  }

  it.only('should be displayed if props are passed', async () => {
    const MOCK = jest.fn()
    const MOCK_INTL = {
      formatMessage: ({ id }) => id,
    }
    const options = {
      utmSource: utm(MOCK_INTL, MOCK, 'Source'),
    }

    const statements = [
      {
        subject: 'utmSource',
        verb: '==',
        object: 'facebook',
      },
    ]

    const { debug, getByText } = renderComponent({
      options,
      statements,
    })

    debug()

    const { subject, verb, object } = {
      subject: getByText('promotions.promotion.elligibility.utmSource.label'),
      verb: getByText('promotions.promotion.elligibility.utm.verb.=='),
      object: getByText('facebook'),
    }

    expect(subject).toBeDefined()
    expect(verb).toBeDefined()
    expect(object).toBeDefined()
  })
})
