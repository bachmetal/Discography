const artists = fetchArtists();

// Utility function for fetching artists
async function fetchArtists() {
    try {
        let response = await fetch("http://localhost:8080/artists", {method: "GET"});
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching artist: ${error.message}`);
        return [];
    }
}

// Function to create artist list item
function createArtistListItem(artist) {
    let htmlliElement = document.createElement("a");
    htmlliElement.className = "list-group-item list-group-item-action rounded";
    htmlliElement.innerText = artist.name;
    return htmlliElement;
}

// Function to display artists in the list
async function artistsInDB() {
    try {
        let data = await fetchArtists();
        let currentArtists = document.querySelector("#currentArtists");
        currentArtists.innerHTML = ""; // Clear existing artists
        data.forEach(artist => {
            currentArtists.appendChild(createArtistListItem(artist));
        });
    } catch (error) {
        console.error(error.message);
    }
}

// Function to get artist from search box
function getArtistFromSearchbox(callback) {
    let userSearch = document.querySelector("input").value;
    if (userSearch === "") return;
    artists.then(data => {
        let result = data.find(artist =>
            artist.albums.some(album =>
                album.songs.some(song =>
                    song.name.toLowerCase().includes(userSearch.toLowerCase())
                )
            )
        );
        callback(result || "No artist found with that name");
    }).catch(error => callback(error.message));
}

// Function to handle search
function search() {
    let children = document.querySelector("#currentArtists").children;
    getArtistFromSearchbox(artist => {
        if (artist) {
            Array.from(children).forEach(child => {
                child.classList.toggle("active", child.innerText === artist.name);
            });
        } else {
            alert("No artist found with that name");
        }
    });
}

// Function to create album card
function createAlbumCard(album) {
    let anchorElement = document.createElement("a");
    anchorElement.classList.add("list-group-item", "list-group-item-action");
    anchorElement.innerHTML = `
        <div class="card">
            <img class="card-img-top" src="${album.thumbnailphoto}" alt="${album.name}">
            <div class="card-body">
                <h5 class="card-title">${album.name}</h5>
                <p> Year: ${album.year}</p>
                <p> Style: ${album.styles.map(style => style.name).join(", ")}</p>
            </div>
        </div>`;
    return anchorElement;
}

// Event listener for artist selection
document.querySelector("#currentArtists").addEventListener("click", function (event) {
    if (event.target.classList.contains("list-group-item")) {
        document.querySelector(".active")?.classList.remove("active");
        document.querySelector("#albums").innerHTML = "";
        document.querySelector("#tracks").innerHTML = "";
        event.target.classList.add("active");

        artists.then(data => {
            let artist = data.find(artist => artist.name === event.target.innerText);
            if (artist) {
                artist.albums.forEach(album => {
                    document.querySelector("#albums").appendChild(createAlbumCard(album));
                });
            }
        });
    }
});

// Event listener for album selection
document.querySelector("#albums").addEventListener("click", function (event) {
    if (event.target.closest(".card")) {
        document.querySelector("#tracks").innerHTML = "";
        artists.then(data => {
            let artist = data.find(artist => artist.name === document.querySelector(".active").innerText);

            if (artist) {
                let album = artist.albums.find(album => album.name === event.target.closest(".card").querySelector(".card-title").innerText);
                album.songs.forEach(song => {
                    let track = document.createElement("a");
                    track.classList.add("list-group-item", "list-group-item-action");
                    track.innerHTML = song.name;
                    document.querySelector("#tracks").appendChild(track);
                });
            }
        });
    }
});

// Initial load of artists
artistsInDB().then(r => console.log("Artists loaded"));
document.querySelector("#search").addEventListener("click", search);