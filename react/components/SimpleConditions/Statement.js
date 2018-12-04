import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Input } from 'vtex.styleguide'

class Statement extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      errorMessage: '',
    }
  }

  static RemoveButton = props => (
    <div className="mh3 pointer" onClick={e => props.remove()}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M11.7429 0.257143C11.4 -0.0857143 10.8857 -0.0857143 10.5429 0.257143L6 4.8L1.45714 0.257143C1.11429 -0.0857143 0.6 -0.0857143 0.257143 0.257143C-0.0857143 0.6 -0.0857143 1.11429 0.257143 1.45714L4.8 6L0.257143 10.5429C-0.0857143 10.8857 -0.0857143 11.4 0.257143 11.7429C0.428571 11.9143 0.6 12 0.857143 12C1.11429 12 1.28571 11.9143 1.45714 11.7429L6 7.2L10.5429 11.7429C10.7143 11.9143 10.9714 12 11.1429 12C11.3143 12 11.5714 11.9143 11.7429 11.7429C12.0857 11.4 12.0857 10.8857 11.7429 10.5429L7.2 6L11.7429 1.45714C12.0857 1.11429 12.0857 0.6 11.7429 0.257143Z"
          fill="#979899"
        />
      </svg>
    </div>
  )

  static Subject = props => (
    <div className="w-30 mh3">
      <Dropdown
        options={props.choices.map(choice => {
          return {
            value: choice.subject.value,
            label: choice.subject.label,
          }
        })}
        value={!props.condition.subject ? '' : props.condition.subject || ''}
        onChange={(e, value) => props.onChange(value)}
      />
    </div>
  )

  static Verb = props => (
    <div className="w-20 mh3">
      <Dropdown
        disabled={!props.condition.subject}
        options={props.options}
        value={!props.condition.subject ? '' : props.condition.operator || ''}
        onChange={(e, value) => props.onChange(value)}
      />
    </div>
  )

  static Object = props => (
    <div className="w-30 mh3">
      {props.condition.subject && props.choice.type === 'selector' ? (
        <Dropdown
          disabled={!props.condition.operator}
          options={props.choice.options}
          value={!props.condition.operator ? '' : props.condition.value || ''}
          onChange={(e, value) => props.onChange(value, 'value')}
        />
      ) : (
        <Input
          disabled={!props.condition.operator}
          value={!props.condition.operator ? '' : props.condition.value}
          onChange={e => props.onChange(e.target.value, 'value')}
        />
      )}
    </div>
  )

  handleChangeStatement = (value, param) => {
    this.props.onChangeStatement(value, param)
  }

  handleRemoveStatement = () => {
    this.props.onRemoveStatement()
  }

  getChoiceBySubject = subjectValue => {
    const { choices } = this.props
    const foundChoice = choices.find(
      choice => choice.subject.value === subjectValue
    )

    if (!foundChoice) {
      return { subject: '', operators: [], value: null }
    }

    return foundChoice
  }

  clearPredicate = () => {
    this.handleChangeStatement(Statement.defaultProps.operator, 'operator')
    this.handleChangeStatement(Statement.defaultProps.value, 'value')
  }

  render() {
    const { condition, choices } = this.props

    console.dir(condition)
    return (
      <div className="flex flex-column w-100 mv3">
        <div className="flex flex-row w-100 items-center mv3">
          <Statement.Subject
            condition={condition}
            choices={choices}
            onChange={value => {
              this.handleChangeStatement(value, 'subject')
              this.clearPredicate()
            }}
          />

          <Statement.Verb
            condition={condition}
            choices={choices}
            options={
              !condition.subject
                ? [
                  {
                    value: '',
                    label: '',
                  },
                ]
                : this.getChoiceBySubject(condition.subject).operators
            }
            onChange={value => {
              this.handleChangeStatement(value, 'operator')
            }}
          />

          <Statement.Object
            condition={condition}
            choice={this.getChoiceBySubject(condition.subject)}
            onChange={value => {
              this.handleChangeStatement(value, 'value')
            }}
          />

          <Statement.RemoveButton remove={this.handleRemoveStatement()} />
        </div>

        {this.state.errorMessage && (
          <div className="c-danger t-small mt2 lh-title">
            {this.state.errorMessage}
          </div>
        )}
      </div>
    )
  }
}

Statement.defaultProps = {
  onRemoveStatement: () => {},
  onChangeStatement: () => {},
  condition: {
    subject: '',
    operator: '',
    value: null,
  },
}

Statement.propTypes = {
  /** Current options for this Statement */
  condition: PropTypes.shape({
    subject: PropTypes.string,
    operator: PropTypes.string,
    value: PropTypes.any,
  }),
  /** Possible choices and respective data types, operator options */
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      subject: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
      type: PropTypes.string,
      format: PropTypes.string,
      operators: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
        })
      ),
    })
  ),
  /** Statement change callback */
  onChangeStatement: PropTypes.func,
  /** Statement remove callback */
  onRemoveStatement: PropTypes.func,
}

export default Statement
