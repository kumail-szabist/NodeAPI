const countryLink = "https://humble-goldfish-x5x7ppjvqwrx2r7j-6006.app.github.dev/country";

fetch(countryLink)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch API");
        }
        return response.json();
    })
    .then(data => {
        const tbody = document.getElementById('countryTable')?.getElementsByTagName('tbody')[0];

        if (tbody) {
            data.forEach(c => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${c.country_id}</td>
                    <td>${c.country_name}</td>
                    <td>${c.region_id}</td>
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
