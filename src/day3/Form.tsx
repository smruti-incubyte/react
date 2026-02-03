import { useState } from 'react';

const Form = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Field required');
      return;
    }

    alert(`Hello, ${name}!`);
    setName('');
    setError('');
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h2 style={styles.title}>Form</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError('');
        }}
        placeholder="Enter your name"
        style={styles.input}
      />
      {error && <p style={styles.error}>{error}</p>}
      <button type="submit" style={styles.button}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
      >
        Submit
      </button>
    </form>
  );
};

const styles: Record<string, React.CSSProperties> = {
  form: {
    padding: '2rem',
    maxWidth: '400px',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center',
    color: '#0ed46a',
    marginBottom: '1.5rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    border: '2px solid #ddd',
    borderRadius: '4px',
    marginBottom: '1rem',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  error: {
    color: '#dc3545',
    fontSize: '0.875rem',
    marginTop: '-0.75rem',
    marginBottom: '1rem',
  },
};

export default Form;
