let user = JSON.parse(localStorage.getItem("userLogged"));
document.getElementById("listTableBody").innerHTML = "";
generationListTask(user.id);
document.getElementById('userName').innerText=user.name
//Create Task
document.getElementById("taks_form").addEventListener("submit", (e) => {
  e.preventDefault();
  let taskRegistration = new Task();
  taskRegistration.title = document.getElementById("inputTitle").value;
  taskRegistration.dateStart = document.getElementById("inputDateStart").value;
  taskRegistration.dateEnd = document.getElementById("inputDateEnd").value;
  taskRegistration.timeStart = document.getElementById("inputTimeStart").value;
  taskRegistration.timeEnd = document.getElementById("inputTimeEnd").value;
  taskRegistration.status = 0;
  taskRegistration.description =
    document.getElementById("inputDescription").value;
  let listTask = JSON.parse(localStorage.getItem("tableTask")) || [];
  taskRegistration.id = listTask.length + 1;
  let user = JSON.parse(localStorage.getItem("userLogged"));
  taskRegistration.idUser = user.id;
  listTask.push(taskRegistration);
  localStorage.setItem("tableTask", JSON.stringify(listTask));
  document.getElementById("listTableBody").innerHTML = "";
  generationListTask(user.id);
});

// Generation List
function generationListTask(userId) {
  let listBody = document.getElementById("listTableBody");
  let listTask = JSON.parse(localStorage.getItem("tableTask")) || [];
  let userTasks = listTask.filter((task) => task.idUser == userId);

  if (userTasks.length > 0) {
    userTasks.map((task) => {
      listBody.innerHTML += `
    <tr data-id="${
      task.id
    }" class="task__row-table" data-toggle="modal" data-target="#exampleModal">
        <td>${task.title}</td>
        <td>${(() => {
          const dateStart = new Date(task.dateStart);
          const formatter = Intl.DateTimeFormat("pt-BR", {
            timeZone: "UTC",
            dateStyle: "short",
          });
          return formatter.format(dateStart);
        })()} às ${task.timeStart}</td>
        <td>${(() => {
          const dateEnd = new Date(task.dateEnd);
          const formatter = Intl.DateTimeFormat("pt-BR", {
            timeZone: "UTC",
            dateStyle: "short",
          });
          return formatter.format(dateEnd);
        })()} às ${task.timeEnd}</td>
        <td class="${(() => {
          let dateStart = new Date(`${task.dateStart}T${task.timeStart}`);
          let dateEnd = new Date(`${task.dateEnd}T${task.timeEnd}`);
          let dateNow = new Date();
          let colorStatus;

          if (task.status != 3) {
            if (dateEnd < dateNow) {
              colorStatus = "text-danger";
              task.status = 2;
            } else if (dateStart <= dateNow && dateEnd > dateNow) {
              colorStatus = "text-primary";
              task.status = 1;
            } else if (dateStart > dateNow) {
              colorStatus = "text-warning";
              task.status = 0;
            }
          } else {
            colorStatus = "text-success";
            task.status = 3;
          }
          return colorStatus;
        })()}">
${(() => {
  switch (task.status) {
    case 0:
      return "Pendente";
    case 1:
      return "Em Andamento";
    case 2:
      return "Em Atraso";
    case 3:
      return "Realizada";
  }
})()}</td>
        <td ><a href="gerenciadordetarefas2.html"><button class="btn btn-warning w-100">Alterar</button></a></td>
    </tr>`;
    });
  }
}

//Modal
document.querySelector("#listTableBody").addEventListener("click", (event) => {
  let targetElement = event.target;
  if (targetElement.tagName === "TD") {
    let taskRow = targetElement.closest("tr");
    let taskId = Number(taskRow.dataset.id);
    let tasks = JSON.parse(localStorage.getItem("tableTask"));
    let taskSelected = tasks.find((task) => task.id === taskId);
    let modalTitle = document.getElementById("exampleModalLabel");
    modalTitle.innerText = taskSelected.title;
    let modalBody = document.getElementById("modal__body");
    modalBody.innerHTML = `
        <p class="text-dark">${taskSelected.description}</p>
        `;
    //Acionando o Meu Modal
    var target = taskRow.getAttribute("data-target");
    var modalElement = document.querySelector(target);
    var modal = new bootstrap.Modal(modalElement);
    var closeButton = modalElement.querySelector(".close");
    closeButton.addEventListener("click", function () {
      modal.hide();
    });
    modal.show();
  }
});

document.querySelector("#listTableBody").addEventListener("click", (event) => {
  let targetElement = event.target;
  if (targetElement.tagName === "BUTTON" && targetElement.closest("td")) {
    let tdElement = targetElement.closest("td");
    let trElement = tdElement.closest("tr");
    let taskId = Number(trElement.dataset.id);
    let tasks = JSON.parse(localStorage.getItem("tableTask"));
    let taskSelected = tasks.find((task) => task.id === taskId);
    localStorage.setItem("taskSelect", JSON.stringify(taskSelected));
  }
});
