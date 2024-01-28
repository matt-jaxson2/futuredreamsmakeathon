export class Router {
  constructor(routes) {
    this.routes = routes;
    this.handleRouteChange = this.handleRouteChange.bind(this);
    window.addEventListener('hashchange', this.handleRouteChange);
    window.addEventListener('load', this.handleRouteChange); // Handle initial non-hash route
    this.handleRouteChange();
  }

  handleRouteChange() {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash.slice(1);
    let routeHandler;

    // Check for non-hash route
    if (currentPath in this.routes) {
      routeHandler = this.routes[currentPath];
    }

    // Check for hash route
    if (!routeHandler) {
      routeHandler = this.routes[currentHash];

      // Check for wildcard hash route
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
    }

    const defaultRouteHandler = this.routes.default;

    if (routeHandler && typeof routeHandler === 'function') {
      routeHandler();
    } else if (defaultRouteHandler && typeof defaultRouteHandler === 'function') {
      defaultRouteHandler();
    } else {
      console.error(`No route found for path/hash: ${currentPath}/${currentHash}`);
    }
  }
}
