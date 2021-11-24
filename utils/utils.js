import fs from 'fs';
import path from 'path';
import parseData from '../src/parsers.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const getFileData = (filePath) => {
  const buildPath = getFullPath(filePath);
  const fileFormat = buildPath.split('.').pop();
  const data = fs.readFileSync(buildPath);
  return parseData(data, fileFormat);
};

export default getFileData;
