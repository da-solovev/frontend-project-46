import fortamStylish from './stylish.js';
import formatPlain from './plain.js';

const getFormatter = (nameFormat) => {
  if (nameFormat === 'stylish') {
    return fortamStylish;
  }
  if (nameFormat === 'plain') {
    return formatPlain;
  }
  throw new Error('Unknown format');
};

const buildDiff = (diff, format = 'stylish') => {
  const formatter = getFormatter(format);
  return formatter(diff);
};
export default buildDiff;
