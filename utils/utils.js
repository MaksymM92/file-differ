import fs from 'fs';

const compare = (file1, file2) => {
  const result = [];
  Object.keys(file1).forEach((key) => {
    if (file2[key]) {
      if (file1[key] === file2[key]) {
        result.push(`  ${key}: ${file1[key]}`);
      } else {
        result.push(`- ${key}: ${file1[key]}`);
        result.push(`+ ${key}: ${file2[key]}`);
      }
    } else {
      result.push(`- ${key}: ${file1[key]}`);
    }
  });

  Object.keys(file2).forEach((key) => {
    if (!file1[key]) {
      result.push(`+ ${key}: ${file2[key]}`);
    }
  });
  return result.sort();
};

const getFileData = (filePath) => {
  let data;
  try {
    data = fs.readFileSync(filePath);
  } catch (err) {
    console.error(err);
  }
  return JSON.parse(data);
};

const sortAlphabeticaly = (data) => data.sort((a, b) => a[2].localeCompare(b[2]));

const convertToString = (data) => {
  let outputString = '{';

  for (let i = 0; i < data.length; i += 1) {
    outputString += `\n ${data[i]}`;
  }
  return `${outputString}}`;
};

export {
  compare,
  convertToString,
  sortAlphabeticaly,
  getFileData,
};
