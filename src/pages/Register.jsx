import { useState } from "react"
import axios from "axios"
const Register = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    await RegisterUser({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
    })
    setFormValues({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
  }
  return (
    <div>
      <h1></h1>
    </div>
  )
}
export default Register
