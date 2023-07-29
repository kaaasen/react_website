import React, { useEffect, useState } from 'react';
import './App.css';
import './Guestbook.css';

const Guestbook = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const storedEntries = localStorage.getItem('guestbookEntries');
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }

    fetchEntries();
  }, []);

  useEffect(() => {
    localStorage.setItem('guestbookEntries', JSON.stringify(entries));
  }, [entries]);

  const fetchEntries = () => {
    fetch('http://localhost:3001/api/guestbook')
      .then((response) => response.json())
      .then((data) => {
        setEntries(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEntry = {
      name,
      message,
      timestamp: new Date().toISOString(), // Add timestamp to the new entry
    };

    fetch('http://localhost:3001/api/guestbook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Response from the server
        // Handle any additional logic or UI updates
        fetchEntries(); // Fetch the updated entries after successful submission
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle errors
      });

    setEntries([newEntry, ...entries]);
    setName('');
    setMessage('');
  };

  return (
    <div className="container">
      <h2 className="mt-5">Guestbook</h2>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message:
          </label>
          <textarea
            id="message"
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      <div className="mt-5">
        <h3>Entries:</h3>
        {entries.map((entry, index) => (
          <div key={index} className="border rounded p-3 mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <h4>{entry.name}</h4>
              </div>
              <div className="signature">
                <small>
                  {entry.name} |{' '}
                  {new Date(entry.timestamp).toLocaleString('no-NB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </small>
              </div>
            </div>
            <p>{entry.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guestbook;
