import { ApolloError } from 'apollo-server-errors'

export class HttpError extends ApolloError {
  constructor(message: string, error: any) {
    super(message, 'HTTP_ERROR', { 
      error: {
        message: error.message,
        response: error.response
      }
    });
    Object.defineProperty(this, 'name', { value: 'HttpError' });
  }
}