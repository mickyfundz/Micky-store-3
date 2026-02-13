const authOverlay = document.getElementById('authOverlay');
const mainContent = document.getElementById('mainContent');
const authTitle = document.getElementById('authTitle');
const authBtn = document.getElementById('authBtn');
const toggleText = document.getElementById('toggleAuth');
const switchAuth = document.getElementById('switchAuth');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const verifyNotice = document.getElementById('verifyNotice');
const verifyBtn = document.getElementById('verifyBtn');

let isLogin = true; // toggle login/signup

// Check if user is already logged in
window.onload = () => {
    const userEmail = localStorage.getItem('mickyUser');
    if (userEmail) {
        showMain();
    }
};

// Toggle Login / Sign Up
switchAuth.addEventListener('click', () => {
    isLogin = !isLogin;
    authTitle.innerText = isLogin ? 'Login' : 'Sign Up';
    authBtn.innerText = isLogin ? 'Login' : 'Sign Up';
    toggleText.innerHTML = isLogin ?
        `Don't have an account? <span id="switchAuth">Sign Up</span>` :
        `Already have an account? <span id="switchAuth">Login</span>`;
    document.getElementById('switchAuth').addEventListener('click', () => switchAuth.click());
});

// Auth Button (Login / Sign Up)
authBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    if (email === '' || password === '') {
        alert('Please fill in all fields');
        return;
    }
    
    if (isLogin) {
        const stored = JSON.parse(localStorage.getItem(email));
        if (!stored) {
            alert('User does not exist!');
            return;
        }
        if (stored.password !== password) {
            alert('Wrong password!');
            return;
        }
        if (!stored.verified) {
            verifyNotice.style.display = 'block';
            return;
        }
        localStorage.setItem('mickyUser', email);
        showMain();
    } else {
        if (localStorage.getItem(email)) {
            alert('User already exists!');
            return;
        }
        localStorage.setItem(email, JSON.stringify({ email, password, verified: false }));
        alert('Sign up successful! Please verify your email.');
        isLogin = true;
        switchToLogin();
        verifyNotice.style.display = 'block';
    }
});

// Simulate Email Verification
verifyBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    const user = JSON.parse(localStorage.getItem(email));
    if (user) {
        user.verified = true;
        localStorage.setItem(email, JSON.stringify(user));
        alert('Email verified! You can now login.');
        verifyNotice.style.display = 'none';
    } else {
        alert('User not found!');
    }
});

// Show main content
function showMain() {
    authOverlay.style.display = 'none';
    mainContent.style.display = 'block';
}

// Logout
function logout() {
    localStorage.removeItem('mickyUser');
    authOverlay.style.display = 'flex';
    mainContent.style.display = 'none';
}

// Switch to login after signup
function switchToLogin() {
    authTitle.innerText = 'Login';
    authBtn.innerText = 'Login';
    toggleText.innerHTML = `Don't have an account? <span id="switchAuth">Sign Up</span>`;
    document.getElementById('switchAuth').addEventListener('click', () => switchAuth.click());
}