export const getData = async (url) => {
  try {
    const marketData = await fetch(url);
    const data = await marketData.json();
    return data
  } catch (err) {
    console.log(err.message);
  }
}