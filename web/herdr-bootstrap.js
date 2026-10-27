const e = new URL(window.__HERDR_ENTRY__ || "/builds/0.23.3-477-aadeb23c63e96a6c/index.html", location);
  e.search = location.search;
  e.hash = location.hash;
  location.replace(e);
