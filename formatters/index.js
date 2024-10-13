import fortamStylish from './stylish.js';

const getFormatter = (format) => {
  if (format === 'stylish') {
    return fortamStylish;
  }
};

export const buildDiff = (diff, format = 'stylish') => {
  const formater = getFormatter(format);
  return `{\n${diff.map((key) => formater(key)).join('')}}`;
};
