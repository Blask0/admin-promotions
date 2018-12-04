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
      stateConditions: props.conditions || [],
    }
  }

  static defaultProps = {
    operator: 'any',
    showStrategySelector: true,
    conditions: [],
    onChangeOperator: () => {},
    onChangeConditions: () => {},
    labels: {
      operatorAll: 'all',
      operatorAnd: 'and',
      operatorAny: 'any',
      operatorOr: 'or',
      headerPrefix: 'Match',
      headerSufix: 'following conditions:',
      addConditionBtn: 'add condition',
      noConditions: 'No conditions selected.',
      addNewCondition: 'add new condition',
    },
  }

  static Separator = props => {
    <div className="flex flex-row w-100 nowrap items-center mv3">
      <span className="gray mh3">{props.label}</span>
      <hr className="ma0 b--black-10 bb bb-0 w-80" />
    </div>
  }

  handleOperatorChange = event => {
    const newOperator = event.target.value
    const { selectedOperator } = this.state
    if (selectedOperator !== newOperator) {
      this.props.onChangeOperator(newOperator)
      this.setState({ selectedOperator: newOperator })
    }
  }

  canAddNewCondition = () => {
    const { stateConditions } = this.state
    if (stateConditions.length === 0) return true

    const hasIncompleteCondition = stateConditions.some(
      condition =>
        condition.subject.value === '' ||
        condition.operator === '' ||
        condition.value === null
    )
    return !hasIncompleteCondition
  }

  handleAddNewCondition = () => {
    const { stateConditions } = this.state
    stateConditions.push({
      subject: '',
      operator: '',
      value: null,
    })
    this.setState({ stateConditions })
  }

  handleRemoveStatement = index => {
    const { stateConditions } = this.state
    stateConditions.splice(index, 1)
    this.setState({ stateConditions })
  }

  handleChangeStatement = (index, value, param) => {
    const { stateConditions } = this.state
    stateConditions[index][param] = value
    this.props.onChangeConditions(stateConditions)
    this.setState({ stateConditions })
  }

  render() {
    const { labels, choices, showStrategySelector, operator } = this.props
    const { selectedOperator, stateConditions } = this.state

    return (
      <div>
        {showStrategySelector && (
          <StrategySelector
            operator={operator}
            labels={labels}
            onChangeOperator={operator => this.onChangeOperator({ operator })}
          />
        )}

        {stateConditions.length === 0 ? (
          <div className="mv5">
            <span className="light-gray">{labels.noConditions}</span>
          </div>
        ) : (
          <div className="mv5">
            {stateConditions.map((condition, index) => {
              return (
                <div className="flex flex-column w-100 mv3" key={index}>
                  <Statement
                    condition={condition}
                    choices={choices}
                    onChangeStatement={(value, param) => {
                      this.handleChangeStatement(index, value, param)
                    }}
                    onRemoveStatement={() => this.handleRemoveStatement(index)}
                  />

                  {index !== stateConditions.length - 1 && (
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

        <div style={{ marginLeft: -18 }}>
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
    )
  }
}

SimpleConditions.propTypes = {
  /** Operator indicates whether all the conditions should be met or any of them */
  operator: PropTypes.oneOf(['all', 'any']),
  showOperator: PropTypes.bool,
  /** Operator change callback (conditions): array of conditions */
  onChangeOperator: PropTypes.func,
  /** Conditions list */
  conditions: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      operator: PropTypes.string,
      value: PropTypes.any,
    })
  ),
  /** Conditions change callback (conditions): array of conditions */
  onChangeConditions: PropTypes.func,
  /** Fields and respective data types, operator options */
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
  /** Show or hide the header that selects the strategy (any vs all) */
  showStrategySelector: PropTypes.bool,
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
