export const fetchSuggestions = async (searchTerm, signal) => {
  const result = await fetch(`http://localhost:3001/search?q=${searchTerm}`, {signal});
  const resultJson = await result.json()
  return resultJson;
};

export const fetchProductDetail = async (id) => {
  const result = await fetch(`http://localhost:3001/products/${id}`);
  const resultJson = await result.json()
  return resultJson;
};
