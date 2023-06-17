import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import { useState, useEffect } from 'react';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState([
    { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
    { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
    { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
    { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
  ]);

  // const saveContacts = localStorage.getItem('contacts');
  // const parseContacts = JSON.parse(saveContacts);

  // contacts: saveContacts ? parseContacts : [],

  const addContact = newContact => {
    const isExists = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isExists) {
      return alert(`${isExists.name} is already in contacts.`);
    }

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  useEffect(() => {
    try {
      const serializedState = JSON.stringify(contacts);
      localStorage.setItem('contacts', serializedState);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }, [contacts]);

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
    setContacts(prevContact =>
      prevContact.filter(contact => contact.id !== id)
    );

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
