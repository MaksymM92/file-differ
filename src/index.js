import getFileData from '../utils/utils.js';
import buildTree from './buildTree.js';
import selectFormat from './formatters/index.js';

const showDiff = (file1, file2, format = 'stylish') => {
  const firstFileData = getFileData(file1);
  const secondFileData = getFileData(file2);
  const comparisonResult = {
    type: 'root',
    children: buildTree(firstFileData, secondFileData),
  };
  const programOutput = selectFormat(format, comparisonResult);
  return programOutput;
};

export default showDiff;
