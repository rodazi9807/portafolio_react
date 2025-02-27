import React from 'react';
import ReactDOM from 'react-dom/client';
import {Auth0Provider} from '@auth0/auth0-react'
import './main.css';
import App from './App';
import RouterPrincipal from './modelos/router/RouterPrincipal';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-nqub7b16g68rey18.us.auth0.com"
      clientId="OKIGPj13ydo5vDdZFFoF4UVRF37iKeYH"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://inventarioqr/"
      }}
    >
      <RouterPrincipal />
    </Auth0Provider>
  </React.StrictMode>
);