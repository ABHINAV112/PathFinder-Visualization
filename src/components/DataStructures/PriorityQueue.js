class PriorityQueue {
  constructor(comparator) {
    this.heap = [];
    this.heapSize = 0;
    this.comparator = comparator;
  }
  enqueue = data => {
    this.heap.push(data);
    this.heapSize++;
    let i = this.heapSize - 1;

    while (i > 0) {
      let parent = parseInt((i - 1) / 2);
      if (this.comparator(this.heap[i]) > this.comparator(this.heap[parent])) {
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
    if (this.heapSize !== 1) {
      this.heap[0] = this.heap.pop();
      this.heapSize--;
      this.siftDown(0);
    } else if (this.heapSize === 1) {
      console.log("test");
      this.heap = [];
      this.heapSize--;
    }

    return minimum;
  };

  siftDown(i) {
    while (i < this.heapSize) {
      let minIndex;
      if (2 * i + 1 >= this.heapSize) {
        break;
      }
      if (2 * i + 2 >= this.heapSize) {
        minIndex = 2 * i + 1;
      } else if (
        this.comparator(this.heap[2 * i + 1]) <
        this.comparator(this.heap[2 * i + 2])
      ) {
        minIndex = 2 * i + 1;
      } else {
        minIndex = 2 * i + 2;
      }

      if (
        this.comparator(this.heap[minIndex]) < this.comparator(this.heap[i])
      ) {
        let temp = this.heap[minIndex];
        this.heap[minIndex] = this.heap[i];
        this.heap[i] = temp;
        i = minIndex;
      } else {
        break;
      }
    }
  }

  heapify() {
    console.log("test");
    for (let i = this.heapSize - 1; i >= 0; i--) {
      this.siftDown(i);
      // console.log(this.heap);
    }
  }

  findElement(key) {
    for (let i = 0; i < this.heapSize; i++) {
      if (key(this.heap[i])) {
        return i;
      }
    }
    return false;
  }
  update(index, value) {
    this.heap[index] = value;
    this.heapify();
  }

  isEmpty() {
    return this.heapSize === 0;
  }
}

export default PriorityQueue;
