import { Links } from '../Links';

import { graphql } from 'react-relay';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks';
import { PostsQuery } from './__generated__/PostsQuery.graphql';
import GQLQueryLoader, { GenerateQueryLoaderProps } from '../Loader';
import { PostList } from './PostList';

const operation = graphql`
  query PostsQuery {
    ...PostListFragment
  }
`;

type Props = GenerateQueryLoaderProps<PostsQuery>;
const Content = ({ refresh, queryRef }: Props) => {
  const data = usePreloadedQuery(operation, queryRef);

  return (
    <div className="App">
      <div>
        <PostList queryRef={data}></PostList>
      </div>
      <Links></Links>
    </div>
  );
};

export function Posts() {
  return (
    <GQLQueryLoader
      variables={{}}
      query={operation}
      render={(queryRef: PreloadedQuery<PostsQuery>, refresh) => <Content queryRef={queryRef} refresh={refresh} />}
    ></GQLQueryLoader>
  );
}
