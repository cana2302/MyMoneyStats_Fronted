import axios from 'axios';
const baseUrl = '/api/bills';

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = billObject => {
  const request = axios.post(baseUrl, billObject)
  return request.then(response => response.data)
}

const _delete = id_bill => {
  const request = axios.delete(`${baseUrl}/${id_bill}`);
  console.log('Deleted bill');
  return request.then(response => response.data)
}

export default { 
  getAll, create, _delete
}