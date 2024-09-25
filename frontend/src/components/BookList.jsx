import React from 'react';
import BookDetails from './BookDetails';

const BookList = ({ books }) => {
  return (
    <div>
      {books.map((book) => (
        <BookDetails key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
