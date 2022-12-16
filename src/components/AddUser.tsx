import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

type newUser = {
  email: string;
};

const AddUser = () => {
  const { user } = useAuth0();
  const newUserEmail = user?.email;
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);

  const API_URL_POST_USER = 'http://localhost:4000/api/users';

  useEffect(() => {
    if (newUserEmail) {
      //add user
      const newUser: newUser = { email: newUserEmail };
      const postNewUser = async () =>
        await fetch(API_URL_POST_USER, {
          method: 'POST',
          body: JSON.stringify(newUser),
          headers: { 'Content-Type': 'application/json' },
        });
      postNewUser();
      navigateRef.current('/');
    }
  }, [newUserEmail]);

  return <div>Loading...</div>;
};

export default AddUser;
