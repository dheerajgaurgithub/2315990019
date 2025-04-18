import React, { useState, useEffect } from "react";
import "./Feed.css"; // Add your CSS file

const Feed = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users data from the backend
    const fetchUserData = async () => {
      try {
        const usersResponse = await fetch("http://localhost:5000/users");
        const usersData = await usersResponse.json();
        setUsers(usersData.users); // Assuming the users data is under users array
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); 
  if (!users.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="feed-container">
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <img
            src={user.avatar || "http://example.com/default-avatar.jpg"} // Fallback avatar image
            alt={user.name}
            className="avatar"
          />
          <div className="user-info">
            <h6 className="username">{user.name}</h6>
            <p className="email">{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;