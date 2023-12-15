export class MakeathonAPI {
    async fetchData() {
        try {
            const response = await fetch(`http://${window.location.hostname}:5174/data`);
            const data = await response.json();
            return data;
          } catch (error) {
            console.error('Error:', error);
          }
    }
}
