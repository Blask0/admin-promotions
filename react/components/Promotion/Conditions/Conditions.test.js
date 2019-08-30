import React from 'react'
import { render } from '@vtex/test-tools/react'

import EXPERIMENTAL_Conditions from '@vtex/styleguide/lib/EXPERIMENTAL_Conditions'

import { utm } from './options/'

describe('Conditions components tests', () => {
  function renderComponent({ options, statements }) {
    return render(
      <EXPERIMENTAL_Conditions
        options={options}
        subjectPlaceholder="subject"
        statements={statements}
        operator={'all'}
        onChangeOperator={jest.fn()}
        onChangeStatements={jest.fn()}
      />
    )
  }

  const MOCK = jest.fn()
  const MOCK_INTL = {
    formatMessage: ({ id }) => id,
  }

  describe('UTM Source statement tests', () => {
    const options = {
      utmSource: utm(MOCK_INTL, MOCK, 'Source'),
    }

    it('should have a UTM Source with `equals` verb displayed', async () => {
      const statements = [
        {
          subject: 'utmSource',
          verb: '==',
          object: 'facebook',
        },
      ]

      const { getByText, getByDisplayValue } = renderComponent({
        options,
        statements,
      })

      const { subject, verb, object } = {
        subject: getByText('promotions.promotion.elligibility.utmSource.label'),
        verb: getByText('promotions.promotion.elligibility.utm.verb.=='),
        object: getByDisplayValue('facebook'),
      }

      expect(subject).toBeDefined()
      expect(verb).toBeDefined()
      expect(object).toBeDefined()
    })

    it('should have a UTM Source with `any` verb displayed', async () => {
      const statements = [
        {
          subject: 'utmSource',
          verb: 'any',
          object: [
            { label: 'FACEBOOK', value: 'facebook' },
            { label: 'TWITTER', value: 'twitter' },
          ],
        },
      ]

      const { getByText } = renderComponent({
        options,
        statements,
      })

      const { subject, verb, object } = {
        subject: getByText('promotions.promotion.elligibility.utmSource.label'),
        verb: getByText('promotions.promotion.elligibility.utm.verb.any'),
        object: [getByText('FACEBOOK'), getByText('TWITTER')],
      }

      expect(subject).toBeDefined()
      expect(verb).toBeDefined()
      object.forEach(obj => expect(obj).toBeDefined)
    })
  })

  describe('UTM Campaign statement tests', () => {
    const options = {
      utmCampaign: utm(MOCK_INTL, MOCK, 'Campaign'),
    }

    it('should have a UTM Campaign with `equals` verb displayed', async () => {
      const statements = [
        {
          subject: 'utmCampaign',
          verb: '==',
          object: "Mother's day",
        },
      ]

      const { getByText, getByDisplayValue } = renderComponent({
        options,
        statements,
      })

      const { subject, verb, object } = {
        subject: getByText(
          'promotions.promotion.elligibility.utmCampaign.label'
        ),
        verb: getByText('promotions.promotion.elligibility.utm.verb.=='),
        object: getByDisplayValue("Mother's day"),
      }

      expect(subject).toBeDefined()
      expect(verb).toBeDefined()
      expect(object).toBeDefined()
    })

    it('should have a UTM Campaign with `any` verb displayed', async () => {
      const statements = [
        {
          subject: 'utmCampaign',
          verb: 'any',
          object: [
            { label: "Mother's day", value: 'mother-day' },
            { label: "Father's day", value: 'father-day' },
          ],
        },
      ]

      const { getByText } = renderComponent({
        options,
        statements,
      })

      const { subject, verb, object } = {
        subject: getByText(
          'promotions.promotion.elligibility.utmCampaign.label'
        ),
        verb: getByText('promotions.promotion.elligibility.utm.verb.any'),
        object: [getByText("Mother's day"), getByText("Father's day")],
      }

      expect(subject).toBeDefined()
      expect(verb).toBeDefined()
      object.forEach(obj => expect(obj).toBeDefined)
    })
  })
})
