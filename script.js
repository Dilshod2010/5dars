document.getElementById("submitBtn").addEventListener("click", function () {
    let name = document.getElementById("nameInput").value.trim();
    if (name === "") {
        alert("Please enter a name.");
        return;
    }

    fetch(`https://api.nationalize.io/?name=${name}`)
        .then(response => response.json())
        .then(data => {
            let resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "<h3>Possible Nationalities:</h3>";
            
            if (data.country.length === 0) {
                resultDiv.innerHTML += "<p>No data found.</p>";
                return;
            }

            let list = "<ul>";
            data.country.forEach(country => {
                let countryCode = country.country_id.toLowerCase(); 
                let flagUrl = `https://flagcdn.com/w40/${countryCode}.png`;
                list += `<li><img src="${flagUrl}" alt="${country.country_id}" style="width: 20px; height: 15px; margin-right: 5px;"> ${country.country_id} - ${(country.probability * 100).toFixed(1)}%</li>`;
            });
            list += "</ul>";

            resultDiv.innerHTML += list;
        })
        .catch(error => console.error("Error fetching data:", error));
});



