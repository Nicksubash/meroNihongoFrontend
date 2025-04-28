import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaChevronDown, FaUserCircle } from 'react-icons/fa';
import AnimatedButton from "./AnimateButton";
import Modal from '../modal/modal';
import LoginForm from '../Auth/LoginForm';
import RegisterForm from '../Auth/RegisterForm';
import N5 from "../../pages/JLPT/N5"
import { nav } from 'framer-motion/client';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isJlptOpen, setIsJlptOpen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal]= useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Check token on load
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const toggleLoginModal = () => {
        setShowLoginModal(!showLoginModal);
        if (isOpen) setIsOpen(false);
    };

    const toggleRegisterModal = () => {
        setShowRegisterModal(!showRegisterModal);
        if (isOpen) setIsOpen(false);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        toggleLoginModal();
        navigate('/profile');
    };

    const handleJlptLevel= (level) =>{
        navigate(`/vocabulary/${level.toLowerCase()}`);
        setIsJlptOpen(false);
    }

    return (
        <>
            <header className="sticky top-0 z-50 backdrop-blur-lg shadow-lg w-full mx-auto">
                <div className="container flex justify-between items-center w-full p-4 font-outfit font-bold">
                    <Link to="/">
                        <img src="/cat.gif" alt="logo" className="h-12" />
                    </Link>

                    {/* Hamburger Menu for Small Screens */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-3xl text-cyan-600">
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className={`${
                        isOpen ? 'flex flex-col items-center space-y-4' : 'hidden'
                    } md:flex md:flex-row md:space-x-6 gap-8`}>
                        <Link to="/" className="text-2xl text-cyan-600 hover:text-cyan-700">Home</Link>
                        <Link to="/about" className="text-2xl text-cyan-600 hover:text-cyan-700">About Us</Link>
                        {/* <Link to="/vocabulary" className="text-2xl text-cyan-600 hover:text-cyan-700">Vocabulary</Link> */}

                        <div className="relative">
                            <button 
                                className="flex items-center text-2xl text-cyan-600 hover:text-cyan-700"
                                onClick={() => setIsJlptOpen(!isJlptOpen)}
                                onMouseEnter={() => setIsJlptOpen(true)}
                            >
                                JLPT
                                <FaChevronDown className={`ml-1 transition-transform ${isJlptOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isJlptOpen && (
                                <div 
                                    className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                                    onMouseEnter={() => setIsJlptOpen(true)}
                                    onMouseLeave={() => setIsJlptOpen(false)}
                                >
                                    {['N1', 'N2', 'N3', 'N4', 'N5'].map((level) => (
                                        <Link
                                            key={level}
                                            to={`/vocabulary/${level.toLowerCase()}`}
                                            className="block px-4 py-2 text-gray-800 hover:bg-cyan-50"
                                            onClick={() => handleJlptLevel(level)}
                                        >
                                            JLPT {level}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link to="/ssw" className="text-2xl text-cyan-600 hover:text-cyan-700">SSW</Link>

                        <div className="flex flex-col md:flex-row gap-4 md:ml-6 mt-4 md:mt-0">
                            {isLoggedIn ? (
                                <>
                                <AnimatedButton onClick={handleLogout}>
                                        Logout
                                </AnimatedButton>
                                <Link to="/profile" className="flex items-center gap-1 text-2xl text-cyan-600 hover:text-cyan-700">
                                        <FaUserCircle size={40} />
                                </Link>    
                                </>
                            ) : (
                                <AnimatedButton onClick={toggleLoginModal}>
                                    Login / Register
                                </AnimatedButton>
                            )}
                        </div>
                    </nav>
                </div>
            </header>

            <Modal isOpen={showLoginModal} onClose={toggleLoginModal}>
                <LoginForm 
                    onSuccess={handleLoginSuccess}
                    onRegisterClick={() => {
                        toggleLoginModal();
                        toggleRegisterModal();
                    }}
                />
            </Modal>

            <Modal isOpen={showRegisterModal} onClose={toggleRegisterModal}>
                <RegisterForm 
                    onSuccess={toggleRegisterModal}
                    onLoginClick={() => {
                        toggleRegisterModal();
                        toggleLoginModal();
                    }}
                />
            </Modal>
        </>
    );
}
