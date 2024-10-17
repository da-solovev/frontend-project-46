import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

const parseJSON = (str) => JSON.parse(str);

const parseYaml = (str) => yaml.load(str);

const parse = (filepath, data) => {
  const fileExt = path.extname(filepath);
  if (fileExt === '.json') {
    return parseJSON(data);
  }
  if (['.yaml', '.yml'].includes(fileExt)) {
    return parseYaml(data);
  }
  throw new Error(`File extension ${fileExt} not supported`);
};

const getParseData = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  const parseData = parse(filePath, data);
  return parseData;
};
export default getParseData;
