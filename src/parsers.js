import yaml from 'js-yaml';

// eslint-disable-next-line consistent-return
const parseData = (data, format) => {
  switch (format) {
    case 'yml':
      return yaml.load(data);
    case 'yaml':
      return yaml.load(data);
    case 'json':
      return JSON.parse(data);
    default:
      break;
  }
};

export default parseData;
