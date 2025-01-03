import { Link } from "react-router-dom";
import Navbar from "../../components/navBar/Navbar";
import "./login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useContext } from "react";
import { GContext } from "../../context/GlobalContext";
import toast from "react-hot-toast";

const Login = () => {
  const {setUser} = useContext(GContext)
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setUser(user.email);
        toast.success('Successfully login')
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
      <Navbar />
      <div className="contactDiv login_container">
        <div className="contact-page-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} id="contact-htmlForm">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              placeholder="Your password"
              type="password"
              required
            />
             <button type="submit">Login</button>
            <p>
              Don't have an account? <Link to={"/register"}>Register</Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
