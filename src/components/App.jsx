import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import { useState, useEffect } from 'react';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState([]);

  // const saveContacts = localStorage.getItem('contacts');
  // const parseContacts = JSON.parse(saveContacts);

  // contacts: [
  //   { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  //   { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  //   { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  //   { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
  // ],

  // contacts: saveContacts ? parseContacts : [],

  // Metoda handleSubmit jest wywoływana przy dodawaniu nowego kontaktu i dodaje nowy kontakt do listy kontaktów w stanie komponentu. NewContact pochodzi z ContactForm z metody handleSubmit. Po klinięciu w btn, nowy konatk wysyłany jest tu.
  const addContact = newContact => {
    const isExists = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isExists) {
      return alert(`${isExists.name} is already in contacts.`);
    }

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  //Dodanie danych do local storage + Dodanie ZAKTUALIZOWANYCH danych do local storage
  useEffect(() => {
    try {
      const serializedState = JSON.stringify(contacts);
      localStorage.setItem('contacts', serializedState);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }, [contacts]);

  // Metoda getContacts zwraca aktualną listę kontaktów.
  const getContacts = (contacts, filter) => {
    const normalizeName = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeName)
    );
  };

  const changeFilter = evt => {
    setFilter(evt.currentTarget.value);
  };

  const deleteContact = id => {
    setContacts(prev => ({
      contacts: prev.contacts.filter(conact => conact.id !== id),
    }));

    localStorage.removeItem('id');
  };

  return (
    <div className="wraper">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChangeFilter={changeFilter} />
      {contacts.length ? (
        <ContactList
          contacts={getContacts(contacts, filter)}
          onDelete={deleteContact}
        />
      ) : (
        <p>No contact!</p>
      )}
    </div>
  );
};
