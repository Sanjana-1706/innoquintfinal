// Login Page JavaScript
(function() {
  'use strict';

  // State
  let currentAuthMode = 'login';
  let currentRole = 'organizer';

  // Add entrance animation to container
  const container = document.querySelector('.login-container');
  if (container) {
    container.style.opacity = '0';
    container.style.transform = 'translateY(30px)';
    setTimeout(() => {
      container.style.transition = 'all 0.6s ease-out';
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
    }, 100);
  }

  // Elements
  const loginSelect = document.getElementById('login-select');
  const loginForm = document.getElementById('login-form');
  const authTabs = document.querySelectorAll('.auth-tab');
  const roleButtons = document.querySelectorAll('[data-role]');
  const backToSelect = document.getElementById('back-to-select');
  const roleToggle = document.getElementById('role-toggle');
  const roleLabel = document.getElementById('role-label');
  const switchRoleBtn = document.getElementById('switch-role-btn');
  const pwToggle = document.getElementById('pw-toggle');
  const passwordInput = document.getElementById('password');
  const goSignup = document.getElementById('go-signup');
  const switchAuthText = document.getElementById('switch-auth-text');
  const signupOnly = document.getElementById('signup-only');
  const submitBtn = document.getElementById('submit-btn');

  // Auth mode tabs
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      authTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      currentAuthMode = tab.dataset.authMode;
      updateAuthMode();
    });
  });

  // Role selection
  roleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentRole = btn.dataset.role;
      roleLabel.textContent = currentRole === 'organizer' ? 'Organizer' : 'Participant';
      loginSelect.hidden = true;
      loginForm.hidden = false;
      updateAuthMode();
    });
  });

  // Back to selection
  backToSelect.addEventListener('click', () => {
    loginForm.hidden = true;
    loginSelect.hidden = false;
  });

  // Role toggle in form
  roleToggle.addEventListener('click', () => {
    currentRole = currentRole === 'organizer' ? 'participant' : 'organizer';
    roleLabel.textContent = currentRole === 'organizer' ? 'Organizer' : 'Participant';
  });

  // Switch role button
  switchRoleBtn.addEventListener('click', () => {
    currentRole = currentRole === 'organizer' ? 'participant' : 'organizer';
    roleLabel.textContent = currentRole === 'organizer' ? 'Organizer' : 'Participant';
  });

  // Password toggle
  pwToggle.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      pwToggle.textContent = '🙈';
    } else {
      passwordInput.type = 'password';
      pwToggle.textContent = '👁️';
    }
  });

  // Switch to signup
  goSignup.addEventListener('click', () => {
    currentAuthMode = 'signup';
    authTabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
      if (t.dataset.authMode === 'signup') {
        t.classList.add('active');
        t.setAttribute('aria-selected', 'true');
      }
    });
    updateAuthMode();
  });

  // Update auth mode UI
  function updateAuthMode() {
    if (currentAuthMode === 'signup') {
      signupOnly.hidden = false;
      switchAuthText.innerHTML = 'Already have an account? <button type="button" class="link" id="go-login">Login</button>';
      submitBtn.textContent = 'Sign Up';
      
      // Re-attach login link handler
      const goLogin = document.getElementById('go-login');
      goLogin.addEventListener('click', () => {
        currentAuthMode = 'login';
        authTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
          if (t.dataset.authMode === 'login') {
            t.classList.add('active');
            t.setAttribute('aria-selected', 'true');
          }
        });
        updateAuthMode();
      });
    } else {
      signupOnly.hidden = true;
      switchAuthText.innerHTML = 'New to EventNest? <button type="button" class="link" id="go-signup-new">Create Account</button>';
      submitBtn.textContent = 'Continue';
      
      // Re-attach signup link handler
      const goSignupNew = document.getElementById('go-signup-new');
      goSignupNew.addEventListener('click', () => {
        currentAuthMode = 'signup';
        authTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
          if (t.dataset.authMode === 'signup') {
            t.classList.add('active');
            t.setAttribute('aria-selected', 'true');
          }
        });
        updateAuthMode();
      });
    }
  }

  // Form submission
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(loginForm);
    const data = {
      authMode: currentAuthMode,
      role: currentRole,
      email: formData.get('email'),
      password: formData.get('password')
    };

    if (currentAuthMode === 'signup') {
      data.name = formData.get('name');
      data.address = formData.get('address');
    }

    console.log('Form submitted:', data);
    
    // Show success message and redirect
    alert(`${currentAuthMode === 'login' ? 'Login' : 'Sign Up'} successful as ${currentRole}!`);
    
    // Redirect to index.html after successful login/signup
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 500);
  });

  // Google login
  const googleBtn = document.getElementById('google-btn');
  googleBtn.addEventListener('click', () => {
    alert('Google login integration coming soon!');
  });

})();
