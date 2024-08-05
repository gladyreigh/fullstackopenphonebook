import React, { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Notification from './Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialPersons = await personService.getAll();
        setPersons(initialPersons);
      } catch (error) {
        console.error('Error fetching persons:', error);
        setErrorMessage('Failed to fetch persons');
        setTimeout(() => setErrorMessage(null), 5000);
      }
    };
    fetchData();
  }, []);

  const fetchPersons = async () => {
    try {
      const updatedPersons = await personService.getAll();
      setPersons(updatedPersons);
    } catch (error) {
      console.error('Error fetching persons:', error);
      setErrorMessage('Failed to fetch persons');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleAddPerson = async (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        try {
          await personService.update(existingPerson._id, updatedPerson);
          await fetchPersons(); // Refresh the list after update
          setNewName('');
          setNewNumber('');
          setNotification(`Updated ${newName}'s number`);
          setTimeout(() => setNotification(null), 5000);
        } catch (error) {
          console.error('Error updating person:', error);
          setErrorMessage(`Failed to update ${newName}'s number`);
          setTimeout(() => setErrorMessage(null), 5000);
        }
      }
      return;
    }

    const newPerson = { name: newName, number: newNumber };
    try {
      await personService.create(newPerson);
      await fetchPersons(); // Refresh the list after adding
      setNewName('');
      setNewNumber('');
      setNotification(`Added ${newName}`);
      setTimeout(() => setNotification(null), 5000);
    } catch (error) {
      console.error('Error adding person:', error);
      setErrorMessage('Failed to add new person');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleDeletePerson = async (id) => {
    if (!id) {
      console.error('Cannot delete person: ID is undefined or invalid');
      setErrorMessage('Failed to delete person');
      return;
    }

    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await personService.remove(id);
        await fetchPersons(); // Refresh the list after deletion
        setNotification('Person deleted');
        setTimeout(() => setNotification(null), 5000);
      } catch (error) {
        console.error('Error deleting person:', error);
        setErrorMessage('Failed to delete person');
        setTimeout(() => setErrorMessage(null), 5000);
      }
    }
  };

  const filteredPersons = persons.filter(person =>
    person.name && person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type="success" />
      <Notification message={errorMessage} type="error" />
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleAddPerson={handleAddPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} handleDeletePerson={handleDeletePerson} />
    </div>
  );
};

export default App;
