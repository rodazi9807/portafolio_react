import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./Logout";
import { ObtToken } from "./obtToken";


const Profile = () => {
  const { user, isAuthenticated, isLoading, error, getAccessTokenSilently } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  
  if(error){
    console.log(error.message());
  }

  return (
    isAuthenticated && (
      <>
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
      <div>
        <LogoutButton/>
      </div>
      <div>
        <ObtToken/>
      </div>
      </>
    )
  );
};

export default Profile;