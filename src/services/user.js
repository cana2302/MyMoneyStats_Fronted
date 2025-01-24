import axios from 'axios'

const baseUrl = '/api/user'

const createUser = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { createUser }