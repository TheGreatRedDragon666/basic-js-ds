const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');
//const {assert} = require("chai");

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  // bypass(node, data, add = false) {
  //   if(!node) {
  //     if(add === true) {
  //       console.log('new data', data)
  //       return new Node(data);
  //     }
  //     return false;
  //   }
  //
  //   if(data < node.data) {
  //     if(add === true) {
  //       node.left = this.bypass(node.left, data, true);
  //     }
  //     return this.bypass(node.left, data);
  //   }
  //
  //   if(data > node.data) {
  //     if(add === true) {
  //       node.right = this.bypass(node.right, data, true);
  //     }
  //     return this.bypass(node.right, data);
  //   }
  //
  //   if(node.data === data) {
  //     console.log('node', node)
  //     return node;
  //   }
  //
  // }

  root() {
    return this._root;
  }

  add(data) {
    if(!this._root) {
      this._root = new Node(data);
      return this;
    }

    function bypassAdd(node, data) {
      if(data > node.data) {
        if(node.right) {
          return bypassAdd(node.right, data);
        } else {
          node.right = new Node(data);
        }
      } else if(data < node.data) {
        if(node.left) {
          return bypassAdd(node.left, data);
        } else {
          node.left = new Node(data);
        }
      }
    }

    bypassAdd(this._root, data);
  }

  has(data) {
    function byPass(node, data) {
      if(!node) {
        return false;
      }

      if(data < node.data) {
        return byPass(node.left, data);
      }

      if(data > node.data) {
        return byPass(node.right, data);
      }

      if(node.data === data) {
        return true;
      }
    }
    return byPass(this._root, data);
     //return (!this.bypass(this._root, data)) ? false : true;

  }

  find(data) {
    // const currentNode = this.bypass(this._root, data);
    // return !currentNode ? null : currentNode.data;
    function bypassFind(node, data) {
      if (!node) {
        return null;
      }
      if (data < node.data) {
        return bypassFind(node.left, data);
      }
      if (data > node.data) {
        return bypassFind(node.right, data);
      }
      if (data === node.data) {
        return node;
      }
    }
   return bypassFind(this._root, data);
  }

  remove(data) {
    function bypassRemove(node, data) {
      if (data < node.data) {
        console.log('<')
        if (node.left) {
          console.log('left remove');
          node.left = bypassRemove(node.left, data);
          return node;
        } else {
          return null;
        }
      } else if (data > node.data) {
        console.log('>')
        if (node.right) {
          console.log('right remove');
          node.right = bypassRemove(node.right, data);
          return node;
        } else {
          return null;
        }
      } else {
        console.log('equal')
        if (node.left && node.right) {
          console.log('has both', node);
          let max = node.left;
          while (max.right) {
            max = max.right;
          }
          console.log('max', max);
          node.data = max.data;
          node.left = bypassRemove(node.left, max.data);
          return node;

        } else if (node.left) {
          console.log('has left', node);
          node = node.left;
          return node;
        } else if (node.right) {
          console.log('has right', node);
          node = node.right;
          return node;
        } else {
          console.log('isLeaf', node)
          return null;
        }

      }
    }

    this._root = bypassRemove(this._root, data);
  }

  min() {
    function leftBypass(node) {
      if (node.left) {
        return leftBypass(node.left);
      }
      return node.data;
    }

    return leftBypass(this._root);
  }

  max() {
    function rightBypass(node) {
      if (node.right) {
        return rightBypass(node.right);
      }
      return node.data;
    }
    return rightBypass(this._root);
  }

}

module.exports = {
  BinarySearchTree
};


const tree = new BinarySearchTree();
console.log(tree)
console.log(tree.add(2))
console.log(tree.add(7))
console.log(tree.add(1))
console.log(tree.add(8))
console.log(tree.add(4))
console.log(tree.add(32))
console.log(tree.add(12))
console.log(tree.add(14))
console.log(tree.find(8))
console.log(tree.find(2))
console.log(tree.find(32))
console.log(tree.find(14))
