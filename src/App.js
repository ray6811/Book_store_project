import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', price: '' });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get('http://localhost:8080/api/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error('Fetch error:', err));
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Convert price to number before sending
    const payload = {
      ...form,
      price: parseFloat(form.price)
    };

    axios.post('http://localhost:8080/api/books', payload)
      .then(() => {
        setForm({ title: '', author: '', price: '' });
        fetchBooks();
      })
      .catch(err => {
        console.error('Save error:', err);
        alert('Failed to save. Check backend logs.');
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📚 Book Store</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          <div className="col-md">
            <input type="text" className="form-control" placeholder="Title" required
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="col-md">
            <input type="text" className="form-control" placeholder="Author" required
              value={form.author}
              onChange={e => setForm({ ...form, author: e.target.value })} />
          </div>
          <div className="col-md">
            <input type="number" className="form-control" placeholder="Price" required step="0.01"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })} />
          </div>
          <div className="col-md">
            <button type="submit" className="btn btn-primary w-100">Add Book</button>
          </div>
        </div>
      </form>

      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th><th>Title</th><th>Author</th><th>Price (₹)</th>
          </tr>
        </thead>
        <tbody>
          {books.map(b => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
