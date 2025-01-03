import React, { useContext } from 'react';
import { Navigate} from 'react-router-dom';
import { GContext } from '../context/GlobalContext';

const PrivateRoute = ({children}) => {
  const { user } = useContext(GContext);
  
  // Check if the user exists
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
