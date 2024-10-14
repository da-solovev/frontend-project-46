import fortamStylish from './stylish.js';

const getFormatter = (format) => {
  if (format === 'stylish') {
    return fortamStylish;
  }
  if (format === 'plain') {
    return formatPlain;
  }
};

export const buildDiff = (diff, format = 'stylish') =>
  // const formater = getFormatter(format);
  `{\n${diff.map((key) => fortamStylish(key)).join('')}}`;
