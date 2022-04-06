import { useCallback, useEffect } from 'react';
import { PreloadedQuery, PreloadFetchPolicy, useQueryLoader } from 'react-relay';

import type { UseQueryLoaderLoadQueryOptions } from 'react-relay/relay-hooks/useQueryLoader';
import type { GraphQLTaggedNode, OperationType, VariablesOf } from 'relay-runtime';

export type GenerateQueryLoaderProps<TQuery extends OperationType> = {
  queryRef: PreloadedQuery<TQuery>;
  refresh: (fetchPolicy?: PreloadFetchPolicy) => void;
};

type Props<T extends OperationType> = {
  variables: VariablesOf<T>;
  options?: UseQueryLoaderLoadQueryOptions;
  query: GraphQLTaggedNode;
  render: (queryRef: PreloadedQuery<T>, refresh: (policy?: PreloadFetchPolicy) => void) => JSX.Element;
};
/**
 * 中でpreloadを行いつつ、レンダリング可能になったらrender関数でレンダリングする
 * useQueryLoaderはloadQueryが一度も呼ばれないとqueryRefがnullになるので、その事情を隠蔽するためにComponent化した
 *
 * やってることは実質useLazyLoadQueryだが、以下の事情でこちらを利用する
 * - queryRefがnon-serializable objectなのでnavigate時にpreloadが出来ない
 * - useLazyLoadQueryだとoperationがdisposeされず、コンポーネントのアンマウント後にload結果の参照が残り続ける
 *   - これによって一度ネットワークエラーなどが出てから復旧した後に戻ってきてもエラー画面のままになってしまう
 *
 * NOTE: variables,optionsはリテラルで利用することを前提としている
 * そのためこれらが変更されてもrefresh関数は変更されないので注意
 */
const GQLQueryLoader = <TQuery extends OperationType>({
  render,
  query,
  variables,
  options,
}: Props<TQuery>): JSX.Element | null => {
  const [queryRef, loadQuery] = useQueryLoader<TQuery>(query);

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
