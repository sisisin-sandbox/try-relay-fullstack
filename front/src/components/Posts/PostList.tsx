import { graphql } from 'react-relay';
import { useFragment } from 'react-relay/hooks';
import { Link } from 'react-router-dom';
import { PostListFragment$key } from './__generated__/PostListFragment.graphql';

const operation = graphql`
  fragment PostListFragment on Query
  @argumentDefinitions(first: { type: "Int", defaultValue: 30 }, after: { type: "String" }) {
    posts(first: $first) @connection(key: "PostList_posts") {
      edges {
        node {
          id
          postId
          userId
          title
          body
        }
      }
    }
  }
`;

type Props = {
  queryRef: PostListFragment$key;
};
export const PostList = ({ queryRef }: Props) => {
  const data = useFragment(operation, queryRef);

  return (
    <div className="App">
      <div>
        <ul>
          {data.posts.edges.map((edge) => {
            if (edge == null) return null;
            const { node } = edge;
            return (
              <li key={node.id}>
                <Link to={`/posts/${node.postId}`}>
                  User: {node.userId},title: {node.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
