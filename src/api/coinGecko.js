const BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = "CG-9pkawdGn7LbgV5KjLxuNwB2Y";

export const fetchCryptos = async () => {
  const response = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&x_cg_demo_api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cryptos");
  }

  return response.json();
};