import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import { Component } from 'react';

export class App extends Component {
  constructor() {
    super();

    this.state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],

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
