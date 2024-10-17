import { isObject } from '../helpers/utils.js';

const space = '    ';

const calcIndent = (depth) => space.repeat(depth);

const objectToString = (item, depth) => {
  if (!isObject(item)) {
    return `${item}`;
  }
  const children = Object.keys(item);
  const string = children.map((key) => `\n${calcIndent(depth + 1)}${key}: ${objectToString(item[key], depth + 1)}`).join('');
  return `{${string}\n${calcIndent(depth)}}`;
};

const iter = (item, depth = 1) => {
  const indent = calcIndent(depth).slice(0, -2);
  if (item.type === 'added') {
    return `${indent}+ ${item.key}: ${objectToString(item.value, depth)}\n`;
  }
  if (item.type === 'deleted') {
    return `${indent}- ${item.key}: ${objectToString(item.value, depth)}\n`;
  }
  if (item.type === 'updated') {
    return `${indent}- ${item.key}: ${objectToString(item.value1, depth)}\n${indent}+ ${item.key}: ${objectToString(item.value2, depth)}\n`;
  }
  if (item.type === 'default') {
    return `${indent}  ${item.key}: ${objectToString(item.value, depth)}\n`;
  }
  const begin = `${indent}  ${item.key}: {\n`;
  const node = item.children.map((key) => iter(key, depth + 1)).join('');
  const end = `${indent}  }\n`;
  return begin + node + end;
};

const fortamStylish = (diff) => {
  const result = `{\n${diff.map((key) => iter(key)).join('')}}`;
  return result;
};

export default fortamStylish;
