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
    if (step === 1) {
        if (document.querySelector("#artists").value === "add-new") {
            if (document.querySelector("#name").value === "" || document.querySelector("#thumbnailphoto").value === "") {
                alert("Please fill out the artist name and thumbnail fields!");
                return false;
            }
        }
    }
    if (step === 2) {
        if (document.querySelector("#albums").value === "add-new") {
            if (document.querySelector("#albumName").value === "" || document.querySelector("#year").value === "" || document.querySelector("#albumThumbnail").value === "") {
                alert("Please fill out the album name and year fields!");
                return false;
            }
        }
    }
    if (step === 2) {
        if (document.querySelector("#albumThumbnail").value.startsWith("http") === false) {
            alert("Please enter a valid URL for the album thumbnail!");
            return false;
        }
    }
    if (step === 2) {
        if (document.querySelector("#genres").value === "add-new") {
            if (document.querySelector("#genre").value === "") {
                alert("Please fill out the genre field!");
                return false;
            }
        }
    }
    if (step === 2) {
        if (document.querySelector("#styles").value === "add-new") {
            if (document.querySelector("#style").value === "") {
                alert("Please fill out the style field!");
                return false;
            }
        }
    }
    if (step === 3) {
        if (document.querySelector("#songs").value === "add-new") {
            if (document.querySelector("#songName").value === "") {
                alert("Please fill out at least one song name!");
                return false;
            }
        }
    }
    return true;
}