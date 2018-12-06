import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Input } from 'vtex.styleguide'

import debounce from 'lodash/debounce'

class Statement extends React.Component {
  constructor(props) {
    super(props)

    this.statementRef = React.createRef()

    this.state = {
      errorMessage: '',
      fullWidth: false,
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

  static Dropdown = props => {
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
      {props.options.length === 1 && props.condition.subject ? (
        <span className="dark-gray mh3">{props.options[0].label}</span>
      ) : (
        <Statement.Dropdown
          disabled={!props.condition.subject}
          options={props.options}
          value={!props.condition.subject ? '' : props.condition.verb || ''}
          onChange={(e, value) => {
            const foundVerb = props.options.find(verb => verb.value === value)
            props.onChange(
              foundVerb.value,
              foundVerb.conjunction ? foundVerb.conjunction.value : undefined
            )
          }}
        />
      )}
    </div>
  )

  static Object = props => (
    <div className={'mh3 mb3'}>
      {props.condition.subject && props.choice.type === 'selector' ? (
        <Statement.Dropdown
          disabled={!props.condition.verb}
          options={props.choice.options}
          value={props.value}
          onChange={(e, value) => props.onChange(value)}
        />
      ) : (
        <Input
          disabled={!props.condition.verb}
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      )}
    </div>
  )

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
      return { subject: '', verbs: [], object: null }
    }

    return foundChoice
  }

  clearPredicate = () => {
    this.handleChangeStatement(Statement.defaultProps.verb, 'verb')
    this.handleChangeStatement(
      Statement.defaultProps.conjunction,
      'conjunction'
    )
    this.handleChangeStatement(Statement.defaultProps.object, 'object')
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
      this.handleChangeStatement(
        foundChoice.verbs[0].conjunction,
        'conjunction'
      )
    }

    if (foundChoice.options && foundChoice.options.length === 1) {
      this.handleChangeStatement(foundChoice.options[0].value, 'object')
    }
  }

  updateLayout = () => {
    if (this.statementRef.current.offsetWidth < this.props.breakpoint) {
      this.setState({ fullWidth: true })
      return
    }

    if (this.statementRef.current.offsetWidth >= this.props.breakpoint) {
      this.setState({ fullWidth: false })
      return
    }
  }

  handleDebouncedUpdateLayout = debounce(
    async () => {
      this.updateLayout()
    },
    150,
    { trailing: true }
  )

  componentDidMount() {
    window.addEventListener('resize', this.handleDebouncedUpdateLayout)
    this.updateLayout()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleDebouncedUpdateLayout)
  }

  render() {
    const { condition, choices, isRtl } = this.props
    const entities = []
    const order = isRtl ? 'OVS' : 'SVO'

    order.split('').map(entity => {
      if (entity === 'S') {
        entities.push(
          <Statement.Subject
            condition={condition}
            choices={choices}
            fullWidth={this.state.fullWidth}
            onChange={selectedSubjectValue => {
              this.handleChangeStatement(selectedSubjectValue, 'subject')
              this.clearPredicate()
              this.checkObviousPredicates(selectedSubjectValue)
            }}
          />
        )
      }

      if (entity === 'V') {
        const verbAndConjunction = []

        verbAndConjunction.push(
          <Statement.Verb
            condition={condition}
            choices={choices}
            fullWidth={this.state.fullWidth}
            options={
              !condition.subject
                ? [
                  {
                    value: '',
                    label: '',
                  },
                ]
                : this.getChoiceBySubject(condition.subject).verbs
            }
            onChange={(verb, conjunction) => {
              this.handleChangeStatement(verb, 'verb')
              this.handleChangeStatement(conjunction, 'conjunction')

              if (!condition.conjunction) {
                this.handleChangeStatement(null, 'object', 1)
              }
            }}
          />
        )

        if (condition.conjunction && !this.state.fullWidth) {
          verbAndConjunction.push(
            <div className={`dark-gray ${isRtl ? 'tl' : 'tr'} mt5 mh3`}>
              {
                this.getChoiceBySubject(condition.subject).verbs.find(
                  verb => verb.value === condition.verb
                ).conjunction.label
              }
            </div>
          )
        }

        entities.push(
          <div className="flex-column flex-auto">{verbAndConjunction}</div>
        )
      }

      if (entity === 'O') {
        const objects = []
        const firstObject = condition.object ? condition.object[0] : null
        const secondObject = condition.object ? condition.object[1] : null

        objects.push(
          <Statement.Object
            condition={condition}
            value={!condition.verb ? '' : firstObject}
            choice={this.getChoiceBySubject(condition.subject)}
            fullWidth={this.state.fullWidth}
            onChange={value => {
              this.handleChangeStatement(value, 'object', 0)
            }}
          />
        )

        if (condition.conjunction) {
          if (this.state.fullWidth) {
            objects.push(
              <div className="dark-gray tr mv3 mh3">
                {
                  this.getChoiceBySubject(condition.subject).verbs.find(
                    verb => verb.value === condition.verb
                  ).conjunction.label
                }
              </div>
            )
          }

          objects.push(
            <Statement.Object
              value={!condition.verb ? '' : secondObject}
              condition={condition}
              choice={this.getChoiceBySubject(condition.subject)}
              fullWidth={this.state.fullWidth}
              onChange={value => {
                this.handleChangeStatement(value, 'object', 1)
              }}
            />
          )
        }

        entities.push(<div className="flex-column flex-auto">{objects}</div>)
      }
    })

    return (
      <div ref={this.statementRef}>
        <div className="flex-column w-100">
          <div
            className={`flex w-100 items-start mv3 ${
              this.state.fullWidth ? 'flex-column items-stretch' : ''
            }`}>
            {entities}

            {!this.state.fullWidth && (
              <Statement.RemoveButton
                remove={() => {
                  this.handleRemoveStatement()
                }}
              />
            )}
          </div>
        </div>

        {/* <div>{`is full width: ${this.state.fullWidth}`}</div> */}
        {/* {this.state.errorMessage && (
          <div className="c-danger t-small mt2 lh-title">
            {this.state.errorMessage}
          </div>
        )} */}
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
    object: [],
  },
  breakpoint: 600,
  order: 'SVO',
  isRtl: false,
}

Statement.propTypes = {
  /** Current options for this Statement */
  condition: PropTypes.shape({
    subject: PropTypes.string,
    verb: PropTypes.string,
    conjunction: PropTypes.string,
    object: PropTypes.any,
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
}

export default Statement
