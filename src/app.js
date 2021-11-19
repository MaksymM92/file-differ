import { Command } from 'commander/esm.mjs';
import getFileData from '../utils/utils.js';
import buildTree from './buildTree.js';
import selectFormat from './formatters/formats.js';

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

const runProgramme = () => {
  const program = new Command();

  program
    .description('Compares two configuration __fixtures__ and shows a difference.')
    .version('1.0.0')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format')
    .action((firstFile, secondFile, format) => {
      const result = showDiff(firstFile, secondFile, format.format);
      console.log(result);
    });
  program.parse(process.argv);
};
export { runProgramme, showDiff };
