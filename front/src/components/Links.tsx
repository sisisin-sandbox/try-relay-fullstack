import React from 'react';
import { useRelayEnvironment } from 'react-relay';
import { Link } from 'react-router-dom';
import { getUserId, setUserId } from '../RelayEnvironment';

const userId = getUserId();
const invalid = (id: string) => Number.isNaN(parseInt(id)) || Number.isNaN(Number(id));
export const Links = () => {
  const env = useRelayEnvironment();
  const [isInvalidUserId, setIsInvalidUserId] = React.useState(invalid(userId));
  const printRelayStore = () => {
    console.log(env.getStore().getSource().toJSON());
  };
  return (
    <div>
      <hr></hr>
      <Link to="/">Home</Link> <Link to="/posts">Posts</Link>
      <hr></hr>
      <div>
        <button onClick={printRelayStore}>debug</button>
      </div>
      <div>
        userId:{' '}
        <input
          type="text"
          onChange={(e) => {
            const maybeNum = e.target.value;
            setIsInvalidUserId(invalid(maybeNum));
            setUserId(maybeNum);
          }}
          defaultValue={userId}
        />{' '}
        {isInvalidUserId && <span>invalid userId!!</span>}
      </div>
    </div>
  );
};
