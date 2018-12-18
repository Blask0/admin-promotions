import React, { Component } from 'react'
import { MultiSelect } from 'vtex.styleguide'
class MultiSelectWrapper extends Component {
  constructor(props) {
    super(props)

    this.colors = [
      { label: 'White', value: 'white' },
      { label: 'Black', value: 'black' },
      { label: 'Grey', value: 'grey' },
      { label: 'Yellow', value: 'yellow' },
      { label: 'Red', value: 'red' },
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
      { label: 'Brown', value: 'brown' },
      { label: 'Pink', value: 'pink' },
      { label: 'Orange', value: 'orange' },
      { label: 'Purple', value: 'purple' },
      { label: 'Dark-blue', value: 'dark-blue' },
      { label: 'Dark-red', value: 'dark-red' },
      { label: 'Light-blue', value: 'light-blue' },
    ]
  }

  filter = term => {
    return this.colors.filter(tag =>
      tag.label.toLowerCase().includes(term.toLowerCase())
    )
  }

  render() {
    return (
      <MultiSelect
        emptyState={term => {
          return `Your search for "${term}" did not find any results. Did you mean: "<span className="fw5">pink</span>"?`
        }}
        onChange={selected =>
          this.props.onChange({ target: { value: selected } })
        }
        selected={this.props.value}
        filter={this.filter}
      />
    )
  }
}

export default MultiSelectWrapper
