import { Route, Routes } from "react-router-dom";
import Home from "./page/home/Home";
import Cars from "./page/cars/Cars";
import Contact from "./page/contact/Contact";
import Login from "./page/login/Login";
import Register from "./page/register/Register";
import Rent from "./page/rent/Rent";
import { useContext, useEffect } from "react";
import { GContext } from "./context/GlobalContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import Profile from "./page/profile/Profile";
import axios from "axios";

const App = () => {
  const { setUser } = useContext(GContext);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      axios
        .get(`${import.meta.env.VITE_API_URL}/user/${currentUser?.email}`)
        .then((res) => {
          const data = res.data;
          setUser(data.data);
          // console.log(data.data);
        });
    });
    return () => unsubscribe();
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rent/:id" element={<Rent />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
