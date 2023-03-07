$(document).ready(function () {
  displayLink();
  odjavaUserName();
});

let checkToken = localStorage.getItem("token");

function displayLink() {
  let links = document.querySelectorAll(".nastavniPlan, .odjaviSe, .prijaviSe");
  if (checkToken === null) {
    links.forEach((link) => {
      if (
        link.classList.contains("nastavniPlan") ||
        link.classList.contains("odjaviSe")
      ) {
        link.style.display = "none";
      }
    });
  } else {
    links.forEach((link) => {
      if (link.classList.contains("prijaviSe")) {
        link.style.display = "none";
      }
    });
  }
}

let clearStorage = document.querySelector(".odjaviSe");

clearStorage.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("token");
  window.location.href = "/html/index.html"
});


function odjavaUserName() {
  const username = localStorage.getItem("uname");
  $("#odjaviSe").text("Odjava, " + username);
}




