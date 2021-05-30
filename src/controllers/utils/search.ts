export type SearchQuery = {
  [key in string]: any;
};

export const buildSearchQuery = <T extends { [key: string]: any }>(
  asked: Partial<T>,
): Record<keyof T, any> => {
  const query: SearchQuery = {} as SearchQuery;
  Object.keys(asked).forEach((key: string) => {
    query[key] = asked[key];
  });
  return query as Record<keyof Partial<T>, any>;
};
