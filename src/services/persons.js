import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = personObject => {
  const request = axios.post(baseUrl, personObject)
  return request.then(response => response.data)
}

const _delete = id_person => {
  const request = axios.delete(`${baseUrl}/${id_person}`);
  console.log('Deleted name');
  return request.then(response => response.data)
}

const updateNumber = (checkId, updatePerson) => {
  const request = axios.put(`${baseUrl}/${checkId}`, updatePerson);
  console.log('The new number was update!');
  return request.then(response => response.data)
}

export default { 
  getAll, create, _delete, updateNumber
}