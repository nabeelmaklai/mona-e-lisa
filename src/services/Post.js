import Client from './api'

export const addArt = async (data) => {
  try {
    const response = await Client.post('/arts', data)

    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const createCollection = async (data) => {
  try {
    const response = await Client.post('/collections', data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
