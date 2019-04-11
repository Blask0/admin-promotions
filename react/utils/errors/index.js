export function getErrorsInfo(error) {
  return error
    ? error.graphQLErrors.map(error => ({
      operationId: error.operationId,
      reason: error.extensions.exception.reason,
    }))
    : []
}
