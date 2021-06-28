import React from 'react';
import Page from '../components/page';
import UserContext from '../context/user-context';

const MainPage = () => {
  const [user] = React.useContext(UserContext);

  return (
    <Page>
      <div className="row">
        <h1 className="mt-5 mb-5">{`Hello, ${user.name || 'Guest'}!`}</h1>
      </div>
      <div className="row">
        <div className="col">
          <p className="lead">{`Name: ${user.name || 'Guest'}`}</p>
          <p className="lead">{`Last name: ${user.lastname || '-'}`}</p>
          <p className="lead">{`Email: ${user.email || '-'}`}</p>
        </div>
        <div className="col"><img src={`img/${user.role}.png`} alt={user.role} /></div>
      </div>
    </Page>
  );
};

export default MainPage;
