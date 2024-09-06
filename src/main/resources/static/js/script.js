let clickedArtistId;
let clickedAlbumId;
let artistsData;

document.addEventListener("DOMContentLoaded", async function () {
    if (!artistsData) { // Fetch data only if not already fetched
        artistsData = await fetch(`api/artists`, {method: "GET"})
            .then(response => response.json())
            .catch(error => console.error(error));
    }
});

// Click event listener for debugging
// document.addEventListener("click", async function (e) {
//     console.log(e.target);
// });

// Album List
document.querySelector(".card").addEventListener("click", async function (e) {
    if (!artistsData) return; // Ensure data is available
    clickedArtistId = e.target.id;

    let thisArtist = artistsData.find(artist => artist.name === e.target.innerText);
    document.querySelector("#artist").innerText = thisArtist.name;
    document.querySelector("img.artist-thumbnail").src = thisArtist.thumbnailphoto;

    let albumList = document.querySelector(".albumlist");
    albumList.innerHTML = "";

    for (let i = 0; i < thisArtist.albums.length; i++) {
        // const button = document.querySelector(".albumlist button");
        // button.setAttribute("id", artistsData[clickedArtistId].albums[i].id);
        // button.querySelector(".album-name").innerText = artistsData[clickedArtistId].albums[i].name;
        // button.querySelector(".album-year").innerText = artistsData[clickedArtistId].albums[i].year;

        let button = document.createElement("a");

        button.classList.add("list-group-item", "d-flex", "justify-content-between");
        button.type = "button";
        button.setAttribute("data-bs-toggle", "modal");
        button.setAttribute("data-bs-target", "#album");
        button.setAttribute("onclick", "albumBtn(this)");
        button.id = thisArtist.albums[i].id;

        let albumName = document.createElement("p");
        albumName.classList.add("m-0", "album-name", "w-75");
        albumName.innerText = thisArtist.albums[i].name;

        let year = document.createElement("p");
        year.innerText = thisArtist.albums[i].year;
        year.classList.add("m-0", "badge", "bg-primary", "rounded-pill", "h-auto", "album-year", "d-flex", "align-items-center");

        button.appendChild(albumName);
        button.appendChild(year);
        albumList.appendChild(button);
    }
});

// Album
const albumBtn = async (button) => {
    if (!artistsData) return; // Ensure data is available
    clickedAlbumId = button.getAttribute("id");

    let tracklist = document.querySelector("#tracklist > div");
    tracklist.innerHTML = "";
    let thisArtist = artistsData.find(artist => artist.name === document.querySelector("#artist").innerText);
    console.log(document.querySelector("#artist"));
    let find = thisArtist.albums.find(album => album.name === button.querySelector(".album-name").innerText);
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
    let listGroup = document.querySelector("#search div div div.modal-body div div.list-group");
    listGroup.innerHTML = "";
    if (keyword === "") {
        document.querySelector("#search div div div.modal-header h5").innerText = "No result";
        listGroup.innerHTML = "<h3 class='d-flex justify-content-center'>Please enter a keyword!</h3>";
        return;
    }

    document.querySelector(".search-result-title").innerHTML = keyword;

    artistsData.forEach(artist => {
        let artistFound = false;
        let artistElement;

        if (artist.name.toLowerCase().includes(keyword.toLowerCase())) {
            artistElement = addArtistElementInSearch(artist.name, artist.id);
            listGroup.appendChild(artistElement);
            artistFound = true;
        }

        artist.albums.forEach(album => {
            let albumFound = false;
            let albumElement;

            if (album.name.toLowerCase().includes(keyword.toLowerCase())) {
                if (!artistFound) {
                    artistElement = addArtistElementInSearch(artist.name, artist.id);
                    listGroup.appendChild(artistElement);
                    artistFound = true;
                }
                albumElement = addAlbumElementInSearch(album.name, album.id);
                artistElement.appendChild(albumElement);
                albumFound = true;
            }
            album.songs.forEach(song => {
                if (song.name.toLowerCase().includes(keyword.toLowerCase())) {
                    let songElement = addSongElementInSearch(song.name);
                    if (!albumFound) {
                        albumElement = addAlbumElementInSearch(album.name, album.id);

                        if (!artistFound) {
                            artistElement = addArtistElementInSearch(artist.name, artist.id);
                            listGroup.appendChild(artistElement);
                            artistFound = true;
                        }
                        artistElement.appendChild(albumElement);
                        albumFound = true;
                    }
                    albumElement.appendChild(songElement);
                }
            });
        });
    });
});

function addSongElementInSearch(songName) {
    let songElement = document.createElement("li");
    songElement.classList.add("list-group-item");
    songElement.innerText = songName;
    return songElement;
}

function addAlbumElementInSearch(albumName, id) {
    let albumElement = document.createElement("ul");
    albumElement.classList.add("list-group-item", "shadow", "rounded", "album");
    albumElement.setAttribute("style", "background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(11,94,215,1) 100%);");

    let albumLink = document.createElement("a");
    // albumLink.href = "#";
    // albumLink.setAttribute("data-bs-toggle", "modal");
    // albumLink.setAttribute("data-bs-target", "#album");
    albumLink.classList.add("text-decoration-none");
    albumLink.id = id;
    albumLink.innerText = albumName;
    albumLink.style.color = "black";
    albumElement.appendChild(albumLink);
    return albumElement;
}

function addArtistElementInSearch(artistName, id) {
    let artistElement = document.createElement("ul");
    artistElement.classList.add("list-group-item", "m-2", "artist");

    let artistLink = document.createElement("a");
    // artistLink.href = "#";
    // artistLink.id = id;
    // artistLink.setAttribute("data-bs-toggle", "modal");
    // artistLink.setAttribute("data-bs-target", "#albums");
    // artistLink.setAttribute("onclick", "artistBtnInSrch(this)");

    artistLink.classList.add("text-decoration-none");
    artistLink.innerText = artistName;
    artistLink.style.color = "black";
    artistElement.appendChild(artistLink);
    return artistElement;
}