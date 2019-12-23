class PriorityQueue {
  constructor(key) {
    this.heap = [];
    this.heapSize = 0;
    this.key = key;
  }
  enqueue = data => {
    this.heap.push(data);
    this.heapSize++;
    let i = this.heapSize - 1;

    while (i > 0) {
      let parent = parseInt((i - 1) / 2);
      if (this.key(this.heap[i]) > this.key(this.heap[parent])) {
        break;
      } else {
        let temp = this.heap[i];
        this.heap[i] = this.heap[parent];
        this.heap[parent] = temp;
        i = parent;
      }
    }
  };

  dequeue = () => {
    let minimum = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapSize--;
    let i = 0;
    while (i < this.heapSize) {
      let minIndex;
      if (2 * i + 1 >= this.heapSize) {
        break;
      }
      if (2 * i + 2 >= this.heapSize) {
        minIndex = 2 * i + 1;
      } else if (
        this.key(this.heap[2 * i + 1]) < this.key(this.heap[2 * i + 2])
      ) {
        minIndex = 2 * i + 1;
      } else {
        minIndex = 2 * i + 2;
      }

      if (this.key(this.heap[minIndex]) < this.key(this.heap[i])) {
        let temp = this.heap[minIndex];
        this.heap[minIndex] = this.heap[i];
        this.heap[i] = temp;
        i = minIndex;
      } else {
        break;
      }
    }
    return minimum;
  };
}

module.exports = PriorityQueue;
