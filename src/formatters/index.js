import convertTreeStylish from './stylish.js';
import convertTreePlain from './plain.js';

const selectFormat = (format, comparisonResult) => {
  switch (format) {
    case 'stylish': {
      return convertTreeStylish(comparisonResult);
    }
    case 'plain': {
      return convertTreePlain(comparisonResult);
    }
    case 'json': {
      return JSON.stringify(comparisonResult);
    }
    default: {
      throw Error('Sorry, this format is not supported!');
    }
  }
};

export default selectFormat;
