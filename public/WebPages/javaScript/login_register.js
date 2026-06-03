function updateAuthNav() {
  const token = localStorage.getItem('token');
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');

  if (loginBtn) {
    loginBtn.style.display = token ? 'none' : '';
  }

  if (logoutBtn) {
    logoutBtn.style.display = token ? '' : 'none';
  }
}

async function sendJson(url, payload) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return { ok: response.ok, data };
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  updateAuthNav();

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value;

      try {
        const { ok, data } = await sendJson('/api/auth/login', { username, password });

        if (!ok || !data.success) {
          showToast(`Login failed: ${data.message}`, 'error');
          return;
        }

        localStorage.setItem('token', data.token);
        showToast('Signed in successfully.', 'success');
        window.location.href = 'Map.html';
      } catch (error) {
        showToast('Login failed: Unable to reach the server.', 'error');
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const username = document.getElementById('username').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password1').value;
      const confirmPassword = document.getElementById('password2').value;

      if (password !== confirmPassword) {
        showToast('Passwords do not match.', 'warning');
        return;
      }

      try {
        const { ok, data } = await sendJson('/api/auth/register', { username, password, email });

        if (!ok || !data.success) {
          showToast(`Registration failed: ${data.message}`, 'error');
          return;
        }

        showToast('Registration successful. Please sign in.', 'success');
        window.location.href = 'LogInPage.html';
      } catch (error) {
        showToast('Registration failed: Unable to reach the server.', 'error');
      }
    });
  }
});

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'LogInPage.html';
}
