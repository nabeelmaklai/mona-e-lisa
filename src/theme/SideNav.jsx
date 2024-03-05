import HomeIcon from "@mui/icons-material/Home"

import AccountCircleIcon from "@mui/icons-material/AccountCircle"

import LogoutIcon from "@mui/icons-material/Logout"
import { Link } from "react-router-dom"
import Home from "@mui/icons-material/Home"
import AppRegistrationIcon from "@mui/icons-material/AppRegistration"
import LoginIcon from "@mui/icons-material/Login"
const SideNav = ({ user, handleLogOut }) => {
  let userOptions
  // console.log(user.id);
  if (user) {
    userOptions = (
      <div className="aboveSidenav">
      <div className="sidenav">
        <div className="sidenav__buttons">
          <button className="sidenav__button">
            <HomeIcon />
            <span>
              {" "}
              <Link to="/">Home</Link>
            </span>
          </button>
          <button className="sidenav__button">
            <AccountCircleIcon />
            <span>
              <Link to={`/user/${user.id}`}>profile</Link>
            </span>
          </button>
          <button className="sidenav__button">
            <LogoutIcon />

            <span>
              <Link onClick={handleLogOut} to="/">
                Sign Out
              </Link>
            </span>
          </button>
        </div>
        </div>
      </div>
    )
  }
  const publicOptions = (
    <div className="sidenav">
      <button className="sidenav__button">
        <HomeIcon />
        <span>
          {" "}
          <Link to="/">Home</Link>
        </span>
      </button>

      {/* <Link to="/user/:id">profile</Link> */}
      <button className="sidenav__button">
        <LoginIcon />
        <span>
          <Link to="/login">login</Link>
        </span>
      </button>

      <button className="sidenav__button">
        <AppRegistrationIcon />
        <span>
          <Link to="/register">Register</Link>
        </span>
      </button>
    </div>
  )

  return <header className="aboveSidenav">{user ? userOptions : publicOptions}</header>
}
export default SideNav
