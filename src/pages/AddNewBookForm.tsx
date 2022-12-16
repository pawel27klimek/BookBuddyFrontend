import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';

type newBook = {
  title: string;
  publisher: string;
  category: string;
  language: string;
  yearOfPublication: number;
  imgUrl: string;
  description: string;
  nrOfPages: number;
  author: string;
  creatorUserEmail: string | undefined;
};

const AddNewBookForm = () => {
  const { user } = useAuth0();
  const [newBook, setNewBook] = useState<newBook>({
    title: '',
    publisher: '',
    category: '',
    language: '',
    yearOfPublication: 1999,
    imgUrl: '',
    description: '',
    nrOfPages: 1,
    author: '',
    creatorUserEmail: user?.email,
  });
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBook((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const addBook = async () => {
      const API_URL = 'http://localhost:4000/api/books';
      const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(newBook),
        headers: { 'Content-Type': 'application/json' },
      });
      const json = await response.json();
      if (response.ok) {
        setNewBook({
          title: '',
          publisher: '',
          category: '',
          language: '',
          yearOfPublication: 0,
          imgUrl: '',
          description: '',
          nrOfPages: 0,
          author: '',
          creatorUserEmail: '',
        });
      }
    };
    addBook();
    navigate('/');
  };

  return (
    <div className="page-container">
      <form onSubmit={(event) => handleSubmit(event)}>
        <h3>Add a new book</h3>
        {/* <label> */}
        {/* Title: */}
        <TextField
          inputProps={{ maxLength: 30 }}
          className="title"
          label="Title"
          variant="outlined"
          type="text"
          name="title"
          value={newBook.title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(event);
          }}
          autoComplete="off"
        />
        {/* <input
            type="text"
            name="title"
            value={newBook.title}
            onChange={(event) => {
              handleChange(event);
            }}
          /> */}
        {/* </label> */}
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={newBook.author}
            onChange={(event) => {
              handleChange(event);
            }}
          />
        </label>
        <label>
          Publisher:
          <input
            type="text"
            name="publisher"
            value={newBook.publisher}
            onChange={(event) => {
              handleChange(event);
            }}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={newBook.category}
            onChange={(event) => {
              handleChange(event);
            }}
          />
        </label>
        <label>
          Language:
          <input
            type="text"
            name="language"
            value={newBook.language}
            onChange={(event) => {
              handleChange(event);
            }}
          />
        </label>
        <label>
          Year of publication:
          <input
            type="number"
            name="yearOfPublication"
            value={newBook.yearOfPublication}
            onChange={(event) => {
              handleChange(event);
            }}
          />
        </label>
        <label>
          Link to cover image:
          <input
            type="text"
            name="imgUrl"
            value={newBook.imgUrl}
            onChange={(event) => {
              handleChange(event);
            }}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={newBook.description}
            onChange={(event) => {
              handleChange(event);
            }}
          />
        </label>
        <label>
          Nr of pages:
          <input
            type="number"
            name="nrOfPages"
            value={newBook.nrOfPages}
            onChange={(event) => {
              handleChange(event);
            }}
          />
        </label>

        <button type="submit">Add new book</button>
      </form>
    </div>
  );
};

export default AddNewBookForm;
