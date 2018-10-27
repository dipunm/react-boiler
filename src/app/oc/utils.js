import qs from 'query-string'

export const dangerousHtml = (html) => {
  return { __html: html };
};

export const buildUrl = (name, version, params) => {
  return `https://oc-registry.opentable.com/v2/${name}/${version}?${qs.stringify(params)}`.replace('"', '&quot;');
}

export const shallowCompare = (a, b) => {
  for (let i in a) if (!(i in b)) return false;
  for (let i in b) if (a[i] !== b[i]) return false;
  return true;
}
