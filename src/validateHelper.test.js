import * as Errors from './errors.js'
import ValidateHelper from './validateHelper.js'

describe('#isString', () => {
  describe('parameter is not given', () => {
    test('return string', () => {
      expect(ValidateHelper.isString('hoge')).toEqual('hoge');
    });
  });

  describe('maximum length is given', () => {
    test('return string if length is less than maximum length', () => {
      expect(ValidateHelper.isString('hogef', {length: 5})).toEqual('hogef');
    });

    test('raise error if length is over than maximum length', () => {
      expect(() => ValidateHelper.isString('hogefu', {length: 5})).toThrow(/too long/);
    });
  });
});

describe('#isNumber', () => {
  describe('optional parameter is not given', () => {
    describe('when number is given', () => {
      test('return number', () => {
        expect(ValidateHelper.isNumber(1234)).toEqual(1234);
      });

      test('return number when type of string', () => {
        expect(ValidateHelper.isNumber('1234')).toEqual(1234);
      });

      test('return number when the given number is less than zero', () => {
        expect(ValidateHelper.isNumber('-1234')).toEqual(-1234);
      });

      test('return number when the given number includes a decimal point', () => {
        expect(ValidateHelper.isNumber('12.34')).toEqual(12.34);
      });
    });

    describe('when the string includes characters', () => {
      test('throw error', () => {
        expect(() => ValidateHelper.isNumber('123hoge')).toThrow(/including characters/);
      });
    });
  });

  describe('allow only integer', () => {
    test('throw error when given number includes a decimal point', () => {
      expect(() => ValidateHelper.isNumber('123.45', {isInt: true})).toThrow(/including characters/);
    });

    test('return number', () => {
      expect(ValidateHelper.isNumber(1234)).toEqual(1234);
    });
  });

  describe('maximum value is given', () => {
    test('throw error when given number is over than maximum value', () => {
      expect(() => ValidateHelper.isNumber('12', {maxValue: 10})).toThrow(/maximum/);
    });

    test('return number', () => {
      expect(ValidateHelper.isNumber(1, {maxValue: 2})).toEqual(1);
    });
  });

  describe('minimum value is given', () => {
    test('throw error when given number is over than maximum value', () => {
      expect(() => ValidateHelper.isNumber('0', {minValue: 1})).toThrow(/minimum/);
    });

    test('return number', () => {
      expect(ValidateHelper.isNumber(10, {minValue: 1})).toEqual(10);
    });
  });
});

describe('#isArray', () => {

});

describe('#isBoolean', () => {
  test('return true when given "true"', () => {
    expect(ValidateHelper.isBoolean('true')).toEqual(true);
    expect(ValidateHelper.isBoolean('True')).toEqual(true);
    expect(ValidateHelper.isBoolean(true)).toEqual(true);
  });

  test('return false when given "false"', () => {
    expect(ValidateHelper.isBoolean('false')).toEqual(false);
    expect(ValidateHelper.isBoolean('False')).toEqual(false);
    expect(ValidateHelper.isBoolean(false)).toEqual(false);
  });

  test('throw error when given invalid string', () => {
    expect(() => ValidateHelper.isBoolean('hoge')).toThrow(/invalid/);
  });

  describe('default value is given', () => {
    test('return default value when given invalid string', () => {
      expect(ValidateHelper.isBoolean('hoge', {defaultValue: true})).toEqual(true);
      expect(ValidateHelper.isBoolean('hoge', {defaultValue: false})).toEqual(false);
    });
  });
});
