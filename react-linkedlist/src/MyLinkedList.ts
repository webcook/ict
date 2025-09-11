import { Iterator, Iterable } from './Iterator';

class Node<T> {
  data: T;
  next: Node<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

class LinkedListIterator<T> implements Iterator<T> {
  private current: Node<T> | null;

  constructor(head: Node<T> | null) {
    this.current = head;
  }

  hasNext(): boolean {
    return this.current !== null;
  }

  next(): T {
    if (!this.hasNext()) {
      throw new Error('No more elements');
    }
    const data = this.current!.data;
    this.current = this.current!.next;
    return data;
  }
}

export class MyLinkedList<T> implements Iterable<T> {
  private head: Node<T> | null = null;
  private size: number = 0;

  iterator(): Iterator<T> {
    return new LinkedListIterator<T>(this.head);
  }

  add(data: T): void {
    const newNode = new Node<T>(data);
    
    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  get(index: number): T {
    if (index < 0 || index >= this.size) {
      throw new Error('Index out of bounds');
    }

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current!.next;
    }
    return current!.data;
  }

  delete(index: number): T {
    if (index < 0 || index >= this.size) {
      throw new Error('Index out of bounds');
    }

    if (index === 0) {
      const deletedData = this.head!.data;
      this.head = this.head!.next;
      this.size--;
      return deletedData;
    }

    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current!.next;
    }

    const deletedData = current!.next!.data;
    current!.next = current!.next!.next;
    this.size--;
    return deletedData;
  }

  getSize(): number {
    return this.size;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  toArray(): T[] {
    const result: T[] = [];
    const iter = this.iterator();
    while (iter.hasNext()) {
      result.push(iter.next());
    }
    return result;
  }
}