const Node = require("./node");

class Linkedlist {
  constructor() {
    this.head = null;
  }

  add(data) {
    // step 1
    const newNode = new Node(data);

    if (this.head === null) {
      this.head = newNode;
      return;
    }

    let current = this.head;

    while (current.next !== null) {
      current = current.next;
    }

    current.next = newNode;
  }

  print() {
    let current = this.head;

    if (current === null) {
      console.log("List is empty");
      return;
    }

    let result = "";
    while (current !== null) {
      result += current.data + " -> ";
      console.log(current.data);
      current = current.next;
    }

    result += "null";

    console.log("head -> ", result);
  }
}

module.exports = Linkedlist;
