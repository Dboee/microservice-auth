import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  // sets status code to bad request, email already in use
  statusCode = 400;

  constructor(public message: string) {
    super(message);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    console.log(this.message);
    return [{ message: this.message }];
  }
}
