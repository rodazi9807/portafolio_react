import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const ObtToken = () => {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    const obtenerToken = async () => {
        if (isAuthenticated) {
            try {
                const token = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: "https://inventarioqr/"
                    }
                });
                console.log("Access Token:", token); // Verifica que no sea undefined o vacío
            } catch (error) {
                console.error("Error al obtener el token:", error);
            }
        }
    };

    return <button onClick={obtenerToken}>Obtener Token</button>;
};
