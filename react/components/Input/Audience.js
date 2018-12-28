/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react'
import MultiSelectWrapper from './MultiSelectWrapper'

import translate from '../../graphql/translate.graphql'

import { compose, graphql } from 'react-apollo'

import { EXPERIMENTAL_Conditions } from 'vtex.styleguide'

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
      statements: [],
    }

    const options = {
      age: {
        unique: true,
        label: 'User age',
        verbs: [
          {
            label: 'is',
            value: '=',
            object: this.complexNumericInputObject,
          },
          {
            label: 'is between',
            value: 'between',
            object: this.complexNumericInputRangeObject,
          },
        ],
      },
      color: {
        unique: true,
        label: 'User favorite color',
        verbs: [
          {
            label: 'is',
            value: '=',
            object: this.complexDropdownObject,
          },
          {
            label: 'is any of',
            value: 'any',
            object: this.complexMultiselectObject,
          },
        ],
      },
      birthday: {
        unique: true,
        label: 'User birthday',
        verbs: [
          {
            label: 'is',
            value: '=',
            object: this.complexDatePickerObject,
          },
          {
            label: 'is between',
            value: 'between',
            object: this.complexDatePickerRangeObject,
          },
        ],
      },
    }
  }

  render() {
    return (
      <EXPERIMENTAL_Conditions
        showOperator={false}
        options={options}
        statements={this.state.statements}
        operator={this.state.operator}
        onChangeOperator={this.handleToggleOperator}
        onChangeStatements={statements => {
          this.setState({ statements })
        }}
      />
    )
  }
}

export default compose(graphql(translate))(Audience)
