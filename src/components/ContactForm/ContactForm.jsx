import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

const { Component } = require('react');

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  // Metoda handleSubmit jest wywoływana po zatwierdzeniu formularza (btn) i dodaje nowy kontakt do listy za pomocą przekazanej przez propsy funkcji onSubmit.
  handleSubmit = evt => {
    evt.preventDefault();
    const { name, number } = this.state;

    const newContact = { id: nanoid(), name, number };

    //this.props.onSubmit(newContact), gdzie newContact jest przekazywany do komponentu App jako argument funkcji onSubmit. W komponencie App, ta funkcja obsługuje dodawanie nowego kontaktu do listy kontaktów poprzez aktualizację stanu komponentu App przy użyciu metody setState.
    this.props.onSubmit(newContact);

    this.resetForm();
  };

  // Metoda handleChange jest wywoływana przy zmianie wartości pól formularza i aktualizuje odpowiednie wartości w stanie komponentu.
  handleChange = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value });
  };

  // Metoda resetForm resetuje wartości pól formularza do pustych.
  resetForm = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <label className={css.label}>
          Name
          <input
            className={css.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={this.handleChange}
          />
        </label>
        <label className={css.label}>
          Number
          <input
            className={css.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={this.handleChange}
          />
        </label>

        <button className={css['btn-submit']} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  handleSubmit: PropTypes.func,
};
