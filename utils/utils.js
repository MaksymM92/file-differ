import fs from 'fs';
import parseData from '../src/parsers.js';

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

export default getFileData;
