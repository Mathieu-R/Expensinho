class Bootstrap {
  constructor() {
    this.installServiceWorker()
  }

  installServiceWorker () {
    if (process.env.NODE_ENV !== 'PRODUCTION') {
      return;
    }

    navigator.serviceWorker.register('/sw.js');
  }
}

window.addEventListener('load', _ => {
  if (!('customElements' in self)) {
    // tslint:disable-next-line: no-shadowed-variable
    return import('@webcomponents/custom-elements').then(_ => new Bootstrap());
  }

  new Bootstrap();
});
