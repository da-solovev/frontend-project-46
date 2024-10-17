import getParseData from './parsers.js';
import genDiff from './diff.js';
import buildDiff from '../formatters/index.js';

export default (filepath1, filepath2, format) => {
  const object1 = getParseData(filepath1);
  const object2 = getParseData(filepath2);
  const diff = (genDiff(object1, object2));
  return buildDiff(diff, format);
};
