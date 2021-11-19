import convertTree from './stylish.js';

const selectFormat = (format, comparisonResult) => {
  switch (format) {
    case 'stylish': {
      return convertTree(comparisonResult);
    }
    default: {
      throw Error('Sorry, this format is not supported!');
    }
  }
};

export default selectFormat;
