import * as Errors from './errors.js'
export default class ValidateHelper {
  static isString(str, param = {}) {
    if( param.length ) {
      if( str.length > param.length ) throw new Errors.StringValidationError('the length of string is too long');
    }
    return String(str);
  }

  static isNumber(num, param = {}) {
    if( (typeof param.defaultValue !== 'undefined') && (typeof num === 'undefined') ) {
      return param.defaultValue;
    }

    if( param.isInt ) {
      if( !(/(^-?\d+$)/g.test(String(num))) ) throw new Errors.WrongIntValidationError('the string is including characters');
    } else {
      if( !(/(^-?\d+(\.\d+)?$)/g.test(String(num))) ) throw new Errors.WrongNumberValidationError('the string is including characters');
    }

    if( typeof param.maxValue !== "undefined" ) {
      if( num > param.maxValue ) throw new Errors.WrongNumberValidationError('given number is over than maximum');
    }

    if( typeof param.minValue !== "undefined" ) {
      if( num < param.minValue ) throw new Errors.WrongNumberValidationError('given number is less than minimum');
    }

    return Number(num);
  }

  static isArray(arr, param = {}, innerMatcher = []) {
    if( param.defaultValue && (typeof arr === 'undefined') ) {
      return param.defaultValue;
    }

    if( !Array.isArray(arr) ) throw new Errors.WrongArrayValidationError();
    if( !Array.isArray(innerMatcher) ) innerMatcher = [innerMatcher];

    if( typeof param.length !== "undefined" ) {
      if( arr.length !== param.length ) throw new Errors.WrongArrayValidationError();
    }

    if( typeof param.max !== "undefined" ) {
      if( param.length > param.max ) throw new Errors.WrongArrayValidationError();
    }

    if( innerMatcher.length > 0 ) {
      for( let i=0; i<arr.length; i++ ) {
        let innerMatcherIndex = i % innerMatcher.length;
        switch(innerMatcher[innerMatcherIndex].type) {
          case "number":
            this.isNumber(arr[i], innerMatcher[innerMatcherIndex].param);
            break;
          case "string":
            this.isString(arr[i], innerMatcher[innerMatcherIndex].param);
            break;
          case "boolean":
            this.isBoolean(arr[i], innerMatcher[innerMatcherIndex].param);
            break;
        }
      }
    }
    return arr;
  }

  static isBoolean(val, param = {}) {
    if( !(/^(true|false)$/gi.test(String(val))) ) {
      if( typeof param.defaultValue !== 'undefined' ) {
        return param.defaultValue;
      } else {
        throw new Errors.WrongBooleanValidationError(/the given string includes invalid words/);
      }
    }
    return /^true$/gi.test(val);
  }
}
