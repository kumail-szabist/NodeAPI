const employeesLink = "https://humble-goldfish-x5x7ppjvqwrx2r7j-6006.app.github.dev/employees";

fetch(employeesLink)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch API");
        }
        return response.json();
    })
    .then(data => {
        const tbody = document.getElementById('employeeTable')?.getElementsByTagName('tbody')[0];

        if (tbody) {
            data.forEach(c => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${c.employee_id}</td>
                    <td>${c.first_name}</td>
                    <td>${c.last_name}</td>
                    <td>${c.email}</td>
                    <td>${c.phone_number}</td>
                    <td>${c.hire_date}</td>
                    <td>${c.job_id}</td>
                    <td>${c.salary}</td>
                    <td>${c.commission_pct}</td>
                    <td>${c.manager_id}</td>
                    <td>${c.department_id}</td>

                    `;

                tbody.appendChild(row);
            });
        } else {
            console.error("tbody element not found!");
        }
    })
    .catch(err => {
        console.log(err.message);
    });
