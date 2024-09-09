function nextStep() {
    let currentStep;
    document.querySelectorAll('form fieldset > div').forEach((step) => {
        if (step.style.display !== 'none') {
            currentStep = step.id.split('-')[1];
        }
    });
    if (!validateForm(parseInt(currentStep))) return;
    document.querySelector('#step-' + currentStep).style.display = 'none';
    currentStep++;
    document.querySelector('#step-' + currentStep).style.display = 'block';
    document.querySelector('.progress-bar-animated').style.width = currentStep * 25 + '%';
    document.querySelector('.progress-bar-animated').innerHTML = currentStep * 25 + '%';
}

function previousStep() {
    let currentStep;
    document.querySelectorAll('form fieldset > div').forEach((step) => {
        if (step.style.display === 'block') {
            currentStep = step.id.split('-')[1];
        }
    });
    document.querySelector('#step-' + currentStep).style.display = 'none';
    currentStep--;
    document.querySelector('#step-' + currentStep).style.display = 'block';
    document.querySelector('.progress-bar-animated').style.width = currentStep * 25 + '%';
    document.querySelector('.progress-bar-animated').innerHTML = currentStep * 25 + '%';
}

function showAddNewArtist() {
    const state = document.querySelector("#artists").value;
    if (state === "add-new") {
        document.querySelector("#artist-fields").style.display = "block";
    } else {
        document.querySelector("#artist-fields").style.display = "none";
    }
}

function hideAddNewAlbum() {
    const state = document.querySelector("#albums").value;
    if (state === "add-new") {
        document.querySelector("#albumFields").style.display = "block";
    } else {
        document.querySelector("#albumFields").style.display = "none";
    }
}

function AddMoreSong() {
    let songField = document.createElement('div');
    songField.classList.add('mb-3', 'd-flex', 'flex-row');
    songField.innerHTML = `<label class="form-label" style="width: 7rem">Track name:<span style="color: red"></span></label>
                            <input class="form-control" type="text" required>`;
    document.querySelector("#songs").appendChild(songField);
}

let artistName;
let artistURL;
let dataFromDB;

function setArtist() {
    if (document.querySelector("#artists").value === "add-new") {
        artistName = document.querySelector("#name").value;
        artistURL = document.querySelector("#thumbnailphoto").value;
    } else {
        artistName = document.querySelector("#artists").value;
    }

    dataFromDB.forEach((element) => {
        if (element.name === artistName) {
            document.querySelector('#albums').innerHTML = "<option value=\"add-new\">Add new album</option>";
            element.albums.forEach((album) => {
                let option = document.createElement('option');
                option.value = album.name;
                option.text = album.name;

                document.querySelector('#albums').appendChild(option);
            });
        }
    });
}

function addGenreToDb(name) {
    if (name === "") {
        alert("Please enter a genre name!");
        return;
    }
    let exist = false;
    fetch('/api/genres').then(r => r.json()).then(data => {
        data.forEach((genre) => {
            if (genre.name.toLowerCase() === name.toLowerCase()) {
                exist = true;
            }
        });
        if (!exist) {
            fetch('/api/genre', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: name})
            }).then(r => {
                let option = document.createElement("option");
                option.value = name;
                option.text = name;
                document.querySelector("#genres").appendChild(option);
                alert("Genre added to database!");
            }).catch(e => console.error(e));
        } else {
            alert("Genre already exists in database!");
        }
    });
}

function addStyleToDb(name) {
    let exist = false;
    if (name === "") {
        alert("Please enter a style name!");
        return;
    }
    $.ajax({
        type: 'GET',
        url: '/api/styles',
        success: function (data) {
            data.forEach((style) => {
                if (style.name.toLowerCase() === name.toLowerCase()) {
                    exist = true;
                }
            });
            if (!exist) {
                fetch('/api/style', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name: name})
                }).then(r => {
                    let option = document.createElement("option");
                    option.value = name;
                    option.text = name;
                    document.querySelector("#styles").appendChild(option);
                    alert("Style added to database!");
                }).catch(e => console.error(e));
            } else {
                alert("Style already exists in database!");
            }
        },
        error: function () {
            alert('Error fetching styles.');
        }
    });
}

$(document).ready(function () {
    // Fetch the DB data using AJAX
    $.ajax({
        type: 'GET',
        url: '/api/artists',
        success: function (data) {
            dataFromDB = data;
        },
        error: function () {
            alert('Error fetching albums.');
        }
    });
});

function validateForm(step) {
    let result = true;
    if (step === 1) {
        if (document.querySelector("#artists").value === "add-new") {
            if (document.querySelector("#name").value === "") {
                document.querySelector("#name").classList.add("is-invalid");
                if (document.querySelector("#name").parentNode.querySelector('.invalid-feedback') === null) {
                    let message = document.createElement('div');
                    message.classList.add('invalid-feedback');
                    message.innerText = 'Please enter a valid name!';
                    document.querySelector("#name").parentNode.appendChild(message);
                }
                result = false;
            }
            if (document.querySelector("#thumbnailphoto").value === "" || document.querySelector("#thumbnailphoto").value.startsWith("http") === false) {
                document.querySelector("#thumbnailphoto").classList.add("is-invalid");
                if (document.querySelector("#thumbnailphoto").parentNode.querySelector('.invalid-feedback') === null) {
                    let message = document.createElement('div');
                    message.classList.add('invalid-feedback');
                    message.innerText = 'Please enter a valid link!';
                    document.querySelector("#thumbnailphoto").parentNode.appendChild(message);
                }
                result = false;
            }
        }
    }
    if (step === 2) {
        if (document.querySelector("#albums").value === "add-new") {
            if (document.querySelector("#albumName").value === "") {
                document.querySelector("#albumName").classList.add("is-invalid");
                if (document.querySelector("#albumName").parentNode.querySelector('.invalid-feedback') === null) {
                    let message = document.createElement('div');
                    message.classList.add('invalid-feedback');
                    message.innerText = 'Please enter an album name!';
                    document.querySelector("#albumName").parentNode.appendChild(message);
                }
                result = false;
            }
            if (document.querySelector("#year").value === "") {
                document.querySelector("#year").classList.add("is-invalid");
                if (document.querySelector("#year").parentNode.querySelector('.invalid-feedback') === null) {
                    let message = document.createElement('div');
                    message.classList.add('invalid-feedback');
                    message.innerText = 'Please enter a year!';
                    document.querySelector("#year").parentNode.appendChild(message);
                }
                result = false;
            }
            if (document.querySelector("#albumThumbnail").value === "" || document.querySelector("#albumThumbnail").value.startsWith("http") === false) {
                document.querySelector("#albumThumbnail").classList.add("is-invalid");
                if (document.querySelector("#albumThumbnail").parentNode.querySelector('.invalid-feedback') === null) {
                    let message = document.createElement('div');
                    message.classList.add('invalid-feedback');
                    message.innerText = 'Please enter a valid link!';
                    document.querySelector("#albumThumbnail").parentNode.appendChild(message);
                }
                result = false;
            }
            if (document.querySelector("#genres").value === "") {
                document.querySelector("#genres").classList.add("is-invalid");
                if (document.querySelector("#genres").parentNode.querySelector('.invalid-feedback') === null) {
                    let message = document.createElement('div');
                    message.classList.add('invalid-feedback');
                    message.innerText = 'Please select a genre!';
                    document.querySelector("#genres").parentNode.appendChild(message);
                }
                result = false;
            }

            if (document.querySelector("#styles").value === "") {
                document.querySelector("#styles").classList.add("is-invalid");
                if (document.querySelector("#styles").parentNode.querySelector('.invalid-feedback') === null) {
                    let message = document.createElement('div');
                    message.classList.add('invalid-feedback');

                    message.innerText = 'Please select at least one style!';
                    document.querySelector("#styles").parentNode.appendChild(message);
                }
                result = false;
            }

        }
    }
    if (step === 3) {
        if (document.querySelector("#songs").value === "add-new") {
            if (document.querySelector("#songName").value === "") {
                document.querySelector("#songName").classList.add("is-invalid");
                if (document.querySelector("#songName").parentNode.querySelector('.invalid-feedback') === null) {
                    let message = document.createElement('div');
                    message.classList.add('invalid-feedback');
                    message.innerText = 'Please select at least one song!';
                    document.querySelector("#songName").parentNode.appendChild(message);
                }
                result = false;
            }
        }
    }
    return result;
}

// document.querySelector("#add-new-item").addEventListener("submit", (e) => {
//     e.preventDefault();
//     let artist = {
//         name: artistName,
//         thumbnailPhoto: artistURL,
//         albums: []
//     };
// let album = {
//     name: document.querySelector("#albumName").value,
//     year: document.querySelector("#year").value,
//     thumbnailPhoto: document.querySelector("#albumThumbnail").value,
//     genres: [],
//     styles: [],
//     songs: []
// };
// let songs = document.querySelectorAll("#songs input").values();
// console.log(songs);
// let genre = {
//     name: document.querySelector("#genres").value
// };
// let style = {
//     name: document.querySelector("#styles").value
// };
// artist.albums.push(album);
// album.genres.push(genre);
// album.styles.push(style);
// album.songs.push(song);
// fetch('/api/artist', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(artist)
// }).then(r => {
//     alert("Artist added to database!");
//     window.location.href = "/admin";
// }).catch(e => console.error(e));
// });