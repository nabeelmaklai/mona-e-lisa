import { useState } from 'react'
import { LogInUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const Login = ({ setUser }) => {
  const [formValues, setFormValues] = useState({ email: '', password: '' })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await LogInUser(formValues)

    setFormValues({ email: '', password: '' })
    setUser(payload)
    if (payload) {
      navigate(`/user/${payload.id}`)
    }
  }

  return (
    <div className="centers">
      <div className="form">
        <form className="sub-form" onSubmit={handleSubmit}>
          <div className="upper-form">
            <label htmlFor="email">
              <b>Email :</b>
            </label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Your Email"
              value={formValues.email}
              required
            />
            <br />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={formValues.password}
              required
            />
          </div>
          <button
            type="submit"
            className="loginBtn"
            disabled={!formValues.email || !formValues.password}
            onSubmit={handleSubmit}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
export default Login
