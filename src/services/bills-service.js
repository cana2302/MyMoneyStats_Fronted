import axios from 'axios';
axios.defaults.withCredentials = true;

const baseUrl = '/api/bills';

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async() => {
  const config = { headers: { Authorization: token }, }

  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async billObject => {
  const config = { headers: { Authorization: token }, }

  const response = await axios.post(baseUrl, billObject, config)
  return response.data
}

const _delete = async id_bill => {
  const config = { headers: { Authorization: token }, }

  const response = axios.delete(`${baseUrl}/${id_bill}`, config);
  console.log('Deleted bill');
  return response.data

}

export default { 
  getAll, create, _delete, setToken
}