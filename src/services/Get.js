import Client from './api'

export const GetArt = async () => {
  try {
    const response = await Client.get('/arts')
    return response.data
  } catch (error) {
    throw error
  }
}



export const ShowContent = async (userId) => {
  console.log(userId)
  try {
    const response = await Client.get(`/users/${userId}`)
    console.log('responce from /users/:id', response.data)
    return response.data
  } catch (error) {
    // throw error
    console.log('error fetching stuff', error)
  }
}
