import _ from 'lodash';

const makeIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

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
  switch (type) {
    case 'root': {
      const result = node.children.map((child) => renderByType(
        child, depth + 1, child.type, renderNodes,
      ));
      return `{\n${result.join('\n')}\n}`;
    }
    case 'nested': {
      const result = node.children.map((child) => renderByType(
        child, depth + 1, child.type, renderNodes,
      ));
      return `${makeIndent(depth)}  ${node.key}: {\n${result.join('\n')}\n${makeIndent(depth)}  }`;
    }
    case 'unchanged': {
      return `${makeIndent(depth)}  ${node.key}: ${convertToString(node.value, depth)}`;
    }
    case 'deleted': {
      return `${makeIndent(depth)}- ${node.key}: ${convertToString(node.value, depth)}`;
    }
    case 'changed': {
      const firstValue = `${makeIndent(depth)}- ${node.key}: ${convertToString(node.oldValue, depth)}`;
      const secondValue = `${makeIndent(depth)}+ ${node.key}: ${convertToString(node.newValue, depth)}`;
      return `${firstValue}\n${secondValue}`;
    }
    case 'added': {
      return `${makeIndent(depth)}+ ${node.key}: ${convertToString(node.value, depth)}`;
    }
    default: {
      throw Error('Node type is missing or its wrong');
    }
  }
};

const convertTreeStylish = (tree) => {
  const renderNodes = (node, depth) => renderByType(node, depth, node.type, renderNodes);
  return renderNodes(tree, 0);
};

export default convertTreeStylish;
