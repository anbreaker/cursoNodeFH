class Users {
  constructor() {
    this.persons = [];
  }

  addPerson(id, name) {
    let person = { id, name };

    this.persons.push(person);

    return this.persons;
  }

  getPerson(id) {
    const person = this.persons.filter((person) => person.id === id)[0];

    return person;
  }

  getPersons() {
    return this.persons;
  }

  getPersonsPerRoom() {
    //...
  }

  deletePerson(id) {
    const personDelete = this.getPerson(id);

    this.persons = this.persons.filter((person) => person.id != id);

    return personDelete;
  }
}

module.exports = { Users };
