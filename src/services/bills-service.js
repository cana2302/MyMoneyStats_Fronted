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

export default { 
  getAll, create
}