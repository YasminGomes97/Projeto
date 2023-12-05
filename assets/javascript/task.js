class Task {
  constructor(
    id,
    idUser,
    title,
    dateStart,
    dateEnd,
    timeStart,
    timeEnd,
    description,
    status
  ) {
    this.id = id;
    this.idUser = idUser;
    this.title = title;
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
    this.timeStart = timeStart;
    this.timeEnd = timeEnd;
    this.description = description;
    this.status= status;
  }
}
