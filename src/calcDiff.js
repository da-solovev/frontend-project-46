import _ from 'lodash';

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
    if (_.isPlainObject(object1[key]) && _.isPlainObject(object2[key])) {
      return {
        type: 'nested',
        key,
        children: calcDiff(object1[key], object2[key]),
      };
    }
    if (!_.isEqual(object1[key], object2[key])) {
      return {
        type: 'changed',
        key,
        value1: object1[key],
        value2: object2[key],
      };
    }
    return {
      type: 'unchanged',
      key,
      value: object1[key],
    };
  });
};
export default calcDiff;
