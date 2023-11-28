import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('');

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data) 
      })
  }
  
  useEffect(hook, [])
  



  const addPerson = (event) => {
    event.preventDefault()

    // Check if the name exists in the array
    const nameExists = persons.some(person => person.name === newName);

    if (nameExists) {
      alert(`${newName}  already exists in the phoneBook.`)
    } else {
      // Add the person as regular.
    const personObject = {
      name: newName,
      number: newNumber
    }
    console.log(personObject)
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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
      <Persons persons={filteredPersons}/>
    </div>
  )
}
export default App