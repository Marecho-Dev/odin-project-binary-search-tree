class Node {
  constructor(data) {
    this.data = data;
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
    console.log("calling build tree on ");
    console.log(data);
    const mid = parseInt((data.length - 1) / 2);
    console.log("mid is ");
    console.log(parseInt(mid));
    const treeNode = new Node(data[mid]);
    console.log("calling build tree on left ");
    treeNode.left = this.buildTree(data.slice(0, mid));
    console.log("calling build tree on right");
    treeNode.right = this.buildTree(data.slice(mid + 1, data.length));
    return treeNode;
  }

  getRoot() {
    return this.root;
  }

  insert(data, node) {
    if (node === null) {
      return new Node(data);
    }
    if (data < node.data) {
      node.left = this.insert(data, node.left);
    }
    if (data > node.data) {
      node.right = this.insert(data, node.right);
    }

    return node;
  }
}

const bst = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(bst);
console.log("h");
const root = bst.getRoot();
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
prettyPrint(root);
bst.insert(2, root);
prettyPrint(bst.getRoot());

bst.insert(200, root);
prettyPrint(bst.getRoot());
