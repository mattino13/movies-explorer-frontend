import React from 'react';
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, ...props  }) {
  if (props.loggedIn) {
    return children;
  } else {
    return (<Navigate to="/" replace/>);
  } 
}

export default ProtectedRoute;
