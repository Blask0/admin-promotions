import PropTypes from 'prop-types'

export const fieldShape = PropTypes.shape({
  value: PropTypes.any,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  focus: PropTypes.bool,
})
