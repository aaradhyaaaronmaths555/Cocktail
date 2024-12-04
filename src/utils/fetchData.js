// fetchData.js

export const cocktailOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '865d88a799msh6757b1546ca4fd1p14e56djsn8ce79e2f3163',
      'X-RapidAPI-Host': 'cocktail-by-api-ninjas.p.rapidapi.com'
    }
  };
  
  export const fetchData = async (url, options) => {
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };