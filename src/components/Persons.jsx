const Persons = (props) => {

  return (
    <ul>
      {props.filteredPersons.map(person =>
        <li key={person.id}>
          {person.name}&nbsp;{person.number}&nbsp;&nbsp;
          <button onClick={() => props.handleDelete(person.id,person.name)}>Delete</button>
        </li>
      )}
    </ul>
  )
}

export default Persons