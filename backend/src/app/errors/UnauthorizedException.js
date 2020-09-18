export default class UnauthorizedException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
