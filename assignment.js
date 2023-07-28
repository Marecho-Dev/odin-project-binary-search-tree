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
  //visit all nodes at a depth or level before visitng the nodes at the deeper level
  //queue system is needed since you can't have multiple pointers.
  //breadth-first
  levelOrder(arr = [], queue = [], node = this.root) {
    if (node == null) {
      return;
    }
    //sets up the array that will be return
    arr.push(node.data);
    //sets up queue FIFO with children of node passed in
    queue.push(node.left);
    queue.push(node.right);

    while (queue.length) {
      //sets level to the first node in the queue
      //this will make it so on the next call, this will be the main node allowing
      //for easy FIFO system
      const level = queue[0];
      //shift removes the first index as this one is already added to the arr.
      //this allows for the recursive call to continue on with the next node at the current level
      queue.shift();
      this.levelOrder(arr, queue, level);
    }

    return arr;
  }
  //depth-first
  //depth-first if we go in one direction, we visit all the nodes in that direction
  //<left><root><right>
  inOrder(arr = [], node = this.root) {
    if (node == null) {
      return;
    }
    if (root.left) this.inOrder(arr, node.left);
    arr.push(node.data);
    if (root.right) this.inOrder(arr, node.right);

    return arr;
  }
  //<root><left><right>
  //visit root
  //visit left sub-tree
  //visit right sub-tree
  preOrder(arr = [], node = this.root) {
    if (node == null) {
      return;
    }

    arr.push(node.data);
    if (node.left) this.preOrder(arr, node.left);
    if (node.right) this.preOrder(arr, node.right);

    return arr;
  }
  //<left><right><root>
  postOrder(arr = [], node = this.node) {
    if (node == null) return;

    if (node.left) this.postOrder(node.left);
    if (node.right) this.postOrder(node.right);
    arr.push(node.data);

    return arr;
  }
  height(node = this.root) {
    if (node === null) return 0;
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    if (leftHeight > rightHeight) {
      return leftHeight + 1;
    } else {
      return rightHeight + 1;
    }
  }
  //start depth at 0
  depth(node, root = this.root, depth = 0) {
    if (root === null || node === null) return;
    // if (node === root) return depth;
    if (node === root) return `Depth: ${depth}`;
    //go left or right dependending on node data passed in. add 1 to depth as each recursion is called
    if (node.data < root.data) {
      return this.depth(node, root.left, (depth += 1));
    } else {
      return this.depth(node, root.right, (depth += 1));
    }
  }

  isBalanced(root = this.root) {
    //pass the left node of root as the beginning node for height
    //this will give the height of the left side
    const lHeight = this.height(root.left);
    //pass same info for right
    const rHeight = this.height(root.right);
    //checking difference with abs
    const diff = Math.abs(lHeight - rHeight);
    //if difference is greater than 2 return false. Balanced requires difference of 1 or 0
    return diff < 2 ? "true" : "false";
  }

  rebalance() {}
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
console.log(bst.levelOrder());
console.log(bst.preOrder());
console.log(bst.inOrder());
console.log(bst.postOrder());
const height = bst.height();
console.log("----");
console.log(height);
