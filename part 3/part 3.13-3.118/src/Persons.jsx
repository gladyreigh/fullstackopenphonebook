import React from 'react';

const Persons = ({ persons, handleDeletePerson }) => {
  return (
    <div>
      {persons.map(person => (
        <div key={person._id}>
          {person.name} {person.number}
          <button onClick={() => handleDeletePerson(person._id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
