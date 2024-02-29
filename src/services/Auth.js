import Client from "./api"

export const RegisterUser = async (data) => {
  try {
    const response = await Client.post("/auth/register", data)
    console.log(response.data)
    return response.data
  } catch (error) {
    throw error
  }
}
