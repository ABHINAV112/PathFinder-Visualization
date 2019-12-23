class Queue {
  constructor() {
    this.queue = [];
  }
  enqueue = data => {
    this.queue.push(data);
  };
  dequeue = () => {
    return this.queue.splice(0, 1)[0];
  };
  isEmpty = () => {
    return this.queue.length === 0;
  };
}

module.exports = Queue;
