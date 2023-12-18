// const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    let node = new Node(data);
    if (!this.rootNode) {
      this.rootNode = node;
    } else {
      this.addNode(node, this.rootNode);
    }
  }

  addNode(childNode, parentNode) {
    if (childNode.data < parentNode.data) {
      if (!parentNode.left) {
        parentNode.left = childNode;
      } else {
        this.addNode(childNode, parentNode.left);
      }
    }

    if (childNode.data > parentNode.data) {
      if (!parentNode.right) {
        parentNode.right = childNode;
      } else {
        this.addNode(childNode, parentNode.right);
      }
    }
  }

  has(data) {
    let node = new Node(data);
    if (this.rootNode.data === data) {
      return true;
    } else {
      return this.searchNode(this.rootNode, node) === null ? false : true;
    }
  }

  searchNode(parentNode, childNode) {
    if (!parentNode) {
      return null;
    }
    if (childNode.data === parentNode.data) {
      return parentNode;
    } else if (childNode.data < parentNode.data) {
      return this.searchNode(parentNode.left, childNode);
    } else if (childNode.data > parentNode.data) {
      return this.searchNode(parentNode.right, childNode);
    }
  }

  find(data) {
    let node = new Node(data);
    if (!this.rootNode) {
      return null;
    }
    return this.rootNode.data === data ? 
      this.rootNode : this.searchNode(this.rootNode, node);
  }

  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data);
  }

  removeNode(parentNode, data) {
    if (!parentNode) {
      return null;
    }
    if (data < parentNode.data) {
      parentNode.left = this.removeNode(parentNode.left, data);
      return parentNode;
    } else if (data > parentNode.data) {
      parentNode.right = this.removeNode(parentNode.right, data);
      return parentNode;
    } else {
      if (!parentNode.left && !parentNode.right) {
        return null;
      } else if (!parentNode.right) {
        return parentNode.left;
      } else if (!parentNode.left) {
        return parentNode.right;
      } else {
        let min = this.findMinNode(parentNode.right);
        parentNode.data = min.data;
        parentNode.right = this.removeNode(parentNode.right, min.data);
        return parentNode;
      }
    }
  }

  min() {
    return !this.rootNode ? null : this.findMinNode(this.rootNode).data;
  }

  findMinNode(node) {
    return !node.left ? node : this.findMinNode(node.left);
  }

  max() {
    return !this.rootNode ? null : this.findMaxNode(this.rootNode).data;
  }

  findMaxNode(node) {
    return !node.right ? node : this.findMaxNode(node.right);
  }
}

module.exports = {
  BinarySearchTree
};