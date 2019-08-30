const Joi = require('joi');
const { pick } = require('lodash');

const thingValidations = require('../../src/validations/thing');
const { thing1 } = require('../fixtures/things');

describe('validations/thing', () => {
  describe('create', () => {
    const validThing = pick(thing1, ['name', 'category_id']);

    subject(() => Joi.validate(get('params'), thingValidations.create));

    const itIsInvalid = () => {
      it('is invalid', () => {
        expect(subject().error).toBeTruthy();
      });
    };

    const itIsValid = () => {
      it('is valid', () => {
        expect(subject().error).toBeNull();
      });
    };

    describe('when the thing is correct', () => {
      def('params', () => validThing);

      itIsValid();
    });

    describe('name', () => {
      describe('when it is not present', () => {
        def('params', () => ({ ...validThing, name: undefined }));

        itIsInvalid();
      });

      describe('when it is present', () => {
        describe('when it is not a string', () => {
          def('params', () => ({ ...validThing, name: 123 }));

          itIsInvalid();
        });

        describe('when it is a string', () => {
          describe('when its length is less than 3', () => {
            def('params', () => ({ ...validThing, name: 'aa' }));

            itIsInvalid();
          });

          describe('when its length is grater than or equal to 3', () => {
            def('params', () => ({ ...validThing, name: 'aaa' }));

            itIsValid();
          });
        });
      });
    });

    describe('category_id', () => {
      describe('when it is not present', () => {
        def('params', () => ({ ...validThing, category_id: undefined }));

        itIsInvalid();
      });

      describe('when it is present', () => {
        describe('when it is not a number', () => {
          def('params', () => ({ ...validThing, category_id: 'abc' }));

          itIsInvalid();
        });

        describe('when it is a number', () => {
          def('params', () => ({ ...validThing, category_id: 123 }));

          itIsValid();
        });

        describe('when it is a string that represents number', () => {
          def('params', () => ({ ...validThing, category_id: '123' }));

          itIsValid();
        });
      });
    });
  });
});
