export interface Iterator<T> {
  hasNext(): boolean;
  next(): T;
}

export interface Iterable<T> {
  iterator(): Iterator<T>;
}