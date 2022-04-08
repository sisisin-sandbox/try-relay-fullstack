// @flow
import { useCallback, useEffect } from 'react';
import { type PreloadedQuery, type PreloadFetchPolicy, useQueryLoader } from 'react-relay';

import type { UseQueryLoaderLoadQueryOptions } from 'react-relay/relay-hooks/useQueryLoader';
import type { GraphQLTaggedNode, OperationType, VariablesOf } from 'relay-runtime';

export type GenerateQueryLoaderProps<TQuery: OperationType> = {
  queryRef: PreloadedQuery<TQuery>,
  refresh: (fetchPolicy?: PreloadFetchPolicy) => void,
};

type Props<T: OperationType> = {
  variables: VariablesOf<T>,
  options?: UseQueryLoaderLoadQueryOptions,
  query: GraphQLTaggedNode,
  render: (queryRef: PreloadedQuery<T>, refresh: (policy?: PreloadFetchPolicy) => void) => React$Node,
};

const GQLQueryLoader = <TQuery: OperationType>({
  render,
  query,
  variables,
  options,
}: Props<TQuery>): React$Node | null => {
  const [queryRef, loadQuery] = useQueryLoader(query);

  const load = useCallback(
    (fetchPolicy?: PreloadFetchPolicy) => {
      const opts = fetchPolicy ? { ...options, fetchPolicy } : options;
      loadQuery(variables, opts);
    },
    [loadQuery],
  );

  useEffect(() => {
    load();
  }, [load]);

  return queryRef == null ? null : render(queryRef, load);
};

export default GQLQueryLoader;
