import _ from 'lodash';

const convertToString = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (value === null) {
    return value;
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const buildPath = (path, key) => [...path, key].join('.');

const renderByType = (node, type, path, renderNodes) => {
  switch (type) {
    case 'root': {
      return node.children.flatMap((child) => renderByType(
        child, child.type, [...path, node.key], renderNodes,
      ));
    }
    case 'nested': {
      return node.children.flatMap((child) => renderByType(
        child, child.type, [...path, node.key], renderNodes,
      ));
    }
    case 'unchanged': {
      return [];
    }
    case 'deleted': {
      return `Property '${buildPath(path, node.key).substring(1)}' was removed`;
    }
    case 'changed': {
      const oldValue = `${convertToString(node.oldValue)}`;
      const newValue = `${convertToString(node.newValue)}`;
      return `Property '${buildPath(path, node.key).substring(1)}' was updated. From ${oldValue} to ${newValue}`;
    }
    case 'added': {
      return `Property '${buildPath(path, node.key).substring(1)}' was added with value: ${convertToString(node.value)}`;
    }
    default: {
      throw Error('Node type is missing or its wrong');
    }
  }
};

const convertTreePlain = (tree) => {
  const renderNodes = (node, path) => renderByType(node, node.type, path, renderNodes);
  return renderNodes(tree, []).join('\n');
};

export default convertTreePlain;
