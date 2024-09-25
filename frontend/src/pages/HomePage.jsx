import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import BookList from '../components/BookList';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const handleCreateBook = () => {
    navigate('/book'); // Assumes a route for book creation exists
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Book Library
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateBook}
        >
          Create Book
        </Button>
      </Box>
      <BookList books={books} />
    </Container>
  );
};

export default HomePage;
