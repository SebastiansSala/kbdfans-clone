export const fetchProducts = async () => {
  const res = await fetch("http://localhost:3000/api/products");

  if (!res.ok) {
    throw new Error("Something went wrong!");
  }
  return res.json();
};