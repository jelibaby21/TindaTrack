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

    function loadDebtReport() {
    fetch('http://localhost:3000/api/debts/report/join')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('debtReport');
            table.innerHTML = '';

            data.forEach(x => {
                table.innerHTML += `
                    <tr>
                        <td>${x.debt_id || ''}</td>
                        <td>${x.full_name || ''}</td>
                        <td>${x.amount || ''}</td>
                        <td>${x.amount_paid || ''}</td>
                        <td>${x.balance || ''}</td>
                        <td>${x.payment_amount || ''}</td>
                    </tr>
                `;
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}