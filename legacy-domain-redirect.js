(() => {
  if (window.location.hostname !== "heyrafiki.mintlify.app") return;

  const destination = new URL(window.location.pathname, "https://docs.heyrafiki.space");
  destination.search = window.location.search;
  destination.hash = window.location.hash;
  window.location.replace(destination.href);
})();
