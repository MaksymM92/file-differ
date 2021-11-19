import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { showDiff } from '../src/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const result = readFixture('result.txt');
const stylishResult = readFixture('stylish_result.txt');

const fileFormats = ['json', 'yml'];

describe('gendiff', () => {
  test.each(fileFormats)('compareFiles', (format) => {
    const file1 = getFixturePath(`firstFile.${format}`);
    const file2 = getFixturePath(`secondFile.${format}`);
    const file3 = getFixturePath(`firstFile_v2.${format}`);
    const file4 = getFixturePath(`secondFile_v2.${format}`);
    console.log('file3', file3);
    console.log('file4', file4);
    expect(showDiff(file1, file2)).toEqual(result);
    expect(showDiff(file3, file4, 'stylish')).toEqual(stylishResult);
  });
});
