module.exports = fileName => {
  if (typeof fileName !== 'string') return false;
  fileName = fileName.toLowerCase();
  return ['jpeg', 'jpg', 'png', 'webp', 'gif', 'svg', 'tiff'].reduce(
    (result, format) => {
      if (result) return true;
      if (fileName.endsWith('.' + format)) return true;
      return false;
    },
    false
  );
};
