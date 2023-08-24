export default class PeepModel {
  constructor(username, date, message, _id = null) {
    this.username = username;
    this.date = date;
    this.message = message;
    this._id = _id;
  }
}
