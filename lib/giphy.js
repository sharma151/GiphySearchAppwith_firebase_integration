// lib/giphy.js
const GIPHY_API_KEY = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65'; // Replace with your GIPHY API key

export const searchGifs = async (query) => {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${GIPHY_API_KEY}&limit=10`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch GIFs from GIPHY');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
