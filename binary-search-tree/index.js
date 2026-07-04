import { node } from 'webpack';
import { mergeSort } from '../recursion/index.js';
export class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) return;
  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
};
const removeDuplicates = (array) => {
  if (array.length === 0) return array;
  let writeIndex = 1;
  for (let readIndex = 1; readIndex < array.length; readIndex++) {
    if (array[readIndex] !== array[writeIndex - 1]) {
      array[writeIndex] = array[readIndex];
      writeIndex++;
    }
  }
  array.length = writeIndex;
  return array;
};
export class Tree {
  constructor(array) {
    this.array = removeDuplicates(mergeSort(array));
    this.root = this.buildTree(this.array);
  }
  buildTree(array) {
    if (array.length <= 0) return null;
    const middle = Math.floor(array.length / 2);
    const newRoot = new Node(array[middle]);
    newRoot.left = this.buildTree(array.slice(0, middle));
    newRoot.right = this.buildTree(array.slice(middle + 1, array.length));
    return newRoot;
  }
  includes(value) {
    if (this.root === null) return false;
    let currentNode = this.root;
    while (currentNode !== null) {
      if (currentNode.data === value) return true;
      if (currentNode.data < value) currentNode = currentNode.right;
      else currentNode = currentNode.left;
    }
    return false;
  }
  insert(value) {
    const insertedNode = new Node(value);
    if (this.root === null) {
      this.root = insertedNode;
      return;
    }
    let currentNode = this.root;
    while (currentNode !== null) {
      if (currentNode.data < value && currentNode.right !== null)
        currentNode = currentNode.right;
      else if (currentNode.data > value && currentNode.left !== null)
        currentNode = currentNode.left;
      else break;
    }
    if (currentNode.data < value) currentNode.right = insertedNode;
    else if (currentNode.data > value) currentNode.left = insertedNode;
  }
  #replaceNode(parent, node, replacement) {
    if (node === this.root) this.root = replacement;
    else if (parent.right === node) parent.right = replacement;
    else parent.left = replacement;
  }
  deleteItem(value) {
    if (this.root === null) return;
    let parentNode = null;
    let currentNode = this.root;
    while (currentNode !== null) {
      if (currentNode.data === value) break;
      parentNode = currentNode;
      if (currentNode.data < value) currentNode = currentNode.right;
      else currentNode = currentNode.left;
    }
    if (currentNode === null) return;
    if (currentNode.left === null && currentNode.right === null) {
      this.#replaceNode(parentNode, currentNode, null);
      return;
    } else if (currentNode.left === null) {
      this.#replaceNode(parentNode, currentNode, currentNode.right);
      return;
    } else if (currentNode.right === null) {
      this.#replaceNode(parentNode, currentNode, currentNode.left);
      return;
    }
    let successorParent = currentNode;
    let successor = successorParent.right;
    while (successor !== null && successor.left !== null) {
      successorParent = successor;
      successor = successor.left;
    }
    currentNode.data = successor.data;
    if (successorParent === currentNode)
      successorParent.right = successor.right;
    else {
      successorParent.left = successor.right;
    }
  }
  #callbackCheck(cb) {
    if (typeof cb !== 'function')
      throw new Error('Callback function is required.');
  }
  levelOrderForEach(callback) {
    this.#callbackCheck(callback);
    const nodeQueue = [];
    let firstIndex = 0;
    if (this.root === null) return;
    nodeQueue.push(this.root);
    while (firstIndex < nodeQueue.length) {
      const currentNode = nodeQueue[firstIndex];
      if (currentNode.left) nodeQueue.push(currentNode.left);
      if (currentNode.right) nodeQueue.push(currentNode.right);
      callback(currentNode.data);
      firstIndex++;
    }
  }
  inOrderForEach(callback) {
    this.#callbackCheck(callback);
    const nodeStack = [];
    if (this.root === null) return;
    let currentNode = this.root;
    while (currentNode !== null || nodeStack.length !== 0) {
      if (currentNode !== null) {
        nodeStack.push(currentNode);
        currentNode = currentNode.left;
      } else {
        currentNode = nodeStack.pop();
        callback(currentNode.data);
        currentNode = currentNode.right;
      }
    }
  }
  preOrderForEach(callback) {
    this.#callbackCheck(callback);
    const nodeStack = [];
    if (this.root === null) return;
    nodeStack.push(this.root);
    while (nodeStack.length !== 0) {
      let currentNode = nodeStack.pop();
      callback(currentNode.data);
      if (currentNode.right) nodeStack.push(currentNode.right);
      if (currentNode.left) nodeStack.push(currentNode.left);
    }
  }
  postOrderForEach(callback) {
    this.#callbackCheck(callback);
    if (this.root === null) return;
    const nodeStack = [];
    let currentNode = this.root;
    let lastVisited = null;
    while (currentNode !== null || nodeStack.length !== 0) {
      if (currentNode !== null) {
        nodeStack.push(currentNode);
        currentNode = currentNode.left;
      } else {
        let peek = nodeStack[nodeStack.length - 1];
        if (peek.right !== null && peek.right !== lastVisited)
          currentNode = peek.right;
        else {
          peek = nodeStack.pop();
          callback(peek.data);
          lastVisited = peek;
        }
      }
    }
  }
}
