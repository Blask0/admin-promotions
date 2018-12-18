import React from 'react'
import PropTypes from 'prop-types'
import { Button, IconPlus } from 'vtex.styleguide'
import StrategySelector from './StrategySelector'
import Statement from './Statement'

class SimpleConditions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedOperator: props.operator,
    }
  }

  static defaultProps = {
    operator: 'any',
    showOperator: true,
    conditions: [],
    onChangeOperator: () => {},
    onChangeConditions: () => {},
    labels: {
      operatorAll: 'all',
      operatorAnd: 'and',
      operatorAny: 'any',
      operatorOr: 'or',
      headerPrefix: 'Matching',
      headerSufix: 'following conditions:',
      addConditionBtn: 'add condition',
      noConditions: 'No conditions selected.',
      addNewCondition: 'add new condition',
    },
  }

  static Separator = props => (
    <div>
      <div
        style={{
          marginLeft: -17,
          width: 'calc(100% + 34px)',
        }}
        className="flex flex-row w-100 nowrap items-center mv3">
        <hr className="ma0 b--black-10 bb bb-0 w-100" />
      </div>
      <div className="w-100 tc" style={{ marginTop: -18 }}>
        <span className="gray ph3 dib bg-white">{props.label}</span>
      </div>
    </div>
  )

  handleOperatorChange = event => {
    const newOperator = event.target.value
    const { selectedOperator } = this.state
    if (selectedOperator !== newOperator) {
      this.props.onChangeOperator(newOperator)
      this.setState({ selectedOperator: newOperator })
    }
  }

  canAddNewCondition = () => {
    const { conditions } = this.props
    if (conditions.length === 0) return true

    const hasIncompleteCondition = conditions.some(
      condition =>
        condition.subject.value === '' ||
        condition.operator === '' ||
        (condition.objects && condition.objects.length === 0)
    )
    return !hasIncompleteCondition
  }

  handleAddNewCondition = () => {
    const currentConditions = this.props.conditions

    currentConditions.push({
      subject: '',
      verb: '',
      objects: [],
    })
    this.props.onChangeConditions(currentConditions)
  }

  handleRemoveStatement = index => {
    const currentConditions = this.props.conditions
    currentConditions.splice(index, 1)

    this.props.onChangeConditions(currentConditions)
  }

  handleChangeStatement = (
    statementIndex,
    newValue,
    structure,
    objectIndex
  ) => {
    this.props.onChangeStatement(
      statementIndex,
      newValue,
      structure,
      objectIndex
    )
  }

  render() {
    const {
      labels,
      choices,
      showOperator,
      operator,
      isDebug,
      conditions,
    } = this.props
    const { selectedOperator } = this.state

    return (
      <div>
        {showOperator && (
          <div className="mh6">
            <StrategySelector
              operator={operator}
              labels={labels}
              onChangeOperator={operator => this.onChangeOperator({ operator })}
            />
          </div>
        )}

        <div className="t-body c-on-base ph5 mt4 br3 b--muted-4 ba">
          {this.props.conditions.length === 0 ? (
            <div className="mv6 mh3">
              <span className="light-gray">{labels.noConditions}</span>
            </div>
          ) : (
            <div className="mv5">
              {conditions.map((condition, statementIndex) => {
                return (
                  <div
                    className="flex flex-column w-100 mv3"
                    key={statementIndex}>
                    <Statement
                      isDebug={isDebug}
                      condition={condition}
                      choices={choices}
                      row={statementIndex}
                      onChangeStatement={(newValue, structure, objectIndex) => {
                        this.handleChangeStatement(
                          statementIndex,
                          newValue,
                          structure,
                          objectIndex
                        )
                      }}
                      onRemoveStatement={() =>
                        this.handleRemoveStatement(statementIndex)
                      }
                    />

                    {statementIndex !== conditions.length - 1 && (
                      <SimpleConditions.Separator
                        label={
                          selectedOperator === 'all'
                            ? labels.operatorAnd
                            : labels.operatorOr
                        }
                      />
                    )}
                  </div>
                )
              })}
            </div>
          )}

          <div
            style={{
              marginLeft: -17,
              width: 'calc(100% + 34px)',
            }}
            className="flex flex-row w-100 nowrap items-center mv3">
            <hr className="ma0 b--black-10 bb bb-0 w-100" />
          </div>

          <div style={{ marginLeft: -10 }} className="mv5">
            <Button
              variation="tertiary"
              size="small"
              disabled={!this.canAddNewCondition()}
              onClick={this.handleAddNewCondition}>
              <span className="flex align-baseline">
                <span className="mr2">
                  <IconPlus solid size={16} color="currentColor" />
                </span>
                {labels.addNewCondition}
              </span>
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

SimpleConditions.propTypes = {
  /** Shows or hides the delete button */
  canDelete: PropTypes.bool,
  /** Operator indicates whether all the conditions should be met or any of them */
  operator: PropTypes.oneOf(['all', 'any']),
  /** Current selected options for this Statement */
  conditions: PropTypes.arrayOf(
    PropTypes.shape({
      subject: PropTypes.string,
      verb: PropTypes.string,
      objects: PropTypes.arrayOf(PropTypes.any),
      errorMessage: PropTypes.string,
    })
  ),
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
  /** Conditions change callback (conditions): array of conditions */
  onChangeConditions: PropTypes.func,
  /** Statement change callback */
  onChangeStatement: PropTypes.func,
  /** Operator change callback (conditions): array of conditions */
  onChangeOperator: PropTypes.func,
  /** isDebug shows the current state of the component in a box */
  isDebug: PropTypes.bool,
  /** Whether the order of elements and text if right to left */
  isRtl: PropTypes.bool,
  /** Show or hide the header that selects the operator (any vs all) */
  showOperator: PropTypes.bool,
  /** Labels for the controls and texts, default is english */
  labels: PropTypes.shape({
    operatorAll: PropTypes.string,
    operatorAnd: PropTypes.string,
    operatorAny: PropTypes.string,
    operatorOr: PropTypes.string,
    headerPrefix: PropTypes.string,
    headerSufix: PropTypes.string,
    addConditionBtn: PropTypes.string,
    noConditions: PropTypes.string,
    addNewCondition: PropTypes.string,
  }),
}

export default SimpleConditions
