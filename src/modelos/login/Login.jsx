import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
   const { loginWithRedirect } = useAuth0();

   return <button onClick={() => loginWithRedirect(
      {
         authorizationParams:
         {
            redirect_uri: "http://localhost:5173/Home"
         }
      })}>Log In</button>;
};

export default LoginButton;
