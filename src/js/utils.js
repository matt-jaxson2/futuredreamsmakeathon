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

export const removeClassesWithPrefix = (element, prefix) => {
  element.classList.forEach(className => {
      if (className.startsWith(prefix)) {
          element.classList.remove(className);
      }
  });
};
