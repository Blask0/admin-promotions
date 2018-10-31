import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Dropdown,
  IconCaretDown,
  IconPlus,
  Input,
} from 'vtex.styleguide'

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
    showOperator: true,
    conditions: [],
    suffix: '',
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
      addNewCondition: 'add new condition'
    },
  }

  handleOperatorChange = event => {
    const newOperator = event.target.value
    const { selectedOperator } = this.state
    if (selectedOperator !== newOperator) {
      this.props.onChangeOperator(newOperator)
      this.setState({ selectedOperator: newOperator })
    } 
  }

  handleAddNewCondition = () => {
    const { stateConditions } = this.state
    stateConditions.push({
      field: '',
      operator: '',
      suffix: '',
      value: null,
    })
    this.setState({ stateConditions })
  }

  handleRemoveCondition = (index) => {
    const { stateConditions } = this.state
    stateConditions.splice(index, 1)
    this.setState({ stateConditions })
  }

  changeCondition = (index, value, param) => {
    const { stateConditions } = this.state
    stateConditions[index][param] = value
    this.props.onChangeConditions(stateConditions)
    this.setState({ stateConditions })
  }


  getFieldByFieldLabel = (fieldLable) => {
    const { fields } = this.props
    const foundField = fields.find(field => field.fieldValue === fieldLable)
    // please treat 404
    return foundField
  }

  render() {
    const { labels, conditions, fields, showOperator } = this.props
    const { selectedOperator, stateConditions } = this.state

    return (
      <div>
        {
          showOperator &&
          <div className="flex flex-row nowrap">
            <span>{labels.headerPrefix}</span>
            <div className="c-link relative">
              <span className="mh3 b">
                {selectedOperator === 'all' ? labels.operatorAll : labels.operatorAny}
              </span>
              <select
                className="o-0 absolute top-0 left-0 w-100 bottom-0 pointer f6"
                onChange={this.handleOperatorChange}
                value={selectedOperator}
                style={{
                  // safari select height fix
                  WebkitAppearance: 'menulist-button',
                }}
              >
                <option value="all">
                  {labels.operatorAll}
                </option>
                <option value="any">
                  {labels.operatorAny}
                </option>
              </select>
              <IconCaretDown size={14} />
            </div>
            <span className="ml3">{labels.headerSufix}</span>
          </div>
        }
        
        {
          stateConditions.length === 0
          ? <div className="mv5">
              <span className="light-gray">{labels.noConditions}</span>
            </div>
          : <div className="mv5">
              {stateConditions.map((condition, index) => {
                return (
                  <div key={index} className="flex flex-column w-100 mv3">
                    <div className="flex flex-row w-100 items-center mv3">
                      <div className="w-30 mh3">
                        <Dropdown
                          options={fields.map(field => {
                            return {
                              value: field.fieldValue,
                              label: field.label,
                            }
                          })}
                          value={condition.field}
                          onChange={(e, value) => this.changeCondition(index, value, 'field')}
                        />
                      </div>
                      <div className="w-20 mh3">
                        <Dropdown
                          disabled={!condition.field}
                          options={!condition.field
                            ? [{
                              value: '',
                              label: '',
                            }]
                            : this.getFieldByFieldLabel(condition.field).operators
                          }
                          value={!condition.field ? '' : condition.operator || ''}
                          onChange={(e, value) => this.changeCondition(index, value, 'operator')}
                        />
                      </div>
                      <div className="w-30 mh3">
                        {
                          condition.field && this.getFieldByFieldLabel(condition.field).type === 'selector'
                          ? <Dropdown
                              disabled={!condition.operator}
                              options={this.getFieldByFieldLabel(condition.field).options}
                              value={!condition.operator ? '' : condition.value || ''}
                              onChange={(e, value) => this.changeCondition(index, value, 'value')}
                            />
                          : <Input
                            disabled={!condition.operator}
                            value={!condition.operator ? '' : condition.value}
                            onChange={e => this.changeCondition(index, e.target.value, 'value')}
                          />
                        }
                      </div>
                      {condition.suffix}
                      <div className="mh3 pointer" onClick={ e => this.handleRemoveCondition(index) }>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M11.7429 0.257143C11.4 -0.0857143 10.8857 -0.0857143 10.5429 0.257143L6 4.8L1.45714 0.257143C1.11429 -0.0857143 0.6 -0.0857143 0.257143 0.257143C-0.0857143 0.6 -0.0857143 1.11429 0.257143 1.45714L4.8 6L0.257143 10.5429C-0.0857143 10.8857 -0.0857143 11.4 0.257143 11.7429C0.428571 11.9143 0.6 12 0.857143 12C1.11429 12 1.28571 11.9143 1.45714 11.7429L6 7.2L10.5429 11.7429C10.7143 11.9143 10.9714 12 11.1429 12C11.3143 12 11.5714 11.9143 11.7429 11.7429C12.0857 11.4 12.0857 10.8857 11.7429 10.5429L7.2 6L11.7429 1.45714C12.0857 1.11429 12.0857 0.6 11.7429 0.257143Z" fill="#979899"/>
                        </svg>
                      </div>
                    </div>

                    <div>
                      {
                        index !== stateConditions.length - 1 &&
                        <div className="flex flex-row w-100 nowrap items-center mv3">
                          <span className="gray mh3">
                            {selectedOperator === 'all' ? labels.operatorAnd : labels.operatorOr}
                          </span>
                          <hr className="ma0 b--black-10 bb bb-0 w-80" />
                        </div>
                      }
                    </div>
                  </div>
                )
              })}
            </div>
          }
         <div style={{ marginLeft: -18 }}>
          <Button
              variation="tertiary"
              size="small"
              onClick={this.handleAddNewCondition}
            >
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
      suffix: PropTypes.string,
      field: PropTypes.string,
      operator: PropTypes.string,
      value: PropTypes.any,
    }),
  ),
  /** Conditions change callback (conditions): array of conditions */
  onChangeConditions: PropTypes.func,
  /** Fields and respective data types, operator options */
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      type: PropTypes.string,
      format: PropTypes.string,
      operators: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
        })
      ),
    }),
  ),
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