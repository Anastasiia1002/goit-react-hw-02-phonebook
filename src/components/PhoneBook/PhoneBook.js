import React from 'react';
import { nanoid } from 'nanoid';
// import PropTypes from 'prop-types';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

class PhoneBook extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = ({ name, number }) => {
    const lowerCaseName = name.toLowerCase();
    let someContacts = this.state.contacts;
    if (someContacts.some(e => e.name.toLowerCase() === lowerCaseName)) {
      return alert(`${name} is already in contacts`);
    } else {
      const contact = {
        id: nanoid(),
        name,
        number,
      };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  handleFilterChange = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  filterContacts = () => {
    // let filterContact = [];

    if (this.state.filter) {
      const filterLow = this.state.filter.toLowerCase();
      return this.state.contacts.filter(
        contact =>
          contact.name.includes(filterLow) ||
          contact.name.toLowerCase().includes(filterLow)
      );
    }
    return this.state.contacts;

    // return filterContact;
  };

  delContact = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(el => el.id !== id),
    }));
  };
  render() {
    const { filter } = this.state;
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmitForm={this.formSubmitHandler} />

        <h2>Contacts</h2>
        <Filter filter={filter} handleFilterChange={this.handleFilterChange} />
        <ContactList
          filterContacts={this.filterContacts}
          delContact={this.delContact}
        />
      </div>
    );
  }
}
// PhoneBook.propTypes = {
//   formSubmitHandler: PropTypes.func.isRequired,
//   delContact: PropTypes.func.isRequired,
//   filterContacts: PropTypes.func.isRequired,
//   handleFilterChange: PropTypes.func.isRequired,
// };
export default PhoneBook;
