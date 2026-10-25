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
            <button onclick="deactivateUser(${user.user_id})">
                Deactivate
            </button>
        </td>
    </tr>
`;

                table.innerHTML += row;
            });

        })

        .catch(error => {
            console.error('Error:', error);
        });
};


document.getElementById('userForm').addEventListener('submit', (event) => {

    event.preventDefault();

    const user = {
        username: document.getElementById('username').value,
        full_name: document.getElementById('full_name').value,
        role_id: document.getElementById('role_id').value,
        status: document.getElementById('status').value
    };

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
        console.error('Error:', error);
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
        console.error('Error:', error);
    });
}

function deactivateUser(id) {

    if (!confirm('Deactivate this user?')) {
        return;
    }

    fetch(`http://localhost:3000/api/users/${id}`, {

        method: 'PUT',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            status: 'Inactive'
        })

    })
    .then(response => response.json())
    .then(data => {

        alert(data.message);

        loadUsers();

    })
    .catch(error => {
        console.error('Error:', error);
    });
}
