import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const GContext = createContext();

const GlobalContext = ({ children }) => {
  const [user, setUser] = useState(null);
  // console.log(user);
  
  const [cars, setCars] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/cars`)
      .then((res) => setCars(res.data.data));
  }, []);
  

  const output = { user, setUser, cars };
  return <GContext.Provider value={output}>
    {children}
    </GContext.Provider>;
};

export default GlobalContext;
