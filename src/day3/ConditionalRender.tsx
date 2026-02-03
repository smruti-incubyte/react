import { useState } from 'react';
import Counter from './Counter';
import Form from './Form';

export default function ConditionalRender() {
  const [showCounter, setShowCounter] = useState(true);

  return (
    <div>
      <button onClick={() => setShowCounter(!showCounter)}>
        Toggle View
      </button>
      {showCounter ? <Counter /> : <Form />}
    </div>
  );
}
