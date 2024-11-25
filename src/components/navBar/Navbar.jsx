import { Link } from "react-router-dom";
import "./nav.css";
import { useContext, useEffect, useRef } from "react";
import { GContext } from "../../context/GlobalContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { FaUser } from "react-icons/fa";
import logo from "../../Assets/logo.png";


const Navbar = ({ background, linkColor }) => {
  const { user, setUser } = useContext(GContext);
  const nav = useRef();
  const userMenu = useRef();
  const handleBar = () => {
    nav.current.classList.toggle("nav_active");
  };
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("logout successful");
        setUser(null);
      })
      .catch(() => {
        console.log("something went wrong");
      });
  };
  const handleUserMenu = () => {
    userMenu.current.classList.toggle("userMenu_active");
  };
  return (
    <div
      className="container n"
      style={{ backgroundColor: background ? background : "transparent" }}
    >
      <div className="header">
        <div className="logo_top">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="navbar" ref={nav}>
          <div className="logo_nav">
            <Link to={"/"}>
              <img src={logo} alt="" />
            </Link>
          </div>
          <nav>
            <ul>
              <li>
                <Link
                  to={"/"}
                  style={{ color: linkColor ? linkColor : "white" }}
                >
                  <span></span>Home
                </Link>
              </li>
              <li>
                <Link
                  to={"/cars"}
                  style={{ color: linkColor ? linkColor : "white" }}
                >
                  <span></span>Cars
                </Link>
              </li>
              <li>
                <Link
                  to={"/contact"}
                  style={{ color: linkColor ? linkColor : "white" }}
                >
                  <span></span>Contact
                </Link>
              </li>
              {user ? (
                <div
                  className="logoutDiv"
                  style={{ color: linkColor ? linkColor : "white" }}
                >
                  {user?.profileImage ? (
                    <img
                      src={user?.profileImage}
                      alt="Profile"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50px",
                      }}
                      onClick={handleUserMenu}
                    />
                  ) : (
                    <FaUser onClick={handleUserMenu} />
                  )}
                  <div className="userMenu" ref={userMenu}>
                    <span>
                      <Link to="/profile">Profile</Link>{" "}
                    </span>
                    <span onClick={handleLogout}>Logout</span>
                  </div>
                </div>
              ) : (
                <li>
                  <Link
                    to={"/login"}
                    style={{ color: linkColor ? linkColor : "white" }}
                  >
                    <span></span>Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <div
          className="bar"
          style={{ color: linkColor ? linkColor : "white" }}
          onClick={handleBar}
        >
          X
        </div>
      </div>
    </div>
  );
};

export default Navbar;
