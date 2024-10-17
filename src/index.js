import getParseData from './parsers.js';
import calcDiff from './calcDiff.js';
import buildDiff from '../formatters/index.js';

const genDiff = (filepath1, filepath2, format) => {
  const object1 = getParseData(filepath1);
  const object2 = getParseData(filepath2);
  const diff = (calcDiff(object1, object2));
  return buildDiff(diff, format);
};
export default genDiff;
