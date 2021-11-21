import fs from 'fs';
import path from 'path';
import parseData from '../src/parsers.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const getFileData = (filePath) => {
  let data;
  const buildPath = getFullPath(filePath);
  const fileFormat = buildPath.split('.').pop();
  try {
    data = fs.readFileSync(buildPath);
  } catch (err) {
    console.error(err);
  }
  return parseData(data, fileFormat);
};

export default getFileData;
