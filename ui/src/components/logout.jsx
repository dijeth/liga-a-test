import React from 'react';
import { Redirect } from 'react-router-dom';
import { userService } from '../user-service';
import WithAsyncRendering from '../hocs/with-async-rendering';
import userContext from '../context/user-context';
import { DEFAULT_USER } from '../const';

const action = async () => {
  await userService.logout();
};

const Logout = () => {
  const [, setUser] = React.useContext(userContext);

  React.useEffect(() => {
    setUser(DEFAULT_USER);
  }, [1]);

  return <Redirect to="/" />;
};

export default () => <WithAsyncRendering action={action} Component={Logout} />;
