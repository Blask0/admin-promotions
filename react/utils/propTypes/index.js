import PropTypes from 'prop-types'

export const fieldShape = valueType =>
  PropTypes.shape({
    value: valueType,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    focus: PropTypes.bool,
  })
