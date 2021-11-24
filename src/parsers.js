import yaml from 'js-yaml';

const parseData = (data, format) => {
  let parsedData;
  switch (format) {
    case 'yml':
      parsedData = yaml.load(data);
      break;
    case 'yaml':
      parsedData = yaml.load(data);
      break;
    case 'json':
      parsedData = JSON.parse(data);
      break;
    default:
      break;
  }
  return parsedData;
};

export default parseData;
