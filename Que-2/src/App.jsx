import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopUsers from './pages/TopUsers';
import TrendingPosts from './pages/TrendingPosts';
import Feed from './pages/Feed';
import Header from './pages/Header'; // import header

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<TopUsers />} />
        <Route path="/trending" element={<TrendingPosts userId={1} />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </Router>
  );
}
