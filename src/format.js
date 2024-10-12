const fortamStylish = (item, depth) => {
  const space = '    ';

  const displayStatus = ({ status }) => {
    switch (status) {
      case 'added':
        return '+';
      case 'deleted':
        return '-';
      default:
        return ' ';
    }
  };

  const prefix = `${space.repeat(depth).slice(0, -2)}${displayStatus(item)} `;

  if (item.type === 'leaf') {
    return `${prefix}${item.key}: ${item.value}\n`;
  }
  const start = `${prefix}${item.key}: {\n`;
  const { children } = item;
  const body = children.map((key) => fortamStylish(key, depth + 1)).join('');
  const end = `${space.repeat(depth)}}\n`;
  return start + body + end;
};

export const buildDiff = (diff, format = 'stylish') => {
  return '{\n' + diff.map((key) => fortamStylish(key, 1)).join('') + '}';
};