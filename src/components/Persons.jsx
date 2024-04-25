const Persons = ({persons, onDelete}) => {
console.log('This is the Object', persons);

return (
<ul>
        {persons.map(person => 
          <li key={person.id}>{person.name} <strong>{person.number}</strong> <button onClick={() => onDelete(person.id)}>Delete</button></li>)}
      </ul>
)
        }

export default Persons