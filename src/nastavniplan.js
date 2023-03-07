const token = localStorage.getItem("token");

if (token === null) {
  window.location.href = "/html/prijava.html";
}
$("#tablicaKolegija").hide();

let urlGetAllCurriculums =
  "https://www.fulek.com/data/api/supit/curriculum-list/hr";
let xmlhttpGetAllSubjects = new XMLHttpRequest();
xmlhttpGetAllSubjects.open("GET", urlGetAllCurriculums, true);
xmlhttpGetAllSubjects.setRequestHeader("Authorization", "Bearer " + token);
xmlhttpGetAllSubjects.send();

xmlhttpGetAllSubjects.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let allSubjects = JSON.parse(this.responseText);
    let myArray = createArrayFromResponse(allSubjects.data);

    $("#nazivKolegija").autocomplete({
      source: myArray,
      minLength: 1,

      focus: function (event, ui) {
        event.preventDefault();

        $("#nazivKolegija").val(ui.item.kolegij);
      },
      select: function (event, ui) {
        event.preventDefault();
        $("#nazivKolegija").val(ui.item.kolegij);
      },
    });

    $("#nazivKolegija").on("autocompleteselect", function (e, ui) {
      let id = findID(allSubjects.data, ui.item.value);
      let urlGetCurriculum = `https://www.fulek.com/data/api/supit/get-curriculum/${id}`;
      let xmlhttpGetSubject = new XMLHttpRequest();
      xmlhttpGetSubject.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let subject = JSON.parse(this.responseText);
          dodajRedak(subject);

          if ($("#tablicaKolegijaRedak").length > 0) {
            $("#tablicaKolegija").show();
          }

          sumEctsAndHours();
        }

        deleteSubject();
      };

      xmlhttpGetSubject.open("GET", urlGetCurriculum, true);
      xmlhttpGetSubject.setRequestHeader("Authorization", "Bearer " + token);
      xmlhttpGetSubject.send();
    });
  }
};

function createArrayFromResponse(response) {
  let arr = [];
  for (let i = 0; i < response.length; i++) {
    arr.push(response[i].kolegij);
  }
  return arr;
}

function findID(arr, nameOfKolegij) {
  for (let i = 0; i < arr.length; i++) {
    if (nameOfKolegij === arr[i].kolegij) {
      return arr[i].id;
    }
  }
}

function dodajRedak(subject) {
  $("#tablicaKolegijaBody").append(
    `<tr id="tablicaKolegijaRedak">
    <td scope="row">${subject.data.kolegij}</td>
     <td id="ects">${subject.data.ects}</td>
     <td id="sati">${subject.data.sati}</td>
     <td id="predavanja">${subject.data.predavanja}</td>
     <td id="vjezbe">${subject.data.vjezbe}</td>
    <td>${subject.data.tip}</td>
     <td><button type="button" id="btn-delete" class="btn btn-danger fs-5">Obriši</button></td>
  </tr>`
  );
}

function showSum(ukupniECTS, ukupniSati, ukupniPredavanja, ukupniVjezbe) {
  $("#ukupniECTS").text(ukupniECTS);
  $("#ukupniSati").text(ukupniSati);
  $("#ukupniPredavanja").text(ukupniPredavanja);
  $("#ukupniVjezbe").text(ukupniVjezbe);
}

function sumEctsAndHours() {
  let ukupniECTS = 0;
  let ukupniSati = 0;
  let ukupniPredavanja = 0;
  let ukupniVjezbe = 0;

  $("#tablicaKolegijaBody tr#tablicaKolegijaRedak").each(function () {
    let sumECTS = +$(this).find("td#ects").text();
    ukupniECTS += sumECTS;
    let sumHours = +$(this).find("td#sati").text();
    ukupniSati += sumHours;
    let sumPredavanja = +$(this).find("td#predavanja").text();
    ukupniPredavanja += sumPredavanja;
    let sumVjezbe = +$(this).find("td#vjezbe").text();
    ukupniVjezbe += sumVjezbe;
  });
  showSum(ukupniECTS, ukupniSati, ukupniPredavanja, ukupniVjezbe);
}

function deleteSubject() {
  $("#tablicaKolegijaBody #tablicaKolegijaRedak").on(
    "click",
    "button",
    function () {
      $(this).parent().parent().remove();

      if ($("#tablicaKolegijaRedak").length == 0) {
        $("#tablicaKolegija").hide();
      }

      let ukupniECTS = 0;
      let ukupniSati = 0;
      let ukupniPredavanja = 0;
      let ukupniVjezbe = 0;

      $("#tablicaKolegijaBody tr#tablicaKolegijaRedak").each(function () {
        let sumECTS = +$(this).find("td#ects").text();
        ukupniECTS += sumECTS;
        let resumHours = +$(this).find("td#sati").text();
        ukupniSati += resumHours;
        let resumPredavanja = +$(this).find("td#predavanja").text();
        ukupniPredavanja += resumPredavanja;
        let resumVjezbe = +$(this).find("td#vjezbe").text();
        ukupniVjezbe += resumVjezbe;
      });
      showSum(ukupniECTS, ukupniSati, ukupniPredavanja, ukupniVjezbe);
    }
  );
}
