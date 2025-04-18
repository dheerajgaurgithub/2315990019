import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TopUsers.css';

export default function TopUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(res => {
        console.log(res.data);
        setUsers(res.data.users);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch users');
        setLoading(false);
      });
  }, []);

  return (
    <div className="top-users-container">
      <h1 className="top-users-title">🏆 Top Users</h1>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <ul className="user-list">
          {users.map(user => (
            <li key={user.id} className="user-card">
              <p className="user-name">{user.name}</p>
              <p className="user-comments">{user.commentCount ?? 0} comments</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
