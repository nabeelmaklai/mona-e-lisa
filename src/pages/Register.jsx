import { useState } from "react"
import { RegisterUser } from "../services/Auth"
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
    // <div className="signin col">
      <div className="form">
        <form className="sub-form" onSubmit={handleSubmit}>
          <div className="upper-form">
            {/* <h2 className="noidea">no idea</h2> */}
            <label htmlFor="name"><b>Name :</b></label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="Your beautiful name"
              value={formValues.name}
              required
            /><br/>
          </div>
          <div className="input-wrapper">
            <label htmlFor="email"><b>Email :</b></label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Your Email"
              value={formValues.email}
              required
            /><br/>
          </div>
          <div className="input-wrapper">
            <label htmlFor="password"><b>Password :</b></label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={formValues.password}
              required
            /><br/>
          </div>
          <div className="input-wrapper">
            <label htmlFor="confirmPassword"><b>Confirm Password :</b></label>
            <input
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              required
            /><br/>
          </div>
          <button className="loginBtn"
            disabled={
              !formValues.email ||
              (!formValues.password &&
                formValues.confirmPassword === formValues.password)
            }
          >
           <b>Login</b> 
          </button>
        </form>
      </div>
    // </div>
  )
}
export default Register
