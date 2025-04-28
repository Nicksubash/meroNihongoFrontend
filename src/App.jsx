import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PageTransition from './components/PageTransition'; 
import Contact from './pages/Contact';
import About from './pages/About';
import { AuthProvider } from './services/authContext/AuthContext';
import Profile from './pages/Profile';
import MockTest from './pages/MockTest';
import N5 from './pages/JLPT/N5';

export default function App() {
    return (
        <AuthProvider>
            <Router>
            <Routes>  
                <Route
                    path="/"
                    element={
                        <PageTransition>
                            <Home />
                        </PageTransition>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <PageTransition>
                            <Profile />
                        </PageTransition>
                    }
                />
                <Route
                    path="/about"
                    element={
                        <PageTransition>
                            <About />
                        </PageTransition>
                    }
                />
                <Route
                    path="/contact"
                    element={
                        <PageTransition>
                            <Contact />
                        </PageTransition>
                    }
                />
                <Route path="/mock-test" element={<MockTest />} />
                <Route path="/vocabulary/n5" element={<N5 />} />

            </Routes>
        </Router>
        </AuthProvider>
       
    );
}