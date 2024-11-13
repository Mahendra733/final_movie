import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Home } from './pages/Home';
import { Movie } from './pages/Movie';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Navbar />
      <main className="min-h-screen bg-gray-100 pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;