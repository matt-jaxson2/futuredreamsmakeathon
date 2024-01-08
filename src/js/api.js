export class MakeathonAPI {
  async fetchData(url, options = {}) {
    try {
      const response = await fetch(`http://${window.location.hostname}:5174/${url}`, {
        ...options
      });
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('MakeathonAPI Error:', error);
    }
  }
}
