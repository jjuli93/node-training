const Joi = require('joi');

const thingValidation = require('../../src/validations/thing');
const { thing1 } = require('../fixtures/things');

describe('validations/thing', () => {
  const itIsInvalid = (params) => {
    it('is invalid', () => {
      expect(Joi.validate(params, thingValidation).error).toBeTruthy();
    });
  };

  const itIsValid = (params) => {
    it('is valid', () => {
      expect(Joi.validate(params, thingValidation).error).toBeNull();
    });
  };

  it('is valid when the thing is correct', () => {
    const result = Joi.validate({ ...thing1 }, thingValidation);
    expect(result.error).toBeNull();
  });

  describe('name', () => {
    describe('when it is not present', () => {
      itIsInvalid({ ...thing1, name: undefined });
    });

    describe('when it is present', () => {
      describe('when it is not a string', () => {
        itIsInvalid({ ...thing1, name: 123 });
      });

      describe('when it is a string', () => {
        describe('when its length is less than 3', () => {
          itIsInvalid({ ...thing1, name: 'aa' });
        });

        describe('when its length is grater than or equal to 3', () => {
          itIsValid({ ...thing1, name: 'aaa' });
        });
      });
    });
  });
});
