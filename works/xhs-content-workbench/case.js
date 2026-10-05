(() => {
  'use strict';

  const navigation = document.querySelector('[data-flow-tabs]');
  if (!navigation) return;

  const tabs = [...navigation.querySelectorAll('[data-step]')];
  const panels = [...document.querySelectorAll('[data-flow-panel]')];
  if (!tabs.length || tabs.length !== panels.length) return;
  if (tabs.some((tab) => !panels.some((panel) => panel.id === tab.dataset.step))) return;

  function selectTab(tab, moveFocus = false) {
    tabs.forEach((candidate) => {
      const selected = candidate === tab;
      candidate.setAttribute('aria-selected', String(selected));
      candidate.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((panel) => {
      panel.hidden = panel.id !== tab.dataset.step;
    });
    if (moveFocus) tab.focus();
  }

  document.querySelectorAll('[data-open-details]').forEach((link) => {
    link.addEventListener('click', () => {
      const details = document.getElementById(link.dataset.openDetails);
      if (details) details.open = true;
    });
  });

  navigation.setAttribute('role', 'tablist');
  tabs.forEach((tab, index) => {
    const panel = panels.find((candidate) => candidate.id === tab.dataset.step);
    tab.id = `flow-tab-${index + 1}`;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panel.id);
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    panel.tabIndex = 0;

    tab.addEventListener('click', (event) => {
      event.preventDefault();
      selectTab(tab);
    });

    tab.addEventListener('keydown', (event) => {
      if (event.key === ' ') {
        event.preventDefault();
        selectTab(tab);
        return;
      }
      let target;
      if (event.key === 'ArrowRight') target = tabs[(index + 1) % tabs.length];
      if (event.key === 'ArrowLeft') target = tabs[(index - 1 + tabs.length) % tabs.length];
      if (event.key === 'Home') target = tabs[0];
      if (event.key === 'End') target = tabs[tabs.length - 1];
      if (!target) return;
      event.preventDefault();
      selectTab(target, true);
    });
  });

  const linkedTab = tabs.find((tab) => `#${tab.dataset.step}` === window.location.hash);
  selectTab(linkedTab || tabs[0]);
  document.documentElement.classList.add('js');
})();
