import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import { Component } from 'react';

export class App extends Component {
  constructor() {
    super();

    const saveContacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(saveContacts);

    this.state = {
      // contacts: [
      //   { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      //   { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      //   { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      //   { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
      // ],

      contacts: saveContacts ? parseContacts : [],

      filter: '',
    };
  }

  // Metoda handleSubmit jest wywoływana przy dodawaniu nowego kontaktu i dodaje nowy kontakt do listy kontaktów w stanie komponentu. NewContact pochodzi z ContactForm z metody handleSubmit. Po klinięciu w btn, nowy konatk wysyłany jest tu.
  handleSubmit = newContact => {
    const { contacts } = this.state;
    const isExists = contacts.find(
      conact => conact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isExists) {
      return alert(`${isExists.name} is already in contacts.`);
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  //Dodanie danych do local storage
  componentDidMount() {
    const { contacts } = this.state;
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  //Dodanie ZAKTUALIZOWANYCH danych do local storage
  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  // Metoda getContacts zwraca aktualną listę kontaktów.
  getContacts = () => {
    const { contacts, filter } = this.state;
    const normalizeName = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeName)
    );
  };

  changeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(conact => conact.id !== id),
    }));

    localStorage.removeItem('id');
  };

  render() {
    const { filter, contacts } = this.state;

    return (
      <div className="wraper">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmit} />

        <h2>Contacts</h2>
        <Filter value={filter} onChangeFilter={this.changeFilter} />
        {contacts.length ? (
          <ContactList
            contacts={this.getContacts()}
            onDelete={this.deleteContact}
          />
        ) : (
          <p>No contact!</p>
        )}
      </div>
    );
  }
}
