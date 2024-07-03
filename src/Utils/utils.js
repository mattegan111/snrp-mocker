const convertTitleToSnake = (str) => {
  return str.toLowerCase().split(' ').join('_');
};

const convertSnakeToTitle = (str) => {
  return str
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export { convertTitleToSnake, convertSnakeToTitle };
