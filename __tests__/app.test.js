import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { compareFiles } from '../src/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const result = readFixture('result.txt');

describe('gendiff', () => {
  test('compareFiles', () => {
    const file1 = getFixturePath('firstFile.json');
    const file2 = getFixturePath('secondFile.json');

    expect(compareFiles(file1, file2)).toEqual(result);
  });
});
