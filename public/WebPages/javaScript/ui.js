function ensureToastRoot() {
  let toastRoot = document.getElementById('toast-root');

  if (!toastRoot) {
    toastRoot = document.createElement('div');
    toastRoot.id = 'toast-root';
    toastRoot.className = 'toast-root';
    document.body.appendChild(toastRoot);
  }

  return toastRoot;
}

function showToast(message, type = 'info') {
  const toastRoot = ensureToastRoot();
  const toast = document.createElement('div');

  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toastRoot.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('is-visible');
  });

  setTimeout(() => {
    toast.classList.remove('is-visible');
    setTimeout(() => toast.remove(), 220);
  }, 2600);
}
