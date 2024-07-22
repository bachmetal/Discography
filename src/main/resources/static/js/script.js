let artistName;
fetch("http://localhost:8080/artists", {
    method: "GET"
}).then(response => response.json())
    .then(data => {
        console.log(data);
    }).catch(error => console.error('Error fetching artist:', error));
