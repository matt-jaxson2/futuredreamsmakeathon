export class MakeathonAPI {
  searchResults(data, query) {
    return data.filter(item => {
      if (
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.message.toLowerCase().includes(query.toLowerCase())
      ) {
        return item;
      }
    });
  }

  setData(query, data) {
    if (query) {
      return this.searchResults(data, query);
    }

    return data;
  }

  async fetchData(params) {
    const { url, query, options = {} } = params;
    const cachedData = sessionStorage.getItem(url);

    if (cachedData) {
      const data = JSON.parse(cachedData);
      return this.setData(query, data);
    } else {
      try {
        const response = await fetch(url, {
          ...options
        });
        const data = await response.json();

        sessionStorage.setItem(url, JSON.stringify(data));

        return this.setData(query, data);
      } catch (error) {
        console.error('MakeathonAPI Error:', error);
      }
    }
  }
}
