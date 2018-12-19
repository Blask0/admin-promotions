import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dropdown, Input, IconClose } from 'vtex.styleguide'

class Statement extends React.Component {
  constructor(props) {
    super(props)

    this.statementRef = React.createRef()

    this.state = {
      error: null,
    }
  }

  static RemoveButton = props => (
    <div
      className="mh3 mt4 pointer flex-auto"
      style={{ maxWidth: 50 }}
      onClick={e => props.remove()}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M11.7429 0.257143C11.4 -0.0857143 10.8857 -0.0857143 10.5429 0.257143L6 4.8L1.45714 0.257143C1.11429 -0.0857143 0.6 -0.0857143 0.257143 0.257143C-0.0857143 0.6 -0.0857143 1.11429 0.257143 1.45714L4.8 6L0.257143 10.5429C-0.0857143 10.8857 -0.0857143 11.4 0.257143 11.7429C0.428571 11.9143 0.6 12 0.857143 12C1.11429 12 1.28571 11.9143 1.45714 11.7429L6 7.2L10.5429 11.7429C10.7143 11.9143 10.9714 12 11.1429 12C11.3143 12 11.5714 11.9143 11.7429 11.7429C12.0857 11.4 12.0857 10.8857 11.7429 10.5429L7.2 6L11.7429 1.45714C12.0857 1.11429 12.0857 0.6 11.7429 0.257143Z"
          fill="#979899"
        />
      </svg>
    </div>
  )

  static EmptyObject = () => (
    <div className="flex-auto">
      <div className="mh3 mb3">
        <Input key={'object-0'} disabled />
      </div>
    </div>
  )

  static Dropdown = props => {
    return <Dropdown {...props} style={{ minWidth: '250px' }} />
  }

  static Subject = props => (
    <div className="flex-auto">
      <div className={`mh3 ${props.isFullWidth ? 'pb3' : ''}`}>
        <Statement.Dropdown
          options={Object.keys(props.choices).map(choiceKey => {
            return {
              value: choiceKey,
              label: props.choices[choiceKey].label,
            }
          })}
          value={!props.condition.subject ? '' : props.condition.subject || ''}
          onChange={(e, value) => props.onChange(value)}
        />
      </div>
    </div>
  )

  static Verb = props => (
    <div className={`mh3 ${props.isFullWidth ? 'pb3' : ''}`}>
      <Statement.Dropdown
        disabled={!props.condition.subject}
        options={props.verbs}
        value={!props.condition.subject ? '' : props.condition.verb || ''}
        onChange={(e, value) => {
          const foundVerb = props.verbs.find(verb => verb.value === value)
          props.onChange(foundVerb)
        }}
      />
    </div>
  )

  handleChangeStatement = (newValue, structure) => {
    this.props.onChangeStatement(newValue, structure)
  }

  handleRemoveStatement = () => {
    this.props.onRemoveStatement()
  }

  getChoiceBySubject = subject => {
    const { choices } = this.props
    return choices[subject]
  }

  clearPredicate = () => {
    this.handleChangeStatement(Statement.defaultProps.condition.verb, 'verb')
    this.handleChangeStatement(
      Statement.defaultProps.condition.object,
      'object'
    )
    this.handleChangeStatement(null, 'error')
  }

  clearObjects = () => {
    this.handleChangeStatement(
      Statement.defaultProps.condition.object,
      'object'
    )
    this.handleChangeStatement(null, 'error')
  }

  renderSubject = entities => {
    const { condition, choices, isFullWidth } = this.props

    entities.push(
      <Statement.Subject
        condition={condition}
        choices={choices}
        isFullWidth={isFullWidth}
        onChange={selectedSubjectValue => {
          this.handleChangeStatement(selectedSubjectValue, 'subject')
          this.clearPredicate()
        }}
      />
    )

    return entities
  }

  renderVerbs = entities => {
    const { condition, choices, isFullWidth } = this.props
    const myChoice = this.getChoiceBySubject(condition.subject)
    const desiredVerbs = []

    desiredVerbs.push(
      <Statement.Verb
        condition={condition}
        choices={choices}
        isFullWidth={isFullWidth}
        verbs={
          !condition.subject
            ? [
              {
                value: '',
                label: '',
              },
            ]
            : myChoice.verbs
        }
        onChange={verb => {
          this.handleChangeStatement(verb.value, 'verb')
          this.clearObjects()
        }}
      />
    )

    entities.push(<div className="flex-auto">{desiredVerbs}</div>)

    return entities
  }

  renderObjects = (entities, row) => {
    const { condition, conditions } = this.props
    const myChoice = this.getChoiceBySubject(condition.subject)

    if (!condition.verb) {
      entities.push(<Statement.EmptyObject />)
      return entities
    }

    const currentVerb = myChoice.verbs.find(
      verb => verb.value === condition.verb
    )

    if (!currentVerb) {
      entities.push(<Statement.EmptyObject />)
      return entities
    }

    console.dir(currentVerb)
    entities.push(
      <div className="mh3 flex-auto">
        {currentVerb.object({
          conditions: conditions,
          value: condition.object,
          conditionIndex: row,
          error: null,
        })}
      </div>
    )

    return entities
  }

  render() {
    const { canDelete, isRtl, isFullWidth, row } = this.props
    const order = isRtl ? 'OVS' : 'SVO'
    let statementAtoms = []

    order.split('').map(entity => {
      if (entity === 'S') {
        statementAtoms = this.renderSubject(statementAtoms)
      }

      if (entity === 'V') {
        statementAtoms = this.renderVerbs(statementAtoms)
      }

      if (entity === 'O') {
        statementAtoms = this.renderObjects(statementAtoms, row)
      }
    })

    return (
      <div ref={this.statementRef}>
        <div className="flex-column w-100 mv3">
          <div
            className={`flex w-100 items-start ${
              isFullWidth ? 'flex-column items-stretch' : ''
            }`}>
            {canDelete && !isFullWidth && isRtl && (
              <Statement.RemoveButton
                remove={() => {
                  this.handleRemoveStatement()
                }}
              />
            )}
            {statementAtoms}
            {canDelete && !isFullWidth && !isRtl && (
              <Statement.RemoveButton
                remove={() => {
                  this.handleRemoveStatement()
                }}
              />
            )}
            {canDelete && isFullWidth && (
              <div className="tr">
                <Button
                  variation="tertiary"
                  size="small"
                  onClick={() => this.handleRemoveStatement()}>
                  <div className="dib">
                    <IconClose className="c-on-action-primary" />
                  </div>

                  <div className="dib mb1 v-mid" style={{ lineHeight: '10px' }}>
                    DELETE
                  </div>
                </Button>
              </div>
            )}
          </div>
          {this.props.condition.error && (
            <div className="red f6 mh3 lh-title">
              {this.props.condition.error}
            </div>
          )}
        </div>
      </div>
    )
  }
}

Statement.defaultProps = {
  onRemoveStatement: () => {},
  onChangeStatement: () => {},
  canDelete: true,
  condition: {
    subject: '',
    verb: '',
    object: null,
  },
  isRtl: false,
  order: 'SVO',
  isFullWidth: false,
  row: 0,
}

Statement.propTypes = {
  /** Shows or hides the delete button */
  canDelete: PropTypes.bool,
  /** Current options for this Statement */
  condition: PropTypes.shape({
    subject: PropTypes.string,
    verb: PropTypes.string,
    object: PropTypes.any,
    error: PropTypes.string,
  }),
  /** Current selected options for this Statement */
  conditions: PropTypes.arrayOf(
    PropTypes.shape({
      subject: PropTypes.string,
      verb: PropTypes.string,
      object: PropTypes.any,
      error: PropTypes.string,
    })
  ),
  /** Possible choices and respective data types, verb options */
  choices: PropTypes.object.isRequired,
  /** Wether to show this component stretched to the width */
  isFullWidth: PropTypes.bool,
  /** Whether the order of elements and text if right to left */
  isRtl: PropTypes.bool,
  /** Statement change callback */
  onChangeStatement: PropTypes.func,
  /** Statement remove callback */
  onRemoveStatement: PropTypes.func,
  /** If there are multiple statements, in which row does this Statement belong to?  */
  row: PropTypes.number,
}

export default Statement
