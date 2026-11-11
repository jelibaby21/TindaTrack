
document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = {
        username: username,
        password: password
    };

    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
       if (data.success) {
    localStorage.setItem('loggedInUser', JSON.stringify(data.user));

    alert('Login successful!');
    window.location.href = 'index.html';
} else {
            alert(data.message || 'Invalid username or password');
        }
    })
    .catch(error => {
        console.error('Login error:', error);
        alert('Unable to connect to server.');
    });
});
