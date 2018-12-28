/* eslint-disable react/jsx-pascal-case */
/* eslint-disable camelcase */
import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import translate from '../../graphql/translate.graphql'
import { compose, graphql } from 'react-apollo'
import {
  Dropdown,
  MultiSelect,
  Input,
  DatePicker,
  EXPERIMENTAL_Conditions,
} from 'vtex.styleguide'

class Audience extends Component {
  constructor(props) {
    super(props)

    this.state = {
      operator: 'all',
      statements: [],
    }

    this.options = {
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
      shippingMethod: {
        unique: true,
        label: props.intl.formatMessage({ id: 'input.label.scheduling' }),
        verbs: [
          {
            label: 'is',
            value: 'is',
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

  complexDropdownObject({ statements, values, statementIndex, error }) {
    return (
      <Dropdown
        value={values}
        options={[]}
        onChange={(e, value) => {
          statements[statementIndex].object = value

          this.setState({ statements })
        }}
      />
    )
  }

  complexMultiselectObject({ statements, values, statementIndex, error }) {
    return (
      <div className="nt3">
        <MultiSelect
          emptyState={term => {
            return `Your search for the color "${term}" did not find any results.`
          }}
          options={[]}
          onChange={selected => {
            statements[statementIndex].object = selected

            this.setState({ statements })
          }}
          selected={values || []}
        />
      </div>
    )
  }

  complexDatePickerObject({ statements, values, statementIndex, error }) {
    return (
      <DatePicker
        value={values}
        onChange={date => {
          statements[statementIndex].object = date

          this.setState({ statements })
        }}
        locale="en-US"
      />
    )
  }

  complexDatePickerRangeObject({ statements, values, statementIndex, error }) {
    return (
      <div className="flex">
        <div style={{ maxWidth: 140 }}>
          <DatePicker
            style={{ maxWidth: 140 }}
            value={values && values.from}
            errorMessage={
              statements[statementIndex].object &&
              statements[statementIndex].object.from >=
                statements[statementIndex].object.to
                ? 'Must be before end date'
                : ''
            }
            onChange={date => {
              statements[statementIndex].object = {
                ...(statements[statementIndex].object || {}),
                from: date,
              }

              this.setState({ statements })
            }}
            locale="en-US"
          />
        </div>

        <div className="mv4 mh3 c-muted-2 b">and</div>

        <div style={{ maxWidth: 140 }}>
          <DatePicker
            value={values && values.to}
            onChange={date => {
              statements[statementIndex].object = {
                ...(statements[statementIndex].object || {}),
                to: date,
              }

              this.setState({ statements })
            }}
            locale="en-US"
          />
        </div>
      </div>
    )
  }

  complexNumericInputObject({ statements, values, statementIndex, error }) {
    return (
      <Input
        placeholder="Insert age..."
        type="number"
        min={0}
        value={values}
        onChange={e => {
          statements[statementIndex].object = e.target.value.replace(/\D/g, '')
          this.setState({ statements })
        }}
      />
    )
  }

  complexNumericInputRangeObject({
    statements,
    values,
    statementIndex,
    error,
  }) {
    return (
      <div className="flex">
        <Input
          placeholder="Age from..."
          errorMessage={
            statements[statementIndex].object &&
            parseInt(statements[statementIndex].object.first) >=
              parseInt(statements[statementIndex].object.last)
              ? 'Must be smaller than other input'
              : ''
          }
          value={values && values.first ? values.first : ''}
          onChange={e => {
            const currentObject = statements[statementIndex].object || {}
            currentObject.first = e.target.value.replace(/\D/g, '')

            statements[statementIndex].object = currentObject

            this.setState({ statements })
          }}
        />

        <div className="mv4 mh3 c-muted-2 b">and</div>

        <Input
          placeholder="Age to..."
          value={values && values.last ? values.last : ''}
          onChange={e => {
            const currentObject = statements[statementIndex].object || {}
            currentObject.last = e.target.value.replace(/\D/g, '')

            statements[statementIndex].object = currentObject

            this.setState({ statements })
          }}
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        <EXPERIMENTAL_Conditions
          showOperator={false}
          options={this.options}
          statements={this.state.statements}
          operator={this.state.operator}
          onChangeOperator={this.handleToggleOperator}
          onChangeStatements={statements => {
            this.setState({ statements })
          }}
        />
      </div>
    )
  }
}

Audience.propTypes = {
  intl: intlShape.isRequired,
}

export default compose(graphql(translate))(injectIntl(Audience))
