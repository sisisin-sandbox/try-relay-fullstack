// @flow

import { graphql } from 'react-relay';
import { type PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks';
import { Link } from 'react-router-dom';
import GQLQueryLoader, { type GenerateQueryLoaderProps } from '../Loader';
import { PostList } from './PostList';
import { type PostsQuery } from './__generated__/PostsQuery.graphql';
import * as React from 'react'

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
      <div>
        <Link to="/posts/new">new post</Link>
      </div>
    </div>
  );
};

export const Posts: React.AbstractComponent<{}> = ()=> {
  return (
    <GQLQueryLoader
      variables={{}}
      query={operation}
      render={(queryRef: PreloadedQuery<PostsQuery>, refresh) => <Content queryRef={queryRef} refresh={refresh} />}
    ></GQLQueryLoader>
  );
}
