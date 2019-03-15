class ValidationError extends Error {
  constructor(details) {
    super('ValidationError');
    this.details = details;
  }
}

module.exports = ValidationError;
