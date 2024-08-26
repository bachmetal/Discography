/*
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
let clickedArtistIndex;
let clickedAlbumIndex;
let artistsData;

document.addEventListener("DOMContentLoaded", async function () {
    if (!artistsData) { // Fetch data only if not already fetched
        artistsData = await fetch(`api/artists`, {method: "GET"})
            .then(response => response.json())
            .catch(error => console.error(error));
    }
});

// Album List
document.querySelector("#cards").addEventListener("click", async function (e) {
    if (!artistsData) return; // Ensure data is available
    clickedArtistIndex = e.target.id - 1;

    document.querySelector("#artist").innerText = e.target.innerText;
    document.querySelector("img.artist-thumbnail").src = e.target.querySelector("img").src;

    let albumList = document.querySelector(".albumlist");
    albumList.innerHTML = "";

    for (let i = 0; i < artistsData[clickedArtistIndex].albums.length; i++) {
        // const button = document.querySelector(".albumlist button");
        // button.setAttribute("id", artistsData[clickedArtistIndex].albums[i].id);
        // button.querySelector(".album-name").innerText = artistsData[clickedArtistIndex].albums[i].name;
        // button.querySelector(".album-year").innerText = artistsData[clickedArtistIndex].albums[i].year;

        let button = document.createElement("button");

        button.classList.add("list-group-item", "d-inline-flex", "justify-content-between");
        button.type = "button";
        button.setAttribute("data-bs-toggle", "modal");
        button.setAttribute("data-bs-target", "#album");
        button.setAttribute("onclick", "albumBtn(this)");
        button.id = artistsData[clickedArtistIndex].albums[i].id;

        let albumName = document.createElement("p");
        albumName.classList.add("m-0", "album-name");
        albumName.innerText = artistsData[clickedArtistIndex].albums[i].name;

        let year = document.createElement("p");
        year.classList.add("m-0");
        year.innerText = artistsData[clickedArtistIndex].albums[i].year;
        year.classList.add("badge", "bg-primary", "rounded-pill", "album-year");

        button.appendChild(albumName);
        button.appendChild(year);
        albumList.appendChild(button);
    }
});

// Album
const albumBtn = async (button) => {
    if (!artistsData) return; // Ensure data is available
    clickedAlbumIndex = button.getAttribute("id");

    let tracklist = document.querySelector("#tracklist > div");
    tracklist.innerHTML = "";
    let find = artistsData[clickedArtistIndex].albums.find(album => album.name === button.querySelector(".album-name").innerText);
    document.querySelector("#album > div > div > div.modal-header > h4").innerText = document.querySelector("#artist").innerText;
    document.querySelector("#thumbnail > h5").innerText = find.name;
    document.querySelector("#thumbnail > img").src = find.thumbnailphoto;
    document.querySelector("#thumbnail > p:nth-child(3)").innerText = "Year: " + find.year;

    document.querySelector("#thumbnail > p:nth-child(4)").innerText = "Styles: " + find.styles.map(style => style.name).join(", ");
    document.querySelector("#thumbnail > p:nth-child(5)").innerText = "Genres: " + find.genres.map(style => style.name).join(", ");
    for (let i = 0; i < find.songs.length; i++) {
        let track = document.createElement("li");
        track.classList.add("list-group-item");
        track.innerText = (i + 1) + ". " + find.songs[i].name;
        tracklist.appendChild(track);
    }
}

// Search button
document.querySelector("#search-button").addEventListener("click", async function (e) {
    const keyword = document.querySelector("input").value;
    let listGroup = document.querySelector("#search > div > div > div.modal-body.d-flex.justify-content-center > div > div");
    listGroup.innerHTML = "";
    if (keyword === "") {
        listGroup.innerHTML = "<h3 class='d-flex justify-content-center'>Please enter a keyword!</h3>";
        return;
    }

    document.querySelector(".search-result-title").innerHTML = keyword;

    let forEach = artistsData.forEach(artist => {
        if (artist.name.toLowerCase().includes(keyword.toLowerCase())) {
            let artistElement = document.createElement("ul");
            artistElement.classList.add("list-group-item", "m-2");
            artistElement.innerText = artist.name;
            listGroup.appendChild(artistElement);
        }

        artist.albums.forEach(album => {
            if (album.name.toLowerCase().includes(keyword.toLowerCase())) {
                let artistElement = document.createElement("ul");
                artistElement.classList.add("list-group-item", "m-2");
                artistElement.innerText = artist.name;

                let albumElement = document.createElement("ul");
                albumElement.classList.add("list-group-item", "shadow", "rounded");
                albumElement.setAttribute("style", "background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(11,94,215,1) 100%);");
                let albumLink = document.createElement("a");
                albumLink.href = "#";
                albumLink.innerText = album.name;

                console.log(albumLink);
                albumElement.appendChild(albumLink);
                artistElement.appendChild(albumElement);
                listGroup.appendChild(artistElement);
            }

            album.songs.forEach(song => {
                    if (song.name.toLowerCase().includes(keyword.toLowerCase())) {
                        let artistElement = document.createElement("ul");
                        artistElement.classList.add("list-group-item", "m-2");
                        artistElement.innerText = artist.name;

                        let albumElement = document.createElement("ul");
                        albumElement.classList.add("list-group-item", "shadow", "rounded");
                        albumElement.setAttribute("style", "background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(11,94,215,1) 100%);");
                        albumElement.innerText = album.name;

                        let songElement = document.createElement("li");
                        songElement.classList.add("list-group-item");
                        songElement.innerText = song.name;

                        listGroup.appendChild(artistElement);
                        artistElement.appendChild(albumElement);
                        albumElement.appendChild(songElement);
                    }
                }
            )
        })
    });
});