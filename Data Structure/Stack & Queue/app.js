const Stack = require("./stack");

const stack = new Stack();

// stack.push(1);
// stack.push(2);
// stack.push(3);
stack.push(4);
stack.printStack();

console.log("---------poped value-------------");
console.log("poped value1", stack.pop());
console.log("poped value2", stack.pop());

console.log("---------after popping-------------");

stack.printStack();

console.log("Top value", stack.peek());
console.log("is stack Empty?", stack.isEmpty());
