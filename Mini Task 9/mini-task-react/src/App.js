import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [apiData, setApiData] = useState([]);

  // 1. Fetch data from an external API (Example: JSONPlaceholder)
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setApiData(response.data));
  }, []);

  // 2. Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop page from refreshing
    await axios.post('http://localhost:5000/add-user', formData);
    alert("Data sent to MongoDB!");
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Submit Data to Mongo</h2>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="Name" 
          onChange={(e) => setFormData({...formData, name: e.target.value})} 
        />
        <input 
          placeholder="Email" 
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
        />
        <button type="submit">Submit</button>
      </form>

      <hr />
      <h2>Fetched API Data</h2>
      <ul>
        {apiData.slice(0, 5).map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
    </div>
  );
}

export default App;