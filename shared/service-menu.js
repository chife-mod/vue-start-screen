/* Renders the floating chip navigator. Reads config from globals:
   window.PREVIEW_CONCEPTS = [{ id, label, href }, ...]
   window.PREVIEW_CURRENT  = 'v1'
   window.PREVIEW_HOME     = '/'
*/
(function () {
  function render() {
    var concepts = window.PREVIEW_CONCEPTS || [];
    var current  = window.PREVIEW_CURRENT  || '';
    if (!concepts.length) return;

    var nav = document.createElement('nav');
    nav.className = 'service-menu';
    nav.setAttribute('aria-label', 'Concept navigator');

    concepts.forEach(function (c) {
      if (c.id === current) {
        var span = document.createElement('span');
        span.className = 'service-menu__current';
        span.textContent = c.label;
        nav.appendChild(span);
      } else {
        var a = document.createElement('a');
        a.href = c.href;
        a.textContent = c.label;
        nav.appendChild(a);
      }
    });

    document.body.appendChild(nav);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
