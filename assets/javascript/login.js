document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  let userEmail = document.getElementById("inputEmailLogin").value;
  let userPassword = document.getElementById("inputPasswordLogin").value;
  let listUser = JSON.parse(localStorage.getItem("tableUser")) || [];
  let user = listUser.find((usuario) => usuario.email == userEmail);

  if (user != null && user.password == userPassword) {
    document.getElementById("alertLoginSucess").classList.add("open");
    setTimeout(() => {
      document.getElementById("alertLoginSucess").classList.remove("open");
    }, 3000);
    localStorage.setItem("userLogged", JSON.stringify(user));
    window.location.href = "gerenciadordetarefa.html";
  } else {
    document.getElementById("alertLoginFailure").classList.add("open");
    setTimeout(() => {
      document.getElementById("alertLoginFailure").classList.remove("open");
    }, 3000);
  }
});
