import { MyLinkedList } from './MyLinkedList';

export class Queue<T> {
  private list: MyLinkedList<T>;

  constructor() {
    this.list = new MyLinkedList<T>();
  }

  enqueue(item: T): void {
    this.list.add(item);
  }

  dequeue(): T {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    return this.list.delete(0);
  }

  peek(): T {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    return this.list.get(0);
  }

  isEmpty(): boolean {
    return this.list.isEmpty();
  }

  size(): number {
    return this.list.getSize();
  }

  toArray(): T[] {
    return this.list.toArray();
  }
}