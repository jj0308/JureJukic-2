document.getElementById("registerForm").addEventListener("submit", function(event) {
  event.preventDefault();
  let username = document.getElementById("inputUsername").value;
  let password = document.getElementById("inputPassword").value;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://www.fulek.com/data/api/user/register", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let json = JSON.parse(xhr.responseText);

  
      

      window.location.href ="/html/prijava.html"

   }
  };
  let data = JSON.stringify({
    username: username,
    password: password
  });
  xhr.send(data);
});
