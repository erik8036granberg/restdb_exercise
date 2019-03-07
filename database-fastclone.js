"use strict";

let newAlbum;

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
  get();
}

// sends a get request to the db
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
    .then(res => res.json())
    .then(data => {
      newForm.elements.submit.disabled = false;
      showAlbum(data);
    });
}

// sends a get request to the db
function get() {
  console.log("get");
  //   use database endpoint with security code to get posts
  fetch("https://musicdb-a19d.restdb.io/rest/albums", {
      method: "get",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apikey": "5c7cf047cac6621685acbaf3",
        "cache-control": "no-cache"
      }
    })
    //   format as jason
    .then(res => res.json())
    .then(data => {
      sortAlbums(data);
    });
}

// sends a delete request to the db
function deleteAlbum(id) {
  fetch("https://musicdb-a19d.restdb.io/rest/albums/" + id, {
      method: "delete",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apikey": "5c7cf047cac6621685acbaf3",
        "cache-control": "no-cache"
      }
    })
    .then(res => res.json())
    .then(data => {});
}

function sortAlbums(data) {
  console.log("sortAlbums");
  console.log(data);
  data.sort(function (a, z) {
    if (a.new_id < z.new_id) {
      return 1;
    } else {
      return -1;
    }
  });
  data.forEach(showAlbum);
}

// loop to add posts to DOM - template -> clone -> append
function showAlbum(album) {
  console.log("showAlbum");
  const template = document.querySelector("[data-template]").content;
  const clone = template.cloneNode(true);
  clone.querySelector("[data-artist]").textContent = album.Artist;
  clone.querySelector("[data-title]").textContent = album.Title;
  clone.querySelector("[data-year]").textContent = album.Year;
  clone.querySelector("[data-id]").dataset.id = album._id;
  clone.querySelector("[data-delete]").addEventListener("click", e => {
    // mouseevnt on click
    console.log(e);
    // finds mouse target (button) and delete its parent element (article)
    e.target.parentElement.remove();
    deleteAlbum(album._id);
  });
  document.querySelector("[data-container]").appendChild(clone);
}

document.querySelector("#newForm").addEventListener("submit", e => {
  newForm.elements.submit.disabled = true;
  e.preventDefault();
  console.log("submit");

  const newArtist = newForm.elements.artist.value;
  const newTitle = newForm.elements.title.value;
  const newYear = newForm.elements.year.value;

  newAlbum = {
    Artist: newArtist,
    Title: newTitle,
    Year: newYear
  };
  post(newAlbum);
  document.querySelector("#newForm").reset();
  // alert(`${newArtist} - ${newTitle} - ${newYear}
  // has been added to the list`);
});

// se what to do in js:
// console.dir(form);

// value = value sent from form
// get value from form element
// form.element.name.value;

// getAttribute
// removeAttribute
// setAttribute

// newForm.element.submit.setAttribute("disable", true);

//focus() focus the input element
//blur() remove focus from the selected to the next (tab)

// email.addEventListener("click", e => {
//   email.blur;
// });