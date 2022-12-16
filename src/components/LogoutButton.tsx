import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <div onClick={() => logout()}>
      <h2>Log Out</h2>
    </div>
  );
};

export default LogoutButton;
