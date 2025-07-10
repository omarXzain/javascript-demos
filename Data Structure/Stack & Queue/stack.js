const Node = require("./node");

class Stack {
  constructor() {
    this.top = null; // top pointer of the stack
  }

  // add new elemnt
  push(data) {
    // step 1: create a new node with the give data/value
    const newNode = new Node(data);

    // step 2: Link the new node to the current top
    newNode.next = this.top;

    // step 3: update the top to the new node
    this.top = newNode;
  }

  pop() {
    // step 1: check if the stack is empty
    if (!this.top) return "cannot pop - stack is empty";

    // step 2: remove the top and store inside a variable for later use if needed
    const popped = this.top.data;

    // step 3: move the top to the next value/data
    this.top = this.top.next;

    return popped;
  }

  peek() {
    if (this.top) {
      return this.top.data;
    } else {
      return null;
    }

    // ternary operator
    //   return this.top ? this.top.data : null;
  }

  isEmpty() {
    return this.top === null;
  }

  printStack() {
    let current = this.top;

    const result = [];

    while (current) {
      result.push(current.data);

      current = current.next;
    }

    console.log("Stack - Top", result.join(" -> "));
  }
}

module.exports = Stack;
