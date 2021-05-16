class Sms {
  constructor(uid, name, sms) {
    this.uid = uid;
    this.name = name;
    this.sms = sms;
  }
}

class ChatSms {
  constructor() {
    this.sms = [];
    this.users = {};
  }

  get last10() {
    this.sms = this.sms.splice(0, 10);
    return this.sms;
  }

  get usersArray() {
    return Object.values(this.users); // [{}, {}, {}...]
  }

  sendSms(uid, name, sms) {
    this.sms.unshift(new Sms(uid, name, sms));
  }

  connectUser(user) {
    this.users[user.id] = user;
  }

  disconnectUser(id) {
    delete this.users[id];
  }
}

module.exports = ChatSms;
