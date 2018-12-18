import React from 'react'
import renderer from 'react-test-renderer'

import { BenefitListContainer } from './BenefitList'

describe('The Benefit List', () => {
  const mockBenefits = [
    { name: 'free-shipping', isActive: true, campaigns: [{ name: 'mock' }] },
    { name: '50-percent-off', isActive: false, campaigns: [] },
  ]
  const mockCampaign = { name: 'mock' }

  describe('The Container Component', () => {
    it('Should filter benefits associated with the context campaign'  , () => {
      const instance = renderer
        .create(
          <BenefitListContainer
            campaign={mockCampaign}
            data={{ getBenefits: mockBenefits }}
          />
        )
        .getInstance()

      expect(instance.filterByCampaign(mockBenefits[0])).toBeTruthy()
      expect(instance.filterByCampaign(mockBenefits[1])).toBeFalsy()
    })

    it('Should pass down all benefits if no campaign specified', () => {
      const instance = renderer
        .create(<BenefitListContainer data={{ getBenefits: mockBenefits }} />)
        .getInstance()

      expect(mockBenefits.filter(instance.filterByCampaign)).toHaveLength(
        mockBenefits.length
      )
    })
  })
})
