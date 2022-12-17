import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { InputBox, NewBookForm } from '../styles/AddNewBookStyle';

type newBook = {
  title: string;
  publisher: string;
  category: string;
  language: string;
  yearOfPublication: number | string;
  imgUrl: string;
  description: string;
  nrOfPages: number | string;
  author: string;
  creatorUserEmail: string | undefined;
};

const AddNewBookForm = () => {
  const { user } = useAuth0();
  const [newBook, setNewBook] = useState<newBook>({
    title: '',
    author: '',
    publisher: '',
    category: '',
    language: '',
    yearOfPublication: '',
    imgUrl: '',
    description: '',
    nrOfPages: '',
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
    <NewBookForm onSubmit={(event) => handleSubmit(event)}>
      <InputBox>
        <TextField
          inputProps={{ maxLength: 50 }}
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
      </InputBox>

      <InputBox>
        <TextField
          inputProps={{ maxLength: 30 }}
          className="author"
          label="Author"
          variant="outlined"
          type="text"
          name="author"
          value={newBook.author}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(event);
          }}
          autoComplete="off"
        />
      </InputBox>
      <InputBox>
        <TextField
          inputProps={{ maxLength: 30 }}
          className="publisher"
          label="Publisher"
          variant="outlined"
          type="text"
          name="publisher"
          value={newBook.publisher}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(event);
          }}
          autoComplete="off"
        />
      </InputBox>
      <InputBox>
        <TextField
          inputProps={{ maxLength: 30 }}
          className="category"
          label="Category"
          variant="outlined"
          type="text"
          name="category"
          value={newBook.category}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(event);
          }}
          autoComplete="off"
        />
      </InputBox>
      <InputBox>
        <TextField
          inputProps={{ maxLength: 20 }}
          className="language"
          label="Language"
          variant="outlined"
          type="text"
          name="language"
          value={newBook.language}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(event);
          }}
          autoComplete="off"
        />
      </InputBox>
      <InputBox>
        <TextField
          className="year-of-publication"
          label="Year of publication"
          variant="outlined"
          type="number"
          name="yearOfPublication"
          value={newBook.yearOfPublication}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(event);
          }}
          autoComplete="off"
          InputProps={{
            inputProps: { min: 0 },
          }}
        />
      </InputBox>
      <InputBox>
        <TextField
          className="link-to-cover-image"
          label="Link to cover image"
          variant="outlined"
          type="text"
          name="imgUrl"
          value={newBook.imgUrl}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(event);
          }}
          autoComplete="off"
        />
      </InputBox>
      <InputBox>
        <TextField
          className="description"
          label="Description"
          variant="outlined"
          type="text"
          name="description"
          value={newBook.description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(event);
          }}
          autoComplete="off"
        />
      </InputBox>
      <InputBox>
        <TextField
          className="nr-of-pages"
          label="Number of pages"
          variant="outlined"
          type="number"
          name="nrOfPages"
          value={newBook.nrOfPages}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(event);
          }}
          autoComplete="off"
          InputProps={{
            inputProps: { min: 0 },
          }}
        />
      </InputBox>

      <Button variant="outlined" type="submit" sx={{ marginTop: '20px' }}>
        Add new book
      </Button>
    </NewBookForm>
  );
};

export default AddNewBookForm;
