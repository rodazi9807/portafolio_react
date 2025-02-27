import { useState } from "react";

export function App2() {
    let holamundo = "";
    const prueba = useState;
    const [seguir, cambioSeguir] = prueba(false);

    console.log(seguir);
    holamundo = seguir ? "holaMundo" : "adiosMundo";
    console.log(holamundo);
    return (
        <article>
            <header>
                <div>
                    <strong>Rolando Zelaya</strong>
                    <span>@yovani</span>
                    <br></br>
                    <strong>{holamundo}</strong>
                </div>
            </header>
            <aside>
                <button onClick={() => {
                        cambioSeguir(!seguir);
                    }}>
                    Seguir
                </button>
            </aside>
        </article>
        
    )
}