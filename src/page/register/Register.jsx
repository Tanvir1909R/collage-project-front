import Navbar from "../../components/navBar/Navbar";
import "./register.css";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { GContext } from "../../context/GlobalContext";
import axios from "axios";

const Register = () => {
  const { setUser } = useContext(GContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const number = e.target.number.value;
    const password = e.target.password.value;
    const accountType = e.target.type.value;
    const userData = { name, email, number, accountType };

    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        axios
          .post(`${import.meta.env.VITE_API_URL}/user`, userData)
          .then((res) => {
            setUser(res.data.data);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
      <Navbar />
      <div className="contactDiv register_container">
        <div className="contact-page-container">
          <h2>Register</h2>
          <form onSubmit={handleSubmit} id="contact-htmlForm">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
            />

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
              autoComplete="current-password"
              required
            />
            <label htmlFor="number">Number:</label>
            <input
              type="number"
              id="number"
              name="number"
              placeholder="Enter your number"
              required
            />
            <label htmlFor="type">Account Type:</label>
            <select name="type" id="type" defaultValue={"normal"}>
              <option value="driver">Driver</option>
              <option value="normal">Normal</option>
            </select>

            <button>Register</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
