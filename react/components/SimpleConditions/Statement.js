import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Dropdown,
  Input,
  MultiSelect,
  IconClose,
} from 'vtex.styleguide'

import debounce from 'lodash/debounce'

class Statement extends React.Component {
  constructor(props) {
    super(props)

    this.statementRef = React.createRef()

    this.state = {
      errorMessage: '',
    }
  }

  static RemoveButton = props => (
    <div className="mh3 mv3 pointer flex-auto" onClick={e => props.remove()}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M11.7429 0.257143C11.4 -0.0857143 10.8857 -0.0857143 10.5429 0.257143L6 4.8L1.45714 0.257143C1.11429 -0.0857143 0.6 -0.0857143 0.257143 0.257143C-0.0857143 0.6 -0.0857143 1.11429 0.257143 1.45714L4.8 6L0.257143 10.5429C-0.0857143 10.8857 -0.0857143 11.4 0.257143 11.7429C0.428571 11.9143 0.6 12 0.857143 12C1.11429 12 1.28571 11.9143 1.45714 11.7429L6 7.2L10.5429 11.7429C10.7143 11.9143 10.9714 12 11.1429 12C11.3143 12 11.5714 11.9143 11.7429 11.7429C12.0857 11.4 12.0857 10.8857 11.7429 10.5429L7.2 6L11.7429 1.45714C12.0857 1.11429 12.0857 0.6 11.7429 0.257143Z"
          fill="#979899"
        />
      </svg>
    </div>
  )

  static EmptyObject = () => {
    <div className="flex-auto">
      <div className="mh3 mb3">
        <Input key={'object-0'} disabled />
      </div>
    </div>
  }

  static Dropdown = props => {
    if (!props.options) {
      return <Dropdown {...props} />
    }
    return props.options.length === 1 && props.options[0].value ? (
      <span className="dark-gray mh3">{props.options[0].label}</span>
    ) : (
      <Dropdown {...props} />
    )
  }

  static Subject = props => (
    <div className="flex-column flex-auto">
      <div className={`mh3 ${props.fullWidth ? 'pb3' : ''}`}>
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
    <div className={`mh3 ${props.fullWidth ? 'pb3' : ''}`}>
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

  static Object = props => <div className={'mh3 mb3'}>{props.widget}</div>

  handleChangeStatement = (value, param, paramIndex) => {
    this.props.onChangeStatement(value, param, paramIndex)
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
    this.handleChangeStatement(
      Statement.defaultProps.conjunction,
      'conjunction'
    )
    this.handleChangeStatement(Statement.defaultProps.objects, 'objects')
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
      // this.handleChangeStatement(
      //   foundChoice.verbs[0].conjunction,
      //   'conjunction'
      // )
    }

    if (foundChoice.options && foundChoice.options.length === 1) {
      this.handleChangeStatement([foundChoice.options[0].value], 'objects')
    }
  }

  renderSubject = (props, entities) => {
    const { condition, choices, locale, fullWidth } = this.props

    entities.push(
      <Statement.Subject
        locale={locale}
        condition={condition}
        choices={choices}
        fullWidth={fullWidth}
        onChange={selectedSubjectValue => {
          this.handleChangeStatement(selectedSubjectValue, 'subject')
          this.clearPredicate()
          this.checkObviousPredicates(selectedSubjectValue)
        }}
      />
    )

    return entities
  }

  renderSubject = entities => {
    const { condition, choices, locale, fullWidth } = this.props

    entities.push(
      <Statement.Subject
        locale={locale}
        condition={condition}
        choices={choices}
        fullWidth={fullWidth}
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
    const { condition, choices, locale, fullWidth } = this.props
    const myChoice = this.getChoiceBySubject(condition.subject)
    const desiredVerbs = []

    desiredVerbs.push(
      <Statement.Verb
        locale={locale}
        condition={condition}
        choices={choices}
        fullWidth={fullWidth}
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
        }}
      />
    )

    entities.push(<div className="flex-column flex-auto">{desiredVerbs}</div>)

    return entities
  }

  renderObjects = entities => {
    const { condition, fullWidth, isRtl } = this.props
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

    let key = 0
    const objectsFromChoice = objects.map(object => {
      return (
        <div key={`object-${key++}`}>
          <Statement.Object
            widget={object}
            choice={myChoice}
            value={!condition.verb ? '' : object}
            condition={condition}
            fullWidth={fullWidth}
          />
        </div>
      )
    })

    entities.push(
      <div className="flex-column flex-auto">{objectsFromChoice}</div>
    )

    return entities
  }

  render() {
    const { isRtl, fullWidth } = this.props
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
        statementAtoms = this.renderObjects(statementAtoms)
      }
    })

    return (
      <div ref={this.statementRef}>
        <div className="flex-column w-100">
          <div
            className={`flex w-100 items-start mv3 ${
              fullWidth ? 'flex-column items-stretch' : ''
            }`}>
            {statementAtoms}
            {fullWidth ? (
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
            ) : (
              <Statement.RemoveButton
                remove={() => {
                  this.handleRemoveStatement()
                }}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}

Statement.defaultProps = {
  onRemoveStatement: () => {},
  onChangeStatement: () => {},
  condition: {
    subject: '',
    verb: '',
    conjunction: '',
    objects: [],
  },
  breakpoint: 600,
  order: 'SVO',
  isRtl: false,
  locale: 'en-US',
  fullWidth: false,
}

Statement.propTypes = {
  /** Current options for this Statement */
  condition: PropTypes.shape({
    subject: PropTypes.string,
    verb: PropTypes.string,
    conjunction: PropTypes.string,
    objects: PropTypes.arrayOf(PropTypes.any),
  }),
  /** Possible choices and respective data types, verb options */
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      subject: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
      type: PropTypes.string,
      format: PropTypes.string,
      verbs: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
        })
      ),
      objects: PropTypes.shape(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
        })
      ),
    })
  ),
  /** Whether the order of elements and text if right to left */
  isRtl: PropTypes.bool,
  /** Statement change callback */
  onChangeStatement: PropTypes.func,
  /** Statement remove callback */
  onRemoveStatement: PropTypes.func,
  /** Width that will trigger full width form */
  breakpoint: PropTypes.number,
  /** Locale */
  locale: PropTypes.string,
  /** Widgets are custom inputs that can be used instead of the default ones */
  widget: PropTypes.any,
  /** Wether to show this component stretched to the width */
  fullWidth: PropTypes.bool,
}

export default Statement
