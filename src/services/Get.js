import Client from './api'

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

export const showArt = async (artId) => {
  try {
    const response = await Client.get(`/arts/${artId}`)
    // console.log('responce from /arts/:id', response.data)

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
