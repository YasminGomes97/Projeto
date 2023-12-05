document.getElementById("registrationForm").addEventListener("submit", (e) => {
  e.preventDefault();
  let userRegistration = new User();
  userRegistration.name = document.getElementById("inputName").value;
  userRegistration.email = document.getElementById("inputEmail").value;
  userRegistration.password = document.getElementById("inputPassword").value;
  let listUser= JSON.parse(localStorage.getItem("tableUser")) || [];
  let userExist= listUser.find(u=> u.email == userRegistration.email);

  if(userExist==null){
    userRegistration.id = listUser.length + 1;
    listUser.push(userRegistration);
    localStorage.setItem("tableUser", JSON.stringify(listUser));
    alert ("Usuário Cadastrado com Sucesso, efetue login.")
  }else{
    alert("Usuário já Cadastrado, efetue login.")
  }

});
