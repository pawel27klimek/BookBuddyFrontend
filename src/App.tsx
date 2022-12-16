import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookList from './pages/BookList';
import Navbar from './components/Navbar';
import { Auth0Provider } from '@auth0/auth0-react';
import BookDetails from './pages/BookDetails';
import AddNewBookForm from './pages/AddNewBookForm';
import FavouritiesList from './pages/FavouritiesList';
import AddUser from './components/AddUser';
import { Pages } from './styles/Pages';

function App() {
  return (
    <div className="App">
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN!}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
        redirectUri={'http://localhost:3000/adduser'}
      >
        <BrowserRouter>
          <Navbar />
          <Pages>
            <Routes>
              <Route path="/" element={<BookList />} />
              <Route path="/:id" element={<BookDetails />} />
              <Route path="/newbook" element={<AddNewBookForm />} />
              <Route path="/favourities" element={<FavouritiesList />} />
              <Route path="/adduser" element={<AddUser />} />
            </Routes>
          </Pages>
        </BrowserRouter>
      </Auth0Provider>
    </div>
  );
}

export default App;
