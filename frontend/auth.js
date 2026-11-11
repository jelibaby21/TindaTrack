
const loggedInUser = localStorage.getItem('loggedInUser');

if (!loggedInUser) {
    window.location.href = 'login.html';
}

function logout() {
    localStorage.removeItem('loggedInUser');
    alert('Logged out successfully!');
    window.location.href = 'login.html';
}
