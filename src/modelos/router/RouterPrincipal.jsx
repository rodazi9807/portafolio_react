import App from '../../App';
import Dashboard from '../dashboard/dashboard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from '../login/Profile';
import MainLayout from '../componentes/mainLayout';
import Maquinas from '../maquinas/Maquinas';

function RouterPrincipal() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route path="Profile" element={<Profile />} />
                    <Route path="Home" element={<Dashboard />} />
                    <Route path="Maquinas" element={<Maquinas/>} />
                    <Route path='*' element={<Dashboard />}/>
                </Route>

                <Route path='/login' element={<App/>}/>
                
            </Routes>
        </Router>
    );
}

export default RouterPrincipal;


