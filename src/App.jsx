import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import phonebookservices from './services/phonebookservices';
import Notification from './components/Notification';
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null)

  useEffect(() =>  {
    phonebookservices
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  



  const addPerson = (event) => {
    event.preventDefault()

    // Check if the name exists in the array
    const personToUpdate = persons.find(person => person.name === newName);

    if (personToUpdate) {
      const confirmUpdate = window.confirm(`${newName} already exists in the phoneBook. Would you like to replace the old number with a new one?`);
      if (confirmUpdate) {
        const updatedPerson = { ...personToUpdate, number: newNumber };
        phonebookservices
        .updatePerson(personToUpdate.id, updatedPerson)
        .then(response => {
          setPersons(persons.map(p => p.id !== personToUpdate.id ? p : response.data))
          setNewName('')
          setNewNumber('')
          setNotification({message: `Information of '${newName}' has been updated`, type: 'success'})

        })
        .catch(error => {
          console.log('Error updating person:', error)
          setNotification({message: `Information of '${newName}' has an error`, type: error})
        });
    }
  } else {
      // Add the person as regular.
    const personObject = {
      name: newName,
      number: newNumber
    }
  

  phonebookservices
    .create(personObject)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewNumber('')
      setNewName('')
      setNotification({ message: `Added '${newName}'`, type: 'success' });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    })
  }
}


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChanged = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => { // Handler for search term input
    setSearchTerm(event.target.value);
  };

  const handleDelete = id => {
    const personToDelete = persons.find(p => p.id === id);
    const confirmDelete = window.confirm(`Are you sure you want to delete ${personToDelete.name}?`);
    
    if (confirmDelete) {
    phonebookservices
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        console.log('Error deleting person:', error)
      })
    }
  }




    // If it is true and does exist, then only show the names that incldue that. Else show the whole list.
  const filteredPersons = searchTerm
  ? persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
  : persons;
  

  return (
    <div>
      <Filter 
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}/>
      
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChanged={handleNumberChanged}/>

      <h3> Numbers </h3>
      <Persons persons={filteredPersons} onDelete={handleDelete}/>
      <Notification notification={notification} />
    </div>
  )
}
export default App