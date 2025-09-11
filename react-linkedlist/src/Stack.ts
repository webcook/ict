import { MyLinkedList } from './MyLinkedList';

export class Stack<T> {
  private list: MyLinkedList<T>;

  constructor() {
    this.list = new MyLinkedList<T>();
  }

  push(item: T): void {
    this.list.add(item);
  }

  pop(): T {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }
    const lastIndex = this.list.getSize() - 1;
    return this.list.delete(lastIndex);
  }

  peek(): T {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }
    const lastIndex = this.list.getSize() - 1;
    return this.list.get(lastIndex);
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