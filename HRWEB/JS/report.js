const empCount = "https://humble-goldfish-x5x7ppjvqwrx2r7j-6006.app.github.dev/getCount/employees";

fetch(empCount)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch API");
        }
        return response.json();
    })
    .then(data => {
        const t = document.getElementById('countryCount');
        console.log(data.count);
        t.innerText=data.count;
    
    })
    .catch(err => {
        console.log(err.message);
    });
