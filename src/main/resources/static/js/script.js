document.querySelector("#search").addEventListener("click", search);

artistsInDB().then(r => console.log("Artists from DB loaded"));

// Utility function for fetching artists
async function fetchArtists() {
    try {
        let response = await fetch("http://localhost:8080/artists", {method: "GET"});
        return await response.json();
    } catch (error) {
        throw new Error(`Error fetching artist: ${error.message}`);
    }
}

// Refactored artistsInDB function
async function artistsInDB() {
    try {
        let data = await fetchArtists();
        for (let i = 0; i < data.length; i++) {
            let htmlliElement = document.createElement("a");
            htmlliElement.className = "list-group-item list-group-item-action rounded";
            htmlliElement.innerText = data[i].name;
            document.querySelector("#currentArtists").appendChild(htmlliElement);
        }
    } catch (error) {
        console.error(error.message);
    }
}

// Refactored getArtistFromSearchbox function
function getArtistFromSearchbox(callback) {
    let userSearch = document.querySelector("input").value;
    fetchArtists().then(data => {
        let result = null;
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].albums.length; j++) {
                data[i].albums[j].songs.forEach(song => {
                    if (song.name.toLowerCase().includes(userSearch.toLowerCase())) {
                        result = data[i];
                    }
                });
            }
        }
        if (result === null) {
            callback("No artist found with that name");
        } else {
            callback(result);
        }
    }).catch(error => callback(error.message));
}

function search() {
    let children = document.querySelector("#currentArtists").children;
    getArtistFromSearchbox(artist => {
        if (artist) {
            for (let i = 0; i < children.length; i++) { // add ".active" class to artist name
                children[i].classList.remove("active");
                if (children[i].innerText === artist.name) {
                    children[i].classList.add("active");
                }
            }
        } else {
            alert("No artist found with that name");
        }
    });
}

document.querySelector("#currentArtists").addEventListener("click", function (event) {
    document.querySelector(".active").classList.remove("active");
    document.querySelector("#albums").innerHTML = "";
    document.querySelector("#tracks").innerHTML = "";
    event.target.classList.add("active");
    fetchArtists().then(data => {
        for (let i = 0; i < data.length; i++) {
            let album = document.createElement("a");
            album.classList.add("list-group-item", "list-group-item-action");
            let artist = data.find(artist => artist.name === event.target.innerText);
            if (artist) {
                album.innerHTML = artist.albums[i].name;
                document.querySelector("#albums").appendChild(album);
            }
        }
    });
});

// add track base on album which is on target
document.querySelector("#albums").addEventListener("click", function (event) {
    document.querySelector("#tracks").innerHTML = "";
    fetchArtists().then(data => {

            let artist = data.find(artist => artist.name === document.querySelector(".active").innerText);
            if (artist) {
                let album = artist.albums.find(album => album.name === event.target.innerText);
                album.songs.forEach(song => {
                    let track = document.createElement("a");
                    track.classList.add("list-group-item", "list-group-item-action");
                    track.innerHTML = song.name;
                    document.querySelector("#tracks").appendChild(track);
                });
            }

    });
});

document.createElement(`<div class="card" style="width: 18rem;">
  <img class="card-img-top" src=".../100px180/" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`);