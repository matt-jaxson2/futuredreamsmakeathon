export class Router {
  constructor(routes) {
    this.routes = routes;
    this.handleRouteChange = this.handleRouteChange.bind(this);
    window.addEventListener('hashchange', this.handleRouteChange);
    this.handleRouteChange();
  }

  handleRouteChange() {
    const currentHash = window.location.hash.slice(1);
    let routeHandler = this.routes[currentHash];

    if (!routeHandler) {
      const wildcardRoutes = Object.keys(this.routes).filter(route => route.includes('*'));
      for (const wildcardRoute of wildcardRoutes) {
        const wildcardRegex = new RegExp('^' + wildcardRoute.replace('*', '.*') + '$');
        if (wildcardRegex.test(currentHash)) {
          routeHandler = this.routes[wildcardRoute];
          break;
        }
      }
    }

    const defaultRouteHandler = this.routes.default;

    if (routeHandler && typeof routeHandler === 'function') {
      routeHandler();
    } else if (defaultRouteHandler && typeof defaultRouteHandler === 'function') {
      defaultRouteHandler();
    } else {
      console.error(`No route found for hash: ${currentHash}`);
    }
  }
}
