import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminPage from './pages/adminPage';
import LoginPage from './pages/loginPage';
import { Toaster } from 'react-hot-toast';
import RegistrationPage from './pages/client/register';
import HomePage from './pages/homePage';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
    return (
        <GoogleOAuthProvider clientId='28826505151-3dt9302vkuuu0ccoj0nr0aamjo7klk58.apps.googleusercontent.com'>
            <BrowserRouter>
            <Toaster position="top-right"/>
                <Routes path="/*">
                    <Route path= "/admin/*" element={<AdminPage />} />
                    <Route path= "/login" element={<LoginPage />} />
                    <Route path= "/register" element={<RegistrationPage/>} />
                    <Route path= "/*" element={<HomePage />}  />
                    
                    
                    
                </Routes> 
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
}

export default App;
