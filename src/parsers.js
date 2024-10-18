import yaml from 'js-yaml';

const parseJSON = (str) => JSON.parse(str);

const parseYaml = (str) => yaml.load(str);

const parse = (data, fileExt) => {
  if (fileExt === '.json') {
    return parseJSON(data);
  }
  if (['.yaml', '.yml'].includes(fileExt)) {
    return parseYaml(data);
  }
  throw new Error(`File extension '${fileExt}' not supported`);
};
export default parse;
