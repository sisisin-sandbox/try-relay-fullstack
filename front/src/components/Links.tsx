import { useRelayEnvironment } from 'react-relay';
import { Link } from 'react-router-dom';

export const Links = () => {
  const env = useRelayEnvironment();
  const printRelayStore = () => {
    console.log(env.getStore().getSource().toJSON());
  };
  return (
    <div>
      <hr></hr>
      <Link to="/">Home</Link> <Link to="/posts">Posts</Link>
      <div>
        <button onClick={printRelayStore}>debug</button>
      </div>
    </div>
  );
};
