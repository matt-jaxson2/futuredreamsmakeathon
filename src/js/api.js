export class MakeathonAPI {
  async fetchData(url, options = {}) {
    const cachedData = sessionStorage.getItem(url);

    if (cachedData && !clearCache) {
      return JSON.parse(cachedData);
    } else {
      try {
        const response = await fetch(`${url}`, {
          ...options
        });
        const data = await response.json();

        sessionStorage.setItem(url, JSON.stringify(data));

        return data;
      } catch (error) {
        console.error('MakeathonAPI Error:', error);
      }
    }
  }
}
