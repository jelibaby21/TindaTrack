fetch('http://localhost:3000/api/reports/user-report')

    .then(response => response.json())

    .then(users => {

        const table = document.getElementById('reportTable');

        users.forEach(user => {

            const row = `
                <tr>
                    <td>${user.user_id}</td>
                    <td>${user.username}</td>
                    <td>${user.full_name}</td>
                    <td>${user.role_name}</td>
                    <td>${user.status}</td>
                </tr>
            `;

            table.innerHTML += row;
        });

    })

    .catch(error => {
        console.error('Error:', error);
    });