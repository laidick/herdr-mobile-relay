const e = new URL(window.__HERDR_ENTRY__ || "/builds/0.23.2-473-1067916656fbc494/index.html", location);
  e.search = location.search;
  e.hash = location.hash;
  location.replace(e);
