import axios from 'axios'
axios.defaults.withCredentials = true;
const baseUrl = '/api/session'

const getSession = async() => {
  const response = await axios.get(baseUrl)
  const user = response.data
  return user
}

export default { 
  getSession
}