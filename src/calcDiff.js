import _ from 'lodash';
import { isObject } from '../helpers/utils.js';

export const calcDiff = (object1, object2) => {
  const keys = _.sortBy(Object.keys({ ...object1, ...object2 }));
  return keys.map((key) => {
    if (!Object.hasOwn(object1, key)) {
      return {
        type: 'added',
        key,
        value: object2[key],
      };
    }
    if (!Object.hasOwn(object2, key)) {
      return {
        type: 'deleted',
        key,
        value: object1[key],
      };
    }
    if (isObject(object1[key]) && isObject(object2[key])) {
      return {
        type: 'node',
        key,
        children: calcDiff(object1[key], object2[key]),
      };
    }
    if (object1[key] !== object2[key]) {
      return {
        type: 'updated',
        key,
        value1: object1[key],
        value2: object2[key],
      };
    }
    return {
      type: 'default',
      key,
      value: object1[key],
    };
  });
};
export default calcDiff;
