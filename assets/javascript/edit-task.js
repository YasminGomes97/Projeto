let task = JSON.parse(localStorage.getItem("taskSelect"));
document.getElementById("inputTitle").value = task.title;
document.getElementById("inputDateStart").value = task.dateStart;
document.getElementById("inputTimeStart").value = task.timeStart;
document.getElementById("inputDateEnd").value = task.dateEnd;
document.getElementById("inputTimeEnd").value = task.timeEnd;
document.getElementById("inputDescription").value = task.description;

if (task.status == 3) {
    document.getElementById('alterButton').innerHTML =`
    <button type="button" class="btn btn-primary" id="alterTaskButton">Alterar Tarefa</button>
    <button type="button" class="btn btn-danger" id="deleteTaskButton">Excluir Tarefa</button>
    <button type="button" class="btn btn-warning" id="alterStatus">Marcar como não realizada</button>
    <a href="gerenciadordetarefa.html"><button type="button" class="btn btn-secondary">Cancelar</button></a>
    ` 
    

}else{
    document.getElementById('alterButton').innerHTML = `
    <button type="button" class="btn btn-primary" id="alterTaskButton">Alterar Tarefa</button>
    <button type="button" class="btn btn-danger" id="deleteTaskButton">Excluir Tarefa</button>
    <button type="button" class="btn btn-success" id="alterStatus">Marcar como realizada</button>
    <a href="gerenciadordetarefa.html"><button type="button" class="btn btn-secondary">Cancelar</button></a>
    `
}
document
  .querySelector("#alterTaskButton")
  .addEventListener("click", (event) => {
    event.preventDefault();
    task.title = document.getElementById("inputTitle").value;
    task.dateStart = document.getElementById("inputDateStart").value;
    task.timeStart = document.getElementById("inputTimeStart").value;
    task.dateEnd = document.getElementById("inputDateEnd").value;
    task.timeEnd = document.getElementById("inputTimeEnd").value;
    task.description = document.getElementById("inputDescription").value;
    let listTasks = JSON.parse(localStorage.getItem("tableTask"));
    let indexTask = listTasks.findIndex((taskList) => taskList.id == task.id);
    listTasks[indexTask] = task;
    localStorage.setItem("tableTask", JSON.stringify(listTasks));
    alert("Tarefa alterada com Sucesso");
    window.location.href = "gerenciadordetarefa.html";
  });

document
  .querySelector("#deleteTaskButton")
  .addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("confirmDeleteTaks").classList.add("show");
  });

document
  .querySelector("#confirmDeleteButtons")
  .addEventListener("click", (event) => {
    document.getElementById("confirmDeleteTaks").classList.remove("show");
    let buttonClicked = event.target.dataset.id;
    if (buttonClicked === "1") {
      let listTasks = JSON.parse(localStorage.getItem("tableTask"));
      let newListTask = listTasks.filter((taskList) => taskList.id != task.id);
      localStorage.setItem("tableTask", JSON.stringify(newListTask));
      alert("Tarefa Excluida com Sucesso");
      window.location.href = "gerenciadordetarefa.html";
    }
  });

  
document.querySelector('#alterStatus').addEventListener('click', (event) => {
    event.preventDefault()

    if(task.status!=3){
        task.status = 3
        let listTask = JSON.parse(localStorage.getItem('tableTask'))
        let taskIndex = listTask.findIndex(taskList => taskList.id == task.id)
        listTask[taskIndex] = task
        localStorage.setItem('tableTask', JSON.stringify(listTask))
            alert("Status Alterado com Sucesso")
            window.location.href = 'gerenciadordetarefa.html'
    }else{
        task.status = 0
        let listTask = JSON.parse(localStorage.getItem('tableTask'))
        let taskIndex = listTask.findIndex(taskList => taskList.id == task.id)
        listTask[taskIndex] = task
        localStorage.setItem('tableTask', JSON.stringify(listTask))
            alert("Status Alterado com Sucesso")
            window.location.href = 'gerenciadordetarefa.html'
    }

}) 