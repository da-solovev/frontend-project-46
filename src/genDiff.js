import { getParseData } from './helpers/utils.js';
import buildDiff from './formatters/index.js';
import { calcDiff } from './calcDiff.js';

const genDiff = (filepath1, filepath2, format) => {
  const data1 = getParseData(filepath1);
  const data2 = getParseData(filepath2);
  const diff = calcDiff(data1, data2);
  return buildDiff(diff, format);
};
export default genDiff;
