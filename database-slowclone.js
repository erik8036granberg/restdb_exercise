"use strict";


function post(newAlbum) {
    fetch("https://musicdb-a19d.restdb.io/rest/albums", {
        method: "post",
        body: JSON.stringify(newAlbum),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "x-apikey": "5c7cf047cac6621685acbaf3",
            "cache-control": "no-cache"
        }
    })
    get();
}

function get() {
    fetch("https://musicdb-a19d.restdb.io/rest/albums", {
            method: "get",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-apikey": "5c7cf047cac6621685acbaf3",
                "cache-control": "no-cache"
            }
        })
        .then(res => res.json())
        .then(data => {
            let albums = data;
            showAlbum(albums);
        });
}

// function deleteAlbum() {
//     fetch("https://musicdb-a19d.restdb.io/rest/albums/" + id, {
//             method: "get",
//             headers: {
//                 "Content-Type": "application/json; charset=utf-8",
//                 "x-apikey": "5c7cf047cac6621685acbaf3",
//                 "cache-control": "no-cache"
//             }
//         })
//         .then(res => res.json())
//         .then(data => {

//         });
// }



get();


function showAlbum(albums) {
    console.log("showAlbum");
    console.log(albums);

    const template = document.querySelector("[data-template]");
    const container = document.querySelector("[data-container]");

    container.innerHTML = "";


    albums.forEach(album => {
        console.log(album);
        let clone = template.content.cloneNode(true);
        clone.querySelector("h1").textContent = album.Artist;
        clone.querySelector("[data-title]").textContent = album.Title;
        clone.querySelector("[data-year]").textContent = album.Year
        container.appendChild(clone);
    });
}

function britney() {
    const obj = {
        Artist: "Britney",
        Title: "OOoops",
        Year: 2005
    }
    post(obj);
}