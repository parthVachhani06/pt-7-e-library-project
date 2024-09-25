import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookForm from './BookForm';
import { Button, Container, List, ListItem, ListItemText, Typography, Box } from '@mui/material';

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddNewBook = () => {
    setSelectedBookId(null);
    setShowForm(true);
  };

  const handleEditBook = (bookId) => {
    setSelectedBookId(bookId);
    setShowForm(true);
  };

  const handleFormSuccess = (updatedBook) => {
    setShowForm(false);  // Close the form
    setBooks(prevBooks =>
      prevBooks.map(book => book._id === updatedBook._id ? updatedBook : book)  // Update the specific book in the list
    );
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        E-Library Book Management
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Button variant="contained" color="primary" onClick={handleAddNewBook}>
          Add New Book
        </Button>
      </Box>

      {showForm && (
        <Box sx={{ mb: 3 }}>
          <BookForm id={selectedBookId} onSuccess={handleFormSuccess} />
        </Box>
      )}

      <Typography variant="h4" component="h2" gutterBottom>
        Book List
      </Typography>

      <List>
        {books.map((book) => (
          <ListItem key={book._id} sx={{ borderBottom: '1px solid #ccc', py: 2 }}>
            <ListItemText
              primary={`${book.title} by ${book.author}`}
              secondary={book.genre}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleEditBook(book._id)}
              sx={{ ml: 2 }}
            >
              Edit
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default BookManagement;
