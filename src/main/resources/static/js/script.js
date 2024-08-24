/*

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

// Function to display artists in the list
async function artistCards() {
    try {
        let cards = document.querySelector("#cards");
        let artists = await fetchArtists();
        // Sort artist names alphabetically
        artists.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
        allArtists = artists;

        cards.innerHTML = ""; // Clear existing artists
        artists.forEach(artist => {
            cards.innerHTML += `
        <a href="albums.html" class="card m-2 stretched-link" style="width: 18rem" id="${artist.id}">
            <div class="card-body">
                <p class="card-title text-decoration-none fs-5 fw-bold">${artist.name}</p>
                <img class="card-image-top w-100" src="${artist.thumbnailphoto}">
            </div>
        </a>
`;
        });
    } catch (error) {
        console.error(error.message);
    }
}

async function albumCards() {
    try {
        let cards = document.querySelector("#cards");
        let artists = await fetchArtists();
        // Sort artist names alphabetically
        artists.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
        allArtists = artists;

        cards.innerHTML = ""; // Clear existing artists
        artists.forEach(artist => {
            cards.innerHTML += `
        <a href="albums.html" class="card m-2 stretched-link" style="width: 18rem" id="${artist.id}">
            <div class="card-body">
                <p class="card-title text-decoration-none fs-5 fw-bold">${artist.name}</p>
                <img class="card-image-top w-100" src="${artist.thumbnailphoto}">
            </div>
        </a>
`;
        });
    } catch (error) {
        console.error(error.message);
    }
}

document.querySelector("#search").addEventListener("click", function search() {
    console.log("search clicked!");
});

async function fetchAlbum(id) {
    try {
        let response = await fetch(`http://localhost:8080/artists/` + id, {method: "GET"});
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching album: ${error.message}`);
        return [];
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    if (window.location.toString().endsWith("index.h")) {
        artistCards().then(r => console.log("Artists loaded"));

        document.querySelector(".card").addEventListener("click", function (e) {
            sessionStorage.setItem("artistId", e.target.id);
        })
    } else if (window.location.toString().endsWith("albums.h")) {
        if (sessionStorage.getItem("artistId") == null) {
            document.querySelector("#albums").innerHTML = "<h1>Sorry, but you didn't choose any artist.</h1>";
            return;
        }
        let albums = await fetchAlbum(sessionStorage.getItem("artistId"));

        // document.querySelector("#albums").innerHTML=`
// `;
    }
})
 */
