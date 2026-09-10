// Accessible tab switching for [role="tablist"] groups.
// No dependencies. Supports click and left/right arrow keys.
(function () {
  function setupTabList(list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));

    function activate(tab) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute('aria-selected', String(selected));
        t.tabIndex = selected ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !selected;
      });
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { activate(tab); });
      tab.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
        if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (next) {
          e.preventDefault();
          next.focus();
          activate(next);
        }
      });
    });
  }

  document.querySelectorAll('[role="tablist"]').forEach(setupTabList);
})();
