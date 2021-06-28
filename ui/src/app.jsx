import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { getRootRoute } from './utils';
import RegisterPage from './pages/register-page';
import LoginPage from './pages/login-page';
import MainPage from './pages/main-page';
import Logout from './components/logout';
import NotFoundPage from './pages/not-found-page';
import UserContext from './context/user-context';
import { DEFAULT_USER } from './const';
import { userService } from './user-service';

const App = () => {
  const [user, setUser] = React.useState(DEFAULT_USER);
  React.useEffect(async () => {
    setUser(await userService.auth());
  }, [1]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <BrowserRouter basename={getRootRoute()}>
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/" component={MainPage} exact />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

App.propTypes = {};
App.defaultProps = {};

export default App;
