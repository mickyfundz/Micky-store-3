// ============================
// SIGNUP
// ============================
const signupBtn = document.getElementById('signupBtn');
signupBtn?.addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const signupMessage = document.getElementById('signupMessage');
    
    if (!name || !email || !password) {
        signupMessage.innerText = "All fields are required!";
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
        signupMessage.innerText = "Email already exists!";
        return;
    }
    
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    signupMessage.innerText = "Account created successfully!";
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
});

// ============================
// LOGIN
// ============================
const loginBtn = document.getElementById('loginBtn');
loginBtn?.addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const loginMessage = document.getElementById('loginMessage');
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('activeUser', JSON.stringify(user));
        window.location.href = 'index.html';
    } else {
        loginMessage.innerText = "Invalid email or password!";
    }
});

// ============================
// LOGOUT
// ============================
function logout() {
    localStorage.removeItem('activeUser');
    window.location.href = 'login.html';
}

// ============================
// PROTECT PAGES
// ============================
window.addEventListener('DOMContentLoaded', () => {
    const protectedPages = ['index.html', 'products/glasses.html', 'products/watches.html', 'products/caps.html'];
    const path = window.location.pathname.split('/').pop();
    if (protectedPages.includes(path)) {
        const activeUser = JSON.parse(localStorage.getItem('activeUser'));
        if (!activeUser) {
            alert('You must login first!');
            window.location.href = 'login.html';
        }
    }
});