import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dropdown, Input, IconClose } from 'vtex.styleguide'

class Statement extends React.Component {
  constructor(props) {
    super(props)

    this.statementRef = React.createRef()

    this.state = {
      errorMessage: '',
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
    if (!props.options) {
      return <Dropdown {...props} style={{ minWidth: '250px' }} />
    }
    return props.options.length === 1 && props.options[0].value ? (
      <span className="dark-gray mh3">{props.options[0].label}</span>
    ) : (
      <Dropdown {...props} style={{ minWidth: '250px' }} />
    )
  }

  static Subject = props => (
    <div className="flex-auto">
      <div className={`mh3 ${props.isFullWidth ? 'pb3' : ''}`}>
        <Statement.Dropdown
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
    </div>
  )

  static Verb = props => (
    <div className={`mh3 ${props.isFullWidth ? 'pb3' : ''}`}>
      {props.verbs.length === 1 && props.condition.subject ? (
        <span className="dark-gray mh3">{props.verbs[0].label}</span>
      ) : (
        <Statement.Dropdown
          disabled={!props.condition.subject}
          options={props.verbs}
          value={!props.condition.subject ? '' : props.condition.verb || ''}
          onChange={(e, value) => {
            const foundVerb = props.verbs.find(verb => verb.value === value)
            props.onChange(foundVerb)
          }}
        />
      )}
    </div>
  )

  handleChangeStatement = (newValue, structure, objectIndex) => {
    this.props.onChangeStatement(newValue, structure, objectIndex)
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
      return { subject: '', verbs: [], objects: [] }
    }

    return foundChoice
  }

  clearPredicate = () => {
    this.handleChangeStatement(Statement.defaultProps.verb, 'verb')
    this.handleChangeStatement(Statement.defaultProps.objects, 'objects')
    this.handleChangeStatement(null, 'errorMessage')
  }

  clearObjects = () => {
    this.handleChangeStatement(Statement.defaultProps.objects, 'objects')
    this.handleChangeStatement(null, 'errorMessage')
  }

  checkObviousPredicates = subjectValue => {
    const { choices } = this.props
    const foundChoice = choices.find(
      choice => choice.subject.value === subjectValue
    )

    if (!foundChoice) {
      return
    }

    if (foundChoice.verbs && foundChoice.verbs.length === 1) {
      this.handleChangeStatement(foundChoice.verbs[0].value, 'verb')
    }

    if (foundChoice.options && foundChoice.options.length === 1) {
      this.handleChangeStatement([foundChoice.options[0].value], 'objects')
    }
  }

  getObjectValue = index => {
    const { condition } = this.props

    if (condition.objects === undefined) {
      return
    }

    if (condition.objects.length < index + 1) {
      return
    }

    console.log('&&&&&&&&&&&&&')
    console.dir(condition.objects)
    console.log('&&&&&&&&&&&&&')
    return condition.objects[index]
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
          this.checkObviousPredicates(selectedSubjectValue)
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
    const { condition, isRtl } = this.props
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

    const selectedObjectId = currentVerb.objectId
      ? currentVerb.objectId
      : 'default'

    let objects = myChoice.objects[selectedObjectId]
    if (objects.length === 0) {
      entities.push(<Statement.EmptyObject />)
      return entities
    }

    if (isRtl) {
      objects = objects.reverse()
    }

    objects.map((Component, objectIndex) => {
      return entities.push(
        <div
          key={`custom-component-${row}-${objectIndex}`}
          className="flex-auto flex-grow-1 mh3 mb3"
          style={{ minWidth: '150px' }}>
          {React.cloneElement(Component, {
            row,
            value: this.getObjectValue(objectIndex),
            onChange: (e, value) =>
              this.handleChangeStatement(
                e.target.value,
                'objects',
                objectIndex
              ),
          })}
        </div>
      )

      // return entities.push(
      //   <Statement.Object
      //     widget={object}
      //     choice={myChoice}
      //     value={!condition.verb ? '' : object}
      //     condition={condition}
      //     isFullWidth={isFullWidth}
      //   />
      // )
    })

    return entities
  }

  withRow = (WrappedComponent, data) => {
    return class Object extends React.Component {
      render() {
        return <WrappedComponent row={data.row} {...this.props} />
      }
    }
  }

  render() {
    const { canDelete, isRtl, isFullWidth, isDebug, row } = this.props
    const order = isRtl ? 'OVS' : 'SVO'
    let statementAtoms = []

    console.log(`--------- ${this.props.condition}`)
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
          {this.props.condition.errorMessage && (
            <div className="red f6 mh3 lh-title">
              {this.props.condition.errorMessage}
            </div>
          )}
        </div>

        {isDebug && (
          <code>{`${JSON.stringify(this.props.condition, null, 2)}`}</code>
        )}
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
    objects: [],
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
    objects: PropTypes.arrayOf(PropTypes.any),
    errorMessage: PropTypes.string,
  }),
  /** Possible choices and respective data types, verb options */
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      subject: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
      verbs: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
        })
      ),
      objects: PropTypes.shape(PropTypes.arrayOf(PropTypes.any)),
    })
  ),
  /** isDebug shows the current state of the component in a box */
  isDebug: PropTypes.bool,
  /** Wether to show this component stretched to the width */
  isFullWidth: PropTypes.bool,
  /** Whether the order of elements and text if right to left */
  isRtl: PropTypes.bool,
  /** Statement change callback */
  onChangeStatement: PropTypes.func,
  /** Statement remove callback */
  onRemoveStatement: PropTypes.func,
  /** Widgets are custom inputs that can be used instead of the default ones */
  widget: PropTypes.any,
  /** If there are multiple statements, in which row does this Statement belong to?  */
  row: PropTypes.number,
}

export default Statement
