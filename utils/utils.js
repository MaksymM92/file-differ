import fs from 'fs';
import _ from 'lodash';
import parseData from '../src/parsers.js';

const compare = (file1, file2) => {
  const keys = [];
  Object.keys(file1).forEach((key) => {
    keys.push(key);
  });
  Object.keys(file2).forEach((key) => {
    keys.push(key);
  });
  const uniqueKeys = [...new Set(keys)];
  const sortedKeys = _.sortBy(uniqueKeys);
  // eslint-disable-next-line array-callback-return,consistent-return
  const resultTree = sortedKeys.map((key) => {
    if (file1[key] && file2[key]) {
      if (file1[key] === file2[key]) {
        return { key, action: 'unchanged', value: file1[key] };
      }

      if (file1[key] !== file2[key]) {
        return {
          key, action: 'changed', value1: file1[key], value2: file2[key],
        };
      }
    }

    if (!(key in file1)) {
      return {
        key, action: 'added', value: file2[key],
      };
    }

    if (!(key in file2)) {
      return {
        key, action: 'deleted', value: file1[key],
      };
    }
  });
  return resultTree;
};

const getFileData = (filePath) => {
  let data;
  const fileFormat = filePath.split('.').pop();
  try {
    data = fs.readFileSync(filePath);
  } catch (err) {
    console.error(err);
  }
  return parseData(data, fileFormat);
};

const convertToString = (data) => {
  let outputString = '{\n';

  for (let i = 0; i < data.length; i += 1) {
    if (data[i].action === 'unchanged') {
      outputString += ` ${data[i].key}: ${data[i].value}\n`;
    }

    if (data[i].action === 'deleted') {
      outputString += `-${data[i].key}: ${data[i].value}\n`;
    }

    if (data[i].action === 'changed') {
      outputString += `-${data[i].key}: ${data[i].value2}\n+${data[i].key}: ${data[i].value1}\n`;
    }

    if (data[i].action === 'added') {
      outputString += `+${data[i].key}: ${data[i].value}\n`;
    }
  }
  return `${outputString}}`;
};

export {
  compare,
  convertToString,
  getFileData,
};
