export class MakeathonAPI {
  async fetchData(url, cacheKey, clearCache = false, options = {}) {
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData && !clearCache) {
      return JSON.parse(cachedData);
    } else {
      try {
        const response = await fetch(`${url}`, {
          ...options
        });
        const data = await response.json();

        localStorage.setItem(cacheKey, JSON.stringify(data));

        return data;
      } catch (error) {
        console.error('MakeathonAPI Error:', error);
      }
    }
  }
}
