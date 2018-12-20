import React, { Component } from 'react'
import Conditions from '../Conditions'
import MultiSelectWrapper from './MultiSelectWrapper'

import translate from '../../graphql/translate.graphql'

import { compose, graphql } from 'react-apollo'

const isOrNot = [
  {
    label: 'is',
    value: '=',
    objectId: 'default',
  },
  {
    label: 'is not',
    value: '!=',
    objectId: 'default',
  },
]

class Audience extends Component {
  constructor(props) {
    super(props)

    this.state = {
      operator: 'all',
      audience: [{ subject: '', verb: '', objects: [], errorMessage: null }],
    }
  }

  render() {
    return (
      <Conditions
        isDebug={false}
        showOperator={false}
        operator={'all'}
        conditions={this.state.audience}
        onChangeOperator={operator => this.setState({ operator })}
        onChangeConditions={conditions =>
          this.setState({ audience: conditions })
        }
        choices={[
          {
            subject: {
              label: 'Payment method',
              value: 'payment-method',
            },
            verbs: isOrNot,
            objects: {
              default: [<MultiSelectWrapper />],
            },
          },
        ]}
      />
    )
  }
}

export default compose(graphql(translate))(Audience)
