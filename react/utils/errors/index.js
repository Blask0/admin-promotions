export function getErrorsInfo(error) {
  return error
    ? error.graphQLErrors.map(error => ({
      operationId: error.operationId,
      reason: error.extensions.exception.reason,
      httpStatusCode:
          error.extensions.exception.details &&
          error.extensions.exception.details.response.status,
    }))
    : []
}

export function cannotAccess(error) {
  return error && (error.httpStatusCode === 401 || error.httpStatusCode === 403)
}
