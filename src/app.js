import {Command} from 'commander/esm.mjs';
import {
  compare,
  convertToString,
  sortAlphabeticaly,
  getFileData,
} from '../utils/utils.js';

const compareFiles = (file1, file2) => {
  const firstFileData = getFileData(file1);
  const secondFileData = getFileData(file2);
  const comparisonResult = compare(firstFileData, secondFileData);
  const sortedResult = sortAlphabeticaly(comparisonResult);
  const programOutput = convertToString(sortedResult);
  console.log(programOutput);
};

const runProgramme = () => {
  const program = new Command();

  program
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format')
    .action((firstFile, secondFile) => {
      compareFiles(firstFile, secondFile);
    });
  program.parse(process.argv);
};
export default runProgramme;
