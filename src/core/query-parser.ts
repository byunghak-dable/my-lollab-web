export const parseQuery = (queryString?: string) => {
  if (!queryString) return null;
  const params: MutableObject = {};
  const splitedDataList = queryString.split('&');

  splitedDataList.map((singleDataInString) => {
    const splitedData = singleDataInString.split(/\=(.+)/, 2);
    params[splitedData[0]] = splitedData[1];
  });
  return params;
};

export const makeQuery = (queryObj?: MutableObject) => {
  if (!queryObj) return '';
  let query = '?';

  for (const key in queryObj) {
    if (query.length != 1) query += '&';
    query += `${key}=${queryObj[key]}`;
  }
  return query;
};
