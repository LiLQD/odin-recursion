import { Tree, Node } from './index.js';
describe('Node', () => {
  test('stores data and has left/right children', () => {
    const node = new Node(10);

    expect(node.data).toBe(10);
    expect(node.left).toBeNull();
    expect(node.right).toBeNull();
  });
});

describe('Tree', () => {
  describe('constructor / buildTree(array)', () => {
    test('creates a balanced BST from an unsorted array', () => {
      const tree = new Tree([1, 7, 4, 23, 8, 9, 3, 5, 67, 6345, 324]);

      expect(tree.root.data).toBe(8);
      expect(tree.root.left.data).toBe(4);
      expect(tree.root.right.data).toBe(67);
    });

    test('sorts values and removes duplicates when building the tree', () => {
      const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
      const values = [];

      tree.inOrderForEach((value) => values.push(value));

      expect(values).toEqual([1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]);
    });

    test('sets root to null for an empty array', () => {
      const tree = new Tree([]);

      expect(tree.root).toBeNull();
    });

    test('creates a one-node tree from a single value', () => {
      const tree = new Tree([10]);

      expect(tree.root.data).toBe(10);
      expect(tree.root.left).toBeNull();
      expect(tree.root.right).toBeNull();
    });
  });

  describe('includes(value)', () => {
    let tree;

    beforeEach(() => {
      tree = new Tree([1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]);
    });

    test('returns true when the value exists', () => {
      expect(tree.includes(1)).toBe(true);
      expect(tree.includes(8)).toBe(true);
      expect(tree.includes(6345)).toBe(true);
    });

    test('returns false when the value does not exist', () => {
      expect(tree.includes(999)).toBe(false);
      expect(tree.includes(-1)).toBe(false);
    });

    test('returns false for an empty tree', () => {
      const emptyTree = new Tree([]);

      expect(emptyTree.includes(10)).toBe(false);
    });
  });

  describe('insert(value)', () => {
    test('inserts a value while preserving BST order', () => {
      const tree = new Tree([1, 3, 5]);

      tree.insert(4);

      const values = [];
      tree.inOrderForEach((value) => values.push(value));

      expect(values).toEqual([1, 3, 4, 5]);
      expect(tree.includes(4)).toBe(true);
    });

    test('does nothing when inserting a duplicate value', () => {
      const tree = new Tree([1, 3, 5]);

      tree.insert(3);

      const values = [];
      tree.inOrderForEach((value) => values.push(value));

      expect(values).toEqual([1, 3, 5]);
    });

    test('can insert into an empty tree', () => {
      const tree = new Tree([]);

      tree.insert(10);

      expect(tree.root.data).toBe(10);
      expect(tree.includes(10)).toBe(true);
    });
  });

  describe('deleteItem(value)', () => {
    test('does nothing if the value does not exist', () => {
      const tree = new Tree([1, 3, 5]);

      tree.deleteItem(999);

      const values = [];
      tree.inOrderForEach((value) => values.push(value));

      expect(values).toEqual([1, 3, 5]);
    });

    test('deletes a leaf node', () => {
      const tree = new Tree([1, 3, 5, 7, 9]);

      tree.deleteItem(1);

      const values = [];
      tree.inOrderForEach((value) => values.push(value));

      expect(values).toEqual([3, 5, 7, 9]);
      expect(tree.includes(1)).toBe(false);
    });

    test('deletes a node with one child', () => {
      const tree = new Tree([10]);

      tree.insert(5);
      tree.insert(3);

      tree.deleteItem(5);

      const values = [];
      tree.inOrderForEach((value) => values.push(value));

      expect(values).toEqual([3, 10]);
      expect(tree.includes(5)).toBe(false);
    });

    test('deletes a node with two children', () => {
      const tree = new Tree([1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]);

      tree.deleteItem(8);

      const values = [];
      tree.inOrderForEach((value) => values.push(value));

      expect(values).toEqual([1, 3, 4, 5, 7, 9, 23, 67, 324, 6345]);
      expect(tree.includes(8)).toBe(false);
      expect(tree.root.data).not.toBe(8);
    });

    test('can delete the only node in the tree', () => {
      const tree = new Tree([10]);

      tree.deleteItem(10);

      expect(tree.root).toBeNull();
      expect(tree.includes(10)).toBe(false);
    });
  });

  describe('levelOrderForEach(callback)', () => {
    test('traverses the tree in breadth-first level order', () => {
      const tree = new Tree([1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]);
      const values = [];

      tree.levelOrderForEach((value) => values.push(value));

      expect(values).toEqual([8, 4, 67, 3, 7, 23, 6345, 1, 5, 9, 324]);
    });

    test('throws an Error if no callback is provided', () => {
      const tree = new Tree([1, 2, 3]);

      expect(() => tree.levelOrderForEach()).toThrow(Error);
    });

    test('does nothing for an empty tree when callback is provided', () => {
      const tree = new Tree([]);
      const values = [];

      tree.levelOrderForEach((value) => values.push(value));

      expect(values).toEqual([]);
    });
  });

  describe('depth-first traversals', () => {
    let tree;

    beforeEach(() => {
      tree = new Tree([1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]);
    });

    test('inOrderForEach(callback) traverses left-root-right', () => {
      const values = [];

      tree.inOrderForEach((value) => values.push(value));

      expect(values).toEqual([1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]);
    });

    test('preOrderForEach(callback) traverses root-left-right', () => {
      const values = [];

      tree.preOrderForEach((value) => values.push(value));

      expect(values).toEqual([8, 4, 3, 1, 7, 5, 67, 23, 9, 324, 6345]);
    });

    test('postOrderForEach(callback) traverses left-right-root', () => {
      const values = [];

      tree.postOrderForEach((value) => values.push(value));

      expect(values).toEqual([1, 3, 5, 7, 4, 9, 23, 324, 6345, 67, 8]);
    });

    test('inOrderForEach(callback) throws an Error if no callback is provided', () => {
      expect(() => tree.inOrderForEach()).toThrow(Error);
    });

    test('preOrderForEach(callback) throws an Error if no callback is provided', () => {
      expect(() => tree.preOrderForEach()).toThrow(Error);
    });

    test('postOrderForEach(callback) throws an Error if no callback is provided', () => {
      expect(() => tree.postOrderForEach()).toThrow(Error);
    });
  });

  describe('height(value)', () => {
    let tree;

    beforeEach(() => {
      tree = new Tree([1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]);
    });

    test('returns the height of a node', () => {
      expect(tree.height(8)).toBe(3);
      expect(tree.height(4)).toBe(2);
      expect(tree.height(67)).toBe(2);
      expect(tree.height(3)).toBe(1);
    });

    test('returns 0 for a leaf node', () => {
      expect(tree.height(1)).toBe(0);
      expect(tree.height(5)).toBe(0);
      expect(tree.height(9)).toBe(0);
      expect(tree.height(324)).toBe(0);
    });

    test('returns undefined if the value is not found', () => {
      expect(tree.height(999)).toBeUndefined();
    });
  });

  describe('depth(value)', () => {
    let tree;

    beforeEach(() => {
      tree = new Tree([1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]);
    });

    test('returns the depth of a node', () => {
      expect(tree.depth(8)).toBe(0);
      expect(tree.depth(4)).toBe(1);
      expect(tree.depth(67)).toBe(1);
      expect(tree.depth(3)).toBe(2);
      expect(tree.depth(1)).toBe(3);
    });

    test('returns undefined if the value is not found', () => {
      expect(tree.depth(999)).toBeUndefined();
    });
  });

  describe('isBalanced()', () => {
    test('returns true for a balanced tree', () => {
      const tree = new Tree([1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]);

      expect(tree.isBalanced()).toBe(true);
    });

    test('returns false for an unbalanced tree', () => {
      const tree = new Tree([1, 3, 4, 5, 7, 8, 9]);

      tree.insert(100);
      tree.insert(101);
      tree.insert(102);
      tree.insert(103);

      expect(tree.isBalanced()).toBe(false);
    });

    test('returns true for an empty tree', () => {
      const tree = new Tree([]);

      expect(tree.isBalanced()).toBe(true);
    });
  });

  describe('rebalance()', () => {
    test('rebalances an unbalanced tree', () => {
      const tree = new Tree([1, 3, 4, 5, 7, 8, 9]);

      tree.insert(100);
      tree.insert(101);
      tree.insert(102);
      tree.insert(103);

      expect(tree.isBalanced()).toBe(false);

      tree.rebalance();

      expect(tree.isBalanced()).toBe(true);

      const values = [];
      tree.inOrderForEach((value) => values.push(value));

      expect(values).toEqual([1, 3, 4, 5, 7, 8, 9, 100, 101, 102, 103]);
    });

    test('keeps all values after rebalancing', () => {
      const tree = new Tree([10, 20, 30]);

      tree.insert(40);
      tree.insert(50);
      tree.insert(60);
      tree.rebalance();

      expect(tree.includes(10)).toBe(true);
      expect(tree.includes(20)).toBe(true);
      expect(tree.includes(30)).toBe(true);
      expect(tree.includes(40)).toBe(true);
      expect(tree.includes(50)).toBe(true);
      expect(tree.includes(60)).toBe(true);
    });

    test('can rebalance an empty tree', () => {
      const tree = new Tree([]);

      tree.rebalance();

      expect(tree.root).toBeNull();
      expect(tree.isBalanced()).toBe(true);
    });
  });
});
