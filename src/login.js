document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  let username = document.getElementById("inputUsername").value;
  let password = document.getElementById("inputPassword").value;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://www.fulek.com/data/api/user/login", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let json = JSON.parse(xhr.responseText);
      let token = json.data.token;
      localStorage.setItem("token", token);
      let username = json.data.username;
     localStorage.setItem("uname", username);
      let poruka = document.getElementById("poruka")
      poruka.innerHTML = ("Uspjesna prijava :) Natrag na pocetnu 3,2,1")
      setTimeout(function() {
        window.location.href = "../html/index.html";
      }, 3000);
    }else if (xhr.readyState !== 4) {
      let poruka = document.getElementById("poruka")
      poruka.innerHTML = ("User not found");
    }

  };
  let data = JSON.stringify({
    username: username,
    password: password,
  });
  xhr.send(data);
});

