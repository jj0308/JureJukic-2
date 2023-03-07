const currentPage = window.location.pathname;
const nasevrijednosti = document.getElementById("nasevrijednosti");
const povijest = document.getElementById("povijest");
const algebragrupa = document.getElementById("algebragrupa");
const kakodonas = document.getElementById("kakodonas");




if (currentPage.includes("onama.html")) {
  
  nasevrijednosti.style.display = "block";
  povijest.style.display = "block";
  algebragrupa.style.display = "block";
  kakodonas.style.display = "block";
} else {
  
  nasevrijednosti.style.display = "none";
  povijest.style.display = "none";
  algebragrupa.style.display = "none";
  kakodonas.style.display = "none";
}