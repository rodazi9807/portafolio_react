import App from '../../App';
import Dashboard from '../dashboard/dashboard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from '../login/Profile';

function RouterPrincipal() {
    return (
        <Router>
            <Routes>
                <Route path="/Profile" element={<Profile />} />
                <Route path="/" element={<App />} />
                <Route path="/Home" element={<Dashboard/>} />
            </Routes>
        </Router>
    );
}

export default RouterPrincipal;


