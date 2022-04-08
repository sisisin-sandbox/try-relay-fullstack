import { graphql } from 'react-relay';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks';
import { useParams } from 'react-router-dom';
import GQLQueryLoader, { GenerateQueryLoaderProps } from '../Loader';
import { PostQuery } from './__generated__/PostQuery.graphql';

const operation = graphql`
  query PostQuery($id: ID!) {
    postById(id: $id) {
      id
      postId
      userId
      title
      body
    }
  }
`;

type Props = GenerateQueryLoaderProps<PostQuery>;
const Content = ({ refresh, queryRef }: Props) => {
  const data = usePreloadedQuery(operation, queryRef);

  if (data.postById == null) {
    return null;
  }
  const post = data.postById;
  return (
    <div>
      <h2>{post.title}</h2>
      <div>{post.body}</div>
    </div>
  );
};

export function Post() {
  const params = useParams();
  if (params.id == null) {
    return <>'No post id'</>;
  }
  return (
    <GQLQueryLoader
      variables={{ id: params.id }}
      query={operation}
      render={(queryRef: PreloadedQuery<PostQuery>, refresh) => <Content queryRef={queryRef} refresh={refresh} />}
    ></GQLQueryLoader>
  );
}
