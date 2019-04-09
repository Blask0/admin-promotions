export function getErrorReasons(error) {
  return error
    ? error.graphQLErrors.map(error => error.extensions.exception.reason)
    : []
}
