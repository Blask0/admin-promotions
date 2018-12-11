import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dropdown, Input, MultiSelect } from 'vtex.styleguide'
import DatePicker from 'react-datepicker'

import debounce from 'lodash/debounce'
import moment from 'moment'

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

  static Object = props => (
    <div className={'mh3 mb3'}>
      {/* {props.choice.type === 'datetime' && (
        <label className="vtex-input w-100">
          <DatePicker
            customInput={
              <Input
                value={props.value}
                prefix={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.66667 7.2H4.11111V8.8H5.66667V7.2ZM8.77778 7.2H7.22222V8.8H8.77778V7.2ZM11.8889 7.2H10.3333V8.8H11.8889V7.2ZM13.4444 1.6H12.6667V0H11.1111V1.6H4.88889V0H3.33333V1.6H2.55556C1.69222 1.6 1.00778 2.32 1.00778 3.2L1 14.4C1 15.28 1.69222 16 2.55556 16H13.4444C14.3 16 15 15.28 15 14.4V3.2C15 2.32 14.3 1.6 13.4444 1.6ZM13.4444 14.4H2.55556V5.6H13.4444V14.4Z"
                      fill="#979899"
                    />
                  </svg>
                }
              />
            }
            selected={props.value ? moment(props.value) : null}
            showTimeSelect
            onChange={date => {
              props.onChange(date)
            }}
            locale={props.locale}
            dateFormat="L — LT"
            timeIntervals={15}
            timeFormat="HH:mm"
            readOnly
          />
        </label>
      )}

      {props.choice.type === 'selector' && (
        <Statement.Dropdown
          disabled={!props.condition.verb}
          options={props.choice.options}
          value={props.value}
          onChange={(e, value) => props.onChange(value)}
        />
      )}

      {props.choice.type === 'multiselect' && (
        <MultiSelect
          size="small"
          disabled={!props.condition.verb}
          options={props.choice.options}
          value={props.value}
          onChange={selected => props.onChange(selected)}
          selected={props.value ? props.value : []}
          emptyState={term => {
            return `Your search for "${term}" did not find any results.`
          }}
        />
      )}

      {props.choice.type === 'string' && (
        <Input
          disabled={!props.condition.verb}
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      )} */}

      {props.choice.type === 'custom' && props.widget}

      {!props.condition.subject && <Input disabled={!props.condition.verb} />}
    </div>
  )

  handleChangeStatement = (value, param, paramIndex) => {
    this.props.onChangeStatement(value, param, paramIndex)
  }

  handleRemoveStatement = () => {
    this.props.onRemoveStatement()
  }

  getChoiceBySubject = subjectValue => {
    console.log(subjectValue)
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
      this.handleChangeStatement(
        foundChoice.verbs[0].conjunction,
        'conjunction'
      )
    }

    if (foundChoice.options && foundChoice.options.length === 1) {
      this.handleChangeStatement([foundChoice.options[0].value], 'objects')
    }
  }

  handleDebouncedUpdateLayout = debounce(
    async () => {
      this.updateLayout()
    },
    150,
    { trailing: true }
  )

  render() {
    const {
      condition,
      choices,
      isRtl,
      locale,
      widget,
      queries,
      fullWidth,
    } = this.props
    const entities = []
    const order = isRtl ? 'OVS' : 'SVO'

    order.split('').map(entity => {
      if (entity === 'S') {
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
      }

      if (entity === 'V') {
        const verbAndConjunction = []

        verbAndConjunction.push(
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
                : this.getChoiceBySubject(condition.subject).verbs
            }
            onChange={verb => {
              this.handleChangeStatement(verb.value, 'verb')
              // this.handleChangeStatement(
              //   verb.conjunction ? verb.conjunction.value : undefined,
              //   'conjunction'
              // )

              // if (!condition.conjunction) {
              //   this.handleChangeStatement(
              //     Statement.defaultProps.objects,
              //     'objects',
              //     1
              //   )
              // }
            }}
          />
        )

        // if (condition.conjunction && !fullWidth) {
        //   verbAndConjunction.push(
        //     <div className={`dark-gray ${isRtl ? 'tl' : 'tr'} mt5 mh3`}>
        //       {
        //         this.getChoiceBySubject(condition.subject).verbs.find(
        //           verb => verb.value === condition.verb
        //         ).conjunction.label
        //       }
        //     </div>
        //   )
        // }

        entities.push(
          <div className="flex-column flex-auto">{verbAndConjunction}</div>
        )
      }

      if (entity === 'O') {
        const objects = this.getChoiceBySubject(condition.subject).objects

        console.log(`objects ${objects}`)
        let key = 0

        const ourObjects = objects.map(object => {
          console.log(object)

          return (
            <Statement.Object
              key={key++}
              widget={object}
              choice={this.getChoiceBySubject(condition.subject)}
              value={!condition.verb ? '' : object}
              condition={condition}
              fullWidth={fullWidth}
            />
          )
        })
        entities.push(<div className="flex-column flex-auto">{ourObjects}</div>)
      }
    })

    return (
      <div ref={this.statementRef}>
        <div className="flex-column w-100">
          <div
            className={`flex w-100 items-start mv3 ${
              fullWidth ? 'flex-column items-stretch' : ''
            }`}>
            {entities}

            {fullWidth ? (
              <Button
                variation="tertiary"
                size="small"
                onClick={() => this.handleRemoveStatement()}>
                REMOVE
              </Button>
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
