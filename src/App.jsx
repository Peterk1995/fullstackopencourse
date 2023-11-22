import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: 416}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('');

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
      <h2>Phonebook</h2>
      Filter <input 
        value={searchTerm} // Use the searchTerm state here
        onChange={handleSearchChange}/>


      <form onSubmit={addPerson}>
        <div>
       
        </div>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}/>
          <div>
          number: <input
          value={newNumber}
          onChange={handleNumberChanged}/>
          </div>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person => 
          <li key={person.name}>{person.name} <strong>{person.number}</strong></li>)}
      </ul>
    </div>
  )
}
export default App