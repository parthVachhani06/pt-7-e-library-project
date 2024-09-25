import React from 'react';
import { api } from '../services/api';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const BookDetails = ({ book }) => {
  const handleBorrow = async () => {
    try {
      await api.put(`/books/borrow/${book._id}`);
      alert('Book borrowed successfully');
    } catch (error) {
      alert('Error borrowing book');
    }
  };

  const handleReturn = async () => {
    try {
      await api.put(`/books/return/${book._id}`);
      alert('Book returned successfully');
    } catch (error) {
      alert('Error returning book');
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: '1rem auto', padding: '1rem' }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {book.title}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Author: {book.author}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Genre: {book.genre}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleBorrow} 
            sx={{ mr: 1 }}
          >
            Borrow
          </Button>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={handleReturn}
          >
            Return
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BookDetails;
