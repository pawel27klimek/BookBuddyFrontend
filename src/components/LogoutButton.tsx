import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout } = useAuth0();
  return <span onClick={() => logout()}>Log Out</span>;
};

export default LogoutButton;
