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

document.querySelector("#cards").addEventListener("click", async function (e) {
    const albumList = await fetch(`http://localhost:8080/api/artists`, {method: "GET"})
        .then(response => response.json().then(data => {
                    clickedArtistIndex = e.target.id - 1;

                    document.querySelector("#artist").innerText = e.target.innerText;
                    document.querySelector("img.artist-thumbnail").src = e.target.querySelector("img").src;
                    let albumList = document.querySelector("div.albumlist");
                    albumList.innerHTML = "";

                    for (let i = 0; i < data[clickedArtistIndex].albums.length; i++) {
                        let button = document.createElement("button");

                        button.classList.add("list-group-item", "d-inline-flex", "justify-content-between", "album-name");
                        button.type = "button";
                        button.setAttribute("data-bs-toggle", "modal");
                        button.setAttribute("data-bs-target", "#album");
                        button.id = data[clickedArtistIndex].albums[i].id;

                        let albumName = document.createElement("p");
                        albumName.classList.add("m-0");
                        albumName.innerText = data[clickedArtistIndex].albums[i].name;
                        albumName.addEventListener("click", function (event) {
                            event.defaultPrevented();
                        });

                        let year = document.createElement("p");
                        year.classList.add("m-0");
                        year.innerText = data[clickedArtistIndex].albums[i].year;
                        year.classList.add("badge", "bg-primary", "rounded-pill");
                        year.addEventListener("click", function (event) {
                            event.defaultPrevented();
                        });

                        button.appendChild(albumName);
                        button.appendChild(year);
                        albumList.appendChild(button);
                    }
                }
            )
        );
});

document.querySelector("#albums > div > div > div.modal-body.d-flex.justify-content-center > div > div.list-group.shadow.albumlist").addEventListener("click", async function (e) {
    const album = await fetch(`http://localhost:8080/api/artists`, {method: "GET"})
        .then(response => response.json().then(data => {
                    let tracklist = document.querySelector("#tracklist > div");
                    tracklist.innerHTML = "";
                    let find = data[clickedArtistIndex].albums.find(album => album.name === e.target.closest("button").querySelector("p").innerText);
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
            )
        ).catch(error => console.error(error));
});