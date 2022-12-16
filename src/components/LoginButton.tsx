import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <span onClick={() => loginWithRedirect()}>
      <h2>Log In</h2>
    </span>
  );
};

export default LoginButton;
