// DEFINE SEARCH BUTTON
document.getElementById("input-form").addEventListener('submit', start);
function start(e) {
    
    document.getElementById("search-result").innerHTML = `<div <button class="buttonload">
                                                                   <i class="fa fa-spinner fa-spin"></i>Loading
                                                               </button
                                                          </div>`;
    let searchInput = document.getElementById("search-song").value;
    
    fetch(`https://api.lyrics.ovh/suggest/${searchInput}`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                displaySuggestion(data);
                document.getElementById("search-result").innerText = "Results found"
            } else {
                document.getElementById("search-result").innerText = "No items found!"
            }
        })
        .catch(err => {
            document.getElementById("search-result").innerText = "No items found!"
        });
    e.preventDefault();
};


// DISPLAY SUGGESTIONS WHEN CLICKED ON SEARCH BUTTON
function displaySuggestion(allData) {
    let data = allData.data;
    let list = [];
    for (let i = 0; i < 10; i++) {
        const items = {
            title: data[i].title,
            artistName: data[i].artist.name,
            albumTitle: data[i].album.title,
            artistImage: data[i].artist.picture_small,
            albumImage: data[i].album.cover_small
        }
        list.push(items);
    }

    
    // DISPLAY SUGGESTIONS IN HTML TAG 
    let display = document.getElementById("display-result");
    display.innerHTML = "";
    document.querySelector('.single-result').style.display = "block";
    for (let i = 0; i < list.length; i++) {
        let {title, artistName, albumTitle, artistImage, albumImage} = list[i];

        display.innerHTML +=
            `<div class="col-md-6 result">
                <h3 class="lyrics-name"><span id="title">${title}</span></h3>
                <p class="author lead">Artist : <span id="artistName">${artistName}</span></p>
                <p class="lead">Album : <span id="albumTitle">${albumTitle}</span></p>
            </div>
            <div class="col-md-3  ">
                <img src="${artistImage}" class="img-fluid">
                <img src="${albumImage}" class="img-fluid">
            </div>
            <div class ="col-md-3  text-md-right text-center">
                 <a href="#/" onclick="getLyrics('${title}','${artistName}','${albumImage}','${artistImage}')" class="btn btn-success">Get Lyrics</a>
             </div>
            <div class="bottom-line"></div>`
    }
}



// GET LYRICS WHEN CLICKED ON GET LTRICS BUTTON

const getLyrics = (title, artistName, albumImage, artistImage) => {

    document.getElementById("album-image").innerHTML = `<div <button class="buttonload">
                                                                <i class="fa fa-spinner fa-spin"></i>Loading
                                                             </button
                                                        </div>`;

    fetch(`https://api.lyrics.ovh/v1/${artistName}/${title}`)
        .then(response => response.ok ? response.json() : console.log(response.status))
        .then(data =>  displayLyrics(data, title, artistName, albumImage, artistImage))
}



// DISPLAY LYRICS WHEN CLICKED ON GET LYRICS BUTTON

const displayLyrics = (data, title, artistName, albumImage, artistImage) => {
    document.querySelector('.single-result').style.display = "none";
    document.getElementById("album-image").innerHTML = `<img src="${albumImage}" class="img-fluid"> <img src="${artistImage}" class="img-fluid">`
    document.getElementById("get-title").innerText = title;
    document.getElementById("get-artist").innerText = " - " + artistName;
    document.getElementById("get-lyrics").innerText = "";
    document.getElementById("search-result").innerText = "";
    
    if(data == undefined){
        document.getElementById("get-lyrics").innerText = "Sorry! Lyrics is not found.";
    }
    else if (data.lyrics) {
        document.getElementById("get-lyrics").innerText = data.lyrics;
    } else {
        document.getElementById("get-lyrics").innerText = "Sorry! Lyrics is not found.";
    }
}