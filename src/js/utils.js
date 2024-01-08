export const isSearch = () => {
  return window.location.hash.includes('search/');
};

export const setRoute = (route = '') => {
  window.location.hash = route;
};

export const encodeHTML = (html) => {
  return html.replace(/[&<>'"]/g, 
  tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag]));
};
