import _ from 'lodash';

const space = '    ';

const calcIndent = (depth) => space.repeat(depth);

const stringify = (item, depth) => {
  if (!_.isPlainObject(item)) {
    return `${item}`;
  }
  const children = Object.keys(item);
  const string = children.map((key) => `\n${calcIndent(depth + 1)}${key}: ${stringify(item[key], depth + 1)}`).join('');
  return `{${string}\n${calcIndent(depth)}}`;
};

const iter = (item, depth = 1) => {
  const indent = calcIndent(depth).slice(0, -2);
  if (item.type === 'added') {
    return `${indent}+ ${item.key}: ${stringify(item.value, depth)}`;
  }
  if (item.type === 'deleted') {
    return `${indent}- ${item.key}: ${stringify(item.value, depth)}`;
  }
  if (item.type === 'changed') {
    return `${indent}- ${item.key}: ${stringify(item.value1, depth)}\n${indent}+ ${item.key}: ${stringify(item.value2, depth)}`;
  }
  if (item.type === 'unchanged') {
    return `${indent}  ${item.key}: ${stringify(item.value, depth)}`;
  }
  const begin = `${indent}  ${item.key}: {`;
  const node = `\n${item.children.map((key) => iter(key, depth + 1)).join('\n')}\n`;
  const end = `${indent}  }`;
  return begin + node + end;
};

const fortamStylish = (diff) => {
  const result = `{\n${diff.map((key) => iter(key)).join('\n')}\n}`;
  return result;
};

export default fortamStylish;
