import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Feed.css";  // Optional: Add any styles for the Feed page

export default function Feed() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Make an API call to get all users
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        setUsers(res.data.users);  // Assuming response is { users: [...] }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch users");
        setLoading(false);
      });
  }, []);

  return (
    <div className="feed-container">
      <h1 className="feed-title">Users Feed</h1>

      {loading && <p className="loading-text">Loading users...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && users.length === 0 && (
        <p className="no-users">No users available.</p>
      )}

      {!loading && !error && users.length > 0 && (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id} className="user-item">
              <p className="user-name">{user.name}</p>
              <p>{user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
