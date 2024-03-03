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
    return response.data
  } catch (error) {
    throw error
  }
}

export const showArt = async (artId) => {
  try {
    const response = await Client.get(`/arts/${artId}`)

    return response.data
  } catch (error) {
    // throw error
    console.log('error fetching stuff', error)
  }
}

export const showCollection = async (collectionId) => {
  try {
    const response = await Client.get(`/collections/${collectionId}`)
    console.log('responce from /collections/:id', response.data)

    return response.data
  } catch (error) {
    // throw error
    console.log('error fetching stuff', error)
  }
}
