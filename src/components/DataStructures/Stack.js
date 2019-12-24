class Stack {
  constructor() {
    this.array = [];
  }
  push(x) {
    this.array.push(x);
  }
  pop() {
    if (!this.isEmpty()) {
      return this.array.pop();
    }
    return null;
  }
  isEmpty() {
    return this.array.length === 0;
  }
}
module.exports = Stack;
