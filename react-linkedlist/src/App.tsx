import React, { useState } from 'react';
import { MyLinkedList } from './MyLinkedList';
import { Queue } from './Queue';
import { Stack } from './Stack';
import './App.css';

interface DemoResult {
  operation: string;
  result: string;
  list: string[];
}

const App: React.FC = () => {
  const [linkedList] = useState(new MyLinkedList<string>());
  const [queue] = useState(new Queue<string>());
  const [stack] = useState(new Stack<string>());

  const [linkedListResults, setLinkedListResults] = useState<DemoResult[]>([]);
  const [queueResults, setQueueResults] = useState<DemoResult[]>([]);
  const [stackResults, setStackResults] = useState<DemoResult[]>([]);

  const [inputValue, setInputValue] = useState<string>('');
  const [indexValue, setIndexValue] = useState<string>('');

  const addToLinkedList = () => {
    if (inputValue.trim()) {
      linkedList.add(inputValue);
      setLinkedListResults(prev => [...prev, {
        operation: `add("${inputValue}")`,
        result: 'Added successfully',
        list: linkedList.toArray()
      }]);
      setInputValue('');
    }
  };

  const getFromLinkedList = () => {
    const index = parseInt(indexValue);
    if (!isNaN(index)) {
      try {
        const result = linkedList.get(index);
        setLinkedListResults(prev => [...prev, {
          operation: `get(${index})`,
          result: result,
          list: linkedList.toArray()
        }]);
      } catch (error) {
        setLinkedListResults(prev => [...prev, {
          operation: `get(${index})`,
          result: 'Error: Index out of bounds',
          list: linkedList.toArray()
        }]);
      }
      setIndexValue('');
    }
  };

  const deleteFromLinkedList = () => {
    const index = parseInt(indexValue);
    if (!isNaN(index)) {
      try {
        const result = linkedList.delete(index);
        setLinkedListResults(prev => [...prev, {
          operation: `delete(${index})`,
          result: `Deleted: ${result}`,
          list: linkedList.toArray()
        }]);
      } catch (error) {
        setLinkedListResults(prev => [...prev, {
          operation: `delete(${index})`,
          result: 'Error: Index out of bounds',
          list: linkedList.toArray()
        }]);
      }
      setIndexValue('');
    }
  };

  const testIterator = () => {
    const iterator = linkedList.iterator();
    const items: string[] = [];
    while (iterator.hasNext()) {
      items.push(iterator.next());
    }
    setLinkedListResults(prev => [...prev, {
      operation: 'Iterator test (for-each)',
      result: `Traversed: [${items.join(', ')}]`,
      list: linkedList.toArray()
    }]);
  };

  const enqueueToQueue = () => {
    if (inputValue.trim()) {
      queue.enqueue(inputValue);
      setQueueResults(prev => [...prev, {
        operation: `enqueue("${inputValue}")`,
        result: 'Enqueued successfully',
        list: queue.toArray()
      }]);
      setInputValue('');
    }
  };

  const dequeueFromQueue = () => {
    try {
      const result = queue.dequeue();
      setQueueResults(prev => [...prev, {
        operation: 'dequeue()',
        result: `Dequeued: ${result}`,
        list: queue.toArray()
      }]);
    } catch (error) {
      setQueueResults(prev => [...prev, {
        operation: 'dequeue()',
        result: 'Error: Queue is empty',
        list: queue.toArray()
      }]);
    }
  };

  const pushToStack = () => {
    if (inputValue.trim()) {
      stack.push(inputValue);
      setStackResults(prev => [...prev, {
        operation: `push("${inputValue}")`,
        result: 'Pushed successfully',
        list: stack.toArray()
      }]);
      setInputValue('');
    }
  };

  const popFromStack = () => {
    try {
      const result = stack.pop();
      setStackResults(prev => [...prev, {
        operation: 'pop()',
        result: `Popped: ${result}`,
        list: stack.toArray()
      }]);
    } catch (error) {
      setStackResults(prev => [...prev, {
        operation: 'pop()',
        result: 'Error: Stack is empty',
        list: stack.toArray()
      }]);
    }
  };

  const renderResults = (results: DemoResult[]) => (
    <div className="results">
      {results.map((result, index) => (
        <div key={index} className="result-item">
          <strong>{result.operation}</strong>: {result.result}
          <br />
          <span className="list-state">Current state: [{result.list.join(', ')}]</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="app">
      <h1>React LinkedList</h1>

      <div className="section">
        <h2>MyLinkedList </h2>
        <div className="controls">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
          />
          <input
            type="number"
            value={indexValue}
            onChange={(e) => setIndexValue(e.target.value)}
            placeholder="Enter index"
          />
          <button onClick={addToLinkedList}>Add</button>
          <button onClick={getFromLinkedList}>Get</button>
          <button onClick={deleteFromLinkedList}>Delete</button>
          <button onClick={testIterator}>Test Iterator</button>
        </div>
        {renderResults(linkedListResults)}
      </div>

      <div className="section">
        <h2>Queue (FIFO)</h2>
        <div className="controls">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
          />
          <button onClick={enqueueToQueue}>Enqueue</button>
          <button onClick={dequeueFromQueue}>Dequeue</button>
        </div>
        {renderResults(queueResults)}
      </div>

      <div className="section">
        <h2>Stack (LIFO)</h2>
        <div className="controls">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
          />
          <button onClick={pushToStack}>Push</button>
          <button onClick={popFromStack}>Pop</button>
        </div>
        {renderResults(stackResults)}
      </div>
    </div>
  );
};

export default App;