import _ from 'lodash';

const makeIndent = (depth) => ' '.repeat(depth + 2 * 2);

const convertToString = (nodes, depth) => {
  if (!_.isObject(nodes)) {
    return String(nodes);
  }

  const resultString = Object.entries(nodes)
    // eslint-disable-next-line no-use-before-define
    .map((node) => renderByType({ key: node[0], value: node[1] }, depth + 1, 'unchanged'));

  return `{\n${resultString.join('\n')}\n${makeIndent(depth)}  }`;
};

const renderByType = (node, depth, type, renderNodes) => {
  let output;
  switch (type) {
    case 'root': {
      const result = node.children.map((child) => renderByType(
        child, depth + 1, child.type, renderNodes,
      ));
      output = `{\n${result.join('\n')}\n}`;
      break;
    }
    case 'nested': {
      const result = node.children.map((child) => renderByType(
        child, depth + 1, child.type, renderNodes,
      ));
      output = `${makeIndent(depth)}  ${node.key}: {\n${result.join('\n')}\n${makeIndent(depth)}  }`;
      break;
    }
    case 'unchanged': {
      output = `${makeIndent(depth)}  ${node.key}: ${convertToString(node.value, depth)}`;
      break;
    }
    case 'deleted': {
      output = `${makeIndent(depth)}- ${node.key}: ${convertToString(node.value, depth)}`;
      break;
    }
    case 'changed': {
      const firstValue = `${makeIndent(depth)}- ${node.key}: ${convertToString(node.oldValue, depth)}`;
      const secondValue = `${makeIndent(depth)}+ ${node.key}: ${convertToString(node.newValue, depth)}`;
      output = `${firstValue}\n${secondValue}`;
      break;
    }
    case 'added': {
      output = `${makeIndent(depth)}+ ${node.key}: ${convertToString(node.value, depth)}`;
      break;
    }
    default: {
      throw Error('Node type is missing or its wrong');
    }
  }
  return output;
};

const convertTreeStylish = (tree) => {
  const renderNodes = (node, depth) => renderByType(node, depth, node.type, renderNodes);
  return renderNodes(tree, 0);
};

export default convertTreeStylish;
