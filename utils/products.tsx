export const getProducts = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/products")
    if (!res.ok) {
      throw new Error("Failed to fetch data")
    }
    return res.json()
  } catch (error) {
    console.error(error)
    return []
  }
}
