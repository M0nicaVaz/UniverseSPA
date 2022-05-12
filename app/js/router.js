export class Router {
  routes = {};

  add(pageName, path, bgPath) {
    this.routes[pageName] = path;
    this.bg = bgPath;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, '', event.target.href);

    this.handle();
  }

  handle() {
    const { pathname } = window.location;
    const route = this.routes[pathname] || this.routes[404];
    this.changeBg();

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector('#root').innerHTML = html;
      });
  }

  changeBg() {
    const { pathname } = window.location;

    const { body } = document;

    switch (pathname) {
      case '/exploracao':
        body.className = 'explore';
        break;

      case '/universo':
        body.className = 'universe';
        break;

      case '/':
        body.className = 'home';
        break;

      default:
        body.className = '';
        break;
    }
  }
}
