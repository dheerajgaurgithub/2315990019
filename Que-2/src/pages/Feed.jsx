import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({}); // postId: [comments]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/feed')
      .then(res => {
        setPosts(res.data.posts);
        setLoading(false);

        // Fetch comments for each post
        res.data.posts.forEach(post => {
          axios.get(`http://localhost:5000/posts/${post.id}/comments`)
            .then(commentRes => {
              setComments(prev => ({ ...prev, [post.id]: commentRes.data.comments }));
            })
            .catch(err => {
              console.error('Failed to fetch comments for post', post.id);
            });
        });
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch feed');
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">📢 Latest Feed</h1>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && posts.length === 0 && <p className="text-center text-gray-400">No feed posts available.</p>}

      <ul className="space-y-6">
        {posts.map(post => (
          <li key={post.id} className="border p-4 rounded-xl shadow bg-blue-50">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mb-2">{post.body}</p>
            <p className="text-sm text-gray-500 mb-2">🕒 {new Date(post.createdAt).toLocaleString()}</p>

            <div className="mt-2 border-l-4 border-blue-300 pl-4">
              <p className="font-medium text-blue-600">Comments:</p>
              {comments[post.id]?.length > 0 ? (
                comments[post.id].map(comment => (
                  <p key={comment.id} className="text-sm">💬 <strong>{comment.name}:</strong> {comment.body}</p>
                ))
              ) : (
                <p className="text-sm text-gray-400">No comments</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
