import yaml from 'js-yaml';

const parseData = (file, format) => {
  let parsedData;
  switch (format) {
    case 'yml':
      parsedData = yaml.load(file);
      break;
    case 'yaml':
      parsedData = yaml.load(file);
      break;
    case 'json':
      parsedData = JSON.parse(file);
      break;
    default:
      break;
  }
  return parsedData;
};

export default parseData;
