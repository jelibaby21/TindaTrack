
const loadUsers = () => {
    fetch('http://localhost:3000/api/users')
        .then(response => response.json())
        .then(users => {
            const table = document.getElementById('userTable');
            table.innerHTML = '';

            users.forEach(user => {
                const row = `
                    <tr>
                        <td>${user.user_id}</td>
                        <td>${user.username}</td>
                        <td>${user.full_name}</td>
                        <td>${user.role_name}</td>
                        <td>${user.status}</td>
                        <td>
                            <button onclick="editUser(${user.user_id})">Edit</button>

                            ${user.status === 'Active'
                                ? `<button onclick="changeStatus(${user.user_id}, 'Inactive')">Deactivate</button>`
                                : `<button onclick="changeStatus(${user.user_id}, 'Active')">Activate</button>`
                            }
                        </td>
                    </tr>
                `;

                table.innerHTML += row;
            });
        })
        .catch(error => {
            console.error('Error loading users:', error);
        });
};


document.getElementById('userForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const user = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        full_name: document.getElementById('full_name').value,
        role_id: document.getElementById('role_id').value,
        status: document.getElementById('status').value
    };

    if (!user.password) {
        alert('Password is required.');
        return;
    }

    fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);

            document.getElementById('userForm').reset();
            loadUsers();
        })
        .catch(error => {
            console.error('Error adding user:', error);
        });
});


loadUsers();


function editUser(id) {
    const newName = prompt('Enter new full name:');

    if (!newName) {
        return;
    }

    fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            full_name: newName
        })
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            loadUsers();
        })
        .catch(error => {
            console.error('Error editing user:', error);
        });
}


function changeStatus(id, status) {
    const action = status === 'Active' ? 'activate' : 'deactivate';

    if (!confirm(`Are you sure you want to ${action} this user?`)) {
        return;
    }

    fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status: status
        })
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            loadUsers();
        })
        .catch(error => {
            console.error('Error changing user status:', error);
        });
}
