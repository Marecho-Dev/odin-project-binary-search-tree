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

  delete(data, node) {
    //base case
    if (node === null) {
      return node;
    }
    //traverse tree to the node that needs to be deleted
    //need to return root so the next section on single child doesn't keep recursively deleteing itself
    if (data < node.data) {
      node.left = this.delete(data, node.left);
      return node;
    }
    if (data > node.data) {
      node.right = this.delete(data, node.right);
      return node;
    }

    //checking for single child nodes, and leaf nodes
    if (node.left == null && node.right == null) {
      node = null;
    } else if (node.left == null) {
      node = node.right;
    } else if (node.right == null) {
      node = node.left;
    }
    //handles when both nodes are children. set parent and child node with childing being equal
    //to the right node. This allows you to go left completely until you find null.
    //when you find null, if the parent hasn't changed, set it to the right node
    //else set succParent.right to the successor node
    else {
      let succParent = node;
      let succ = node.right;
      while (succ.left !== null) {
        succParent = succ;
        succ = succ.left;
      }

      if (succParent !== node) {
        succParent.left = succ.right;
      } else {
        succParent.right = succ.right;
      }

      node.data = succ.data;
      succ = null;
    }
    return node;
    //leaf node case (smallest node both children are null)
  }

  find(value, node) {
    if (node === null || node.data === value) {
      return node;
    }
    //traverse tree to the node that needs to be deleted
    //need to return root so the next section on single child doesn't keep recursively deleteing itself
    if (value < node.data) {
      return (node.left = this.find(value, node.left));
    }
    if (value > node.data) {
      return (node.right = this.find(value, node.right));
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

console.log("-----------------------------------------");

bst.delete(2, root);
prettyPrint(bst.getRoot());

bst.delete(4, root);
prettyPrint(bst.getRoot());
console.log(bst.find(5, root));
