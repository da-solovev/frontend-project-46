import yaml from 'js-yaml';
import path from 'path';

export const parseJSON = (str) => JSON.parse(str);

export const parseYaml = (str) => yaml.load(str);

export const getParser = (filepath) => {
  const fileExt = path.extname(filepath);
  if (fileExt === '.json') {
    return parseJSON(filepath);
  }
  if (['.yaml', '.yml'].includes(fileExt)) {
    return parseYaml(filepath);
  }
  throw new Error(`File extension ${fileExt} not supported`);
};
