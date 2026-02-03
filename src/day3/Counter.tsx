import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Counter</h2>
      <div style={styles.display}>
        <p style={styles.count}>{count}</p>
      </div>
      <div style={styles.buttonContainer}>
        <button
          onClick={() => setCount(count + 1)}
          style={styles.incrementBtn}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
        >
          Increment
        </button>
        <button
          onClick={() => setCount(count - 1)}
          style={styles.decrementBtn}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c82333')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#dc3545')}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '2rem',
    maxWidth: '400px',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center',
    color: '#0ed46a',
    marginBottom: '1.5rem',
  },
  display: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  count: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#007bff',
    margin: 0,
  },
  buttonContainer: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  incrementBtn: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  decrementBtn: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};

export default Counter;
