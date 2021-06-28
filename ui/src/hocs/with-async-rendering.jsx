import React from 'react';
import PropTypes from 'prop-types';
import LoadingPage from '../pages/loading-page';
import ErrorPage from '../pages/error-page';

const ActionStatus = {
  STARTED: 'started',
  COMPLETED: 'completed',
  FAILED: 'failed',
};

const WithAsyncRendering = ({ action, Component }) => {
  const [data, setData] = React.useState(ActionStatus.STARTED);

  React.useEffect(async () => {
    try {
      const actionData = await action();
      setData(actionData || ActionStatus.COMPLETED);
    } catch (err) {
      setData(ActionStatus.FAILED);
    }
  }, [1]);

  switch (data) {
    case ActionStatus.FAILED:
      return <ErrorPage />;

    case ActionStatus.STARTED:
      return <LoadingPage />;

    case ActionStatus.COMPLETED:
      return <Component />;

    default:
      return <Component data={data} />;
  }
};

WithAsyncRendering.propTypes = {
  action: PropTypes.func.isRequired,
  Component: PropTypes.elementType.isRequired,
};

export default WithAsyncRendering;
