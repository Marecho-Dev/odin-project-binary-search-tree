class Node {
  constructor(data) {
    this.root = data;
    this.left = null;
    this.right = null;
  }
}

function compareNumbers(a, b) {
  return a - b;
}

function sortedArray(arr) {
  return arr.sort(compareNumbers);
}

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(removeDuplicates(sortedArray(arr)));
  }

  buildTree(data) {
    if (data.length == 0) {
      return null;
    }
    console.log(data);
    const mid = (data.length - 1) / 2;
    console.log("mid is ");
    console.log(parseInt(mid));
    const treeNode = new Node(data[mid]);
    treeNode.left = this.buildTree(data.slice(0, mid));
    treeNode.right = this.buildTree(data.slice(mid + 1, data.length));
    return treeNode;
  }

  getRoot() {
    return this.root;
  }
}

const bst = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(bst);
console.log("h");
console.log(bst.getRoot());
