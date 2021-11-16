import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { compareFiles } from '../src/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const result = readFixture('result.txt');

const fileFormats = ['json', 'yml'];

describe('gendiff', () => {
  test.each(fileFormats)('compareFiles', (format) => {
    const file1 = getFixturePath(`firstFile.${format}`);
    const file2 = getFixturePath(`secondFile.${format}`);

    expect(compareFiles(file1, file2)).toEqual(result);
  });
});
