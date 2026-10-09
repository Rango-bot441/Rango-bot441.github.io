(() => {
  'use strict';
  const local = ['localhost', '127.0.0.1', '::1', '[::1]'].includes(window.location.hostname)
    || window.location.protocol === 'file:';
  if (!local) return;

  // Only local previews point to a local service; public readers keep the page anchors.
  document.querySelectorAll('[data-local-tool]').forEach(link => {
    link.href = 'http://127.0.0.1:4318/';
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = '打开本地工具 ↗';
    link.setAttribute('aria-label', '打开本地工具，仅限本机已启动服务，在新窗口打开');
  });
  const note = document.querySelector('[data-access-note]');
  if (note) note.textContent = '本地入口仅适用于已启动工作台服务的本机。此详情页不提交稿件，也不调用模型。';
})();
