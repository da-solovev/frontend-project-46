import { isObject } from '../helpers/utils.js';

const formatValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const formatPlain = (diff) => {
  const iter = (item, property = []) => {
    const keys = [...property, item.key];
    const pathProperty = keys.join('.');
    if (item.type === 'added') {
      return `Property '${pathProperty}' was added with value: ${formatValue(item.value)}\n`;
    }
    if (item.type === 'deleted') {
      return `Property '${pathProperty}' was removed\n`;
    }
    if (item.type === 'updated') {
      return `Property '${pathProperty}' was updated. From ${formatValue(item.value1)} to ${formatValue(item.value2)}\n`;
    }
    if (item.type === 'default') {
      return '';
    }
    return item.children.map((key) => iter(key, [pathProperty])).join('');
  };
  const result = diff.map((key) => iter(key)).join('').trim();
  return result;
};
export default formatPlain;
