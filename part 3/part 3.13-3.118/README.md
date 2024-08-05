# Phonebook Application - Exercise Documentation

This document outlines the modifications made to the Phonebook application to complete exercises 3.13 through 3.18.

## Exercises Overview

### 3.13: Phonebook Database, Step 1

- **Objective**: Change the fetching of all phonebook entries so that the data is fetched from the database.
- **Steps Taken**:
  1. Updated the backend to fetch phonebook entries from the database.
  2. Ensured that the frontend correctly displays data fetched from the backend.

### 3.14: Phonebook Database, Step 2

- **Objective**: Change the backend so that new numbers are saved to the database. Verify that the frontend still works after the changes.
- **Steps Taken**:
  1. Updated the backend to save new phonebook entries to the database.
  2. Verified that the frontend still functions as expected with the updated backend.

### 3.15: Phonebook Database, Step 3

- **Objective**: Change the backend so that deleting phonebook entries is reflected in the database.
- **Steps Taken**:
  1. Modified the backend to handle deletion of phonebook entries in the database.
  2. Verified that deletion operations are correctly reflected in both the frontend and backend.

### 3.16: Phonebook Database, Step 4

- **Objective**: Move the error handling of the application to a new error handler middleware.
- **Steps Taken**:
  1. Created a new error handler middleware in the backend.
  2. Updated the backend to use this middleware for handling errors.

### 3.17*: Phonebook Database, Step 5

- **Objective**: Modify the backend to support updating phone numbers if a person with the same name already exists in the phonebook.
- **Steps Taken**:
  1. Updated the backend to handle HTTP PUT requests to update existing phonebook entries.
  2. Verified that the frontend correctly updates phone numbers and reflects changes immediately.

### 3.18*: Phonebook Database, Step 6

- **Objective**: Update the handling of the `api/persons/:id` and `info` routes to use the database, and verify that they work directly with the browser, Postman, or VS Code REST client.
- **Steps Taken**:
  1. Updated the backend routes to interact with the database for `api/persons/:id` and `info`.
  2. Tested the routes using the browser, Postman, and VS Code REST client to ensure they work as expected.

## Frontend Changes

1. **Automatic Refresh After Add/Update/Delete**:
   - Modified the `App.jsx` to automatically refresh the list of persons after adding, updating, or deleting a person. This was achieved by refetching the data from the server and updating the state accordingly.

   ```jsx
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
