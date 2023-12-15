export const resetGridItems = () => {
  document.querySelectorAll('.image-grid__item').forEach(element => {
    element.classList.remove('image-grid__item--highlighted');
  });
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
