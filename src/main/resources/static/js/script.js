fetch("http://localhost:8080/artists", {
    method: "GET"
}).then(response => response.json())
    .then(data => {
            for (let i = 0; i < data.length; i++) {
                // let htmlliElement = document.createElement("li");
                // htmlliElement.className = "list-group-item";
                // htmlliElement.innerHTML = data[i].name;
                // document.querySelector(".list-group").appendChild(htmlliElement);
                console.log(i);
                console.log(data[i].name);
            }
        }
    ).catch(error => console.error('Error fetching artist:', error));
