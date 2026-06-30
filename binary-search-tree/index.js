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
    if (this.root === null) this.root = insertedNode;
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
}
const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(tree.array);
prettyPrint(tree.buildTree(tree.array));
