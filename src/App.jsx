import logo from './assets/react.svg'
import LoginButton from './modelos/login/Login';
import './App.css';
import LogoutButton from './modelos/login/Logout';
import { useAuth0 } from "@auth0/auth0-react";


function App() {
  const { isAuthenticated } = useAuth0();
  console.log(isAuthenticated);
  return (
    <div className="App">
      <header className="App-header">
        <LoginButton />
        {/* <img src={logo} className="App-logo" alt="logo" />
        <br></br>
        { !isAuthenticated ? (<LoginButton />) : (<LogoutButton/>) } */}
      </header>
    </div>
  )
}

export default App;