const Persons = ({persons}) => {
console.log('This is the Object', persons);

return (
<ul>
        {persons.map(person => 
          <li key={person.name}>{person.name} <strong>{person.number}</strong></li>)}
      </ul>
)
        }

export default Persons