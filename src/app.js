import { Command } from 'commander/esm.mjs';
import {
  compare,
  convertToString,
  getFileData,
} from '../utils/utils.js';

const compareFiles = (file1, file2) => {
  const firstFileData = getFileData(file1);
  const secondFileData = getFileData(file2);
  const comparisonResult = compare(firstFileData, secondFileData);
  const programOutput = convertToString(comparisonResult);
  return programOutput;
};

const runProgramme = () => {
  const program = new Command();

  program
    .description('Compares two configuration __fixtures__ and shows a difference.')
    .version('1.0.0')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format')
    .action((firstFile, secondFile) => {
      const result = compareFiles(firstFile, secondFile);
      console.log(result);
    });
  program.parse(process.argv);
};
export { runProgramme, compareFiles };
