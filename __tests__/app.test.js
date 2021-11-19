import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { showDiff } from '../src/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const simpleDiffResult = readFixture('result.txt');
const complexDiffResult = readFixture('nestedJSONresult.txt');

const testCases = [['firstFile', 'secondFile'], ['firstFile_v2', 'secondFile_v2']];

describe('gendiff', () => {
  test.each(testCases)('compareJSONFiles', (files) => {
    const file1 = getFixturePath(`${files[0]}.json`);
    const file2 = getFixturePath(`${files[1]}.json`);
    expect(showDiff(file1, file2)).toEqual(simpleDiffResult);
  });
  test.each(testCases)('compareYAMLFiles', (files) => {
    const file1 = getFixturePath(`${files[0]}.yml`);
    const file2 = getFixturePath(`${files[1]}.yml`);
    expect(showDiff(file1, file2)).toEqual(complexDiffResult);
  });
});
