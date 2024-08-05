import { useState } from 'react';

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, handleAddPerson }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleAddPerson();
      setErrorMessage(null); // Clear the error message if successful
    } catch (error) {
      setErrorMessage(error.response.data.error); // Set the error message from the response
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </form>
  );
};

export default PersonForm;
