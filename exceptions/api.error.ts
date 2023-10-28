class ApiError extends Error {
  public status: number
  public errors: Error[]

  constructor(status: number, message: string, errors: Error[] = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static UnauthorizedError() {
    return new ApiError(401, 'User is not authorized')
  }

  static BadRequest(message: string, errors: Error[] = []) {
    return new ApiError(400, message, errors)
  }
}


export default ApiError
