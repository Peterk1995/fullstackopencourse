const personForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChanged}) => (
<form onSubmit={addPerson}>
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
)

export default personForm