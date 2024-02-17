import React, { useState, useEffect, useRef } from 'react';
import "./Navbar.css";

const Navbar = () => {
    const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
    const [menuClass, setMenuClass] = useState("menu hidden");
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const menuRef = useRef(null);

    // Function to toggle burger menu change
    const updateMenu = () => {
        if (!isMenuClicked) {
            setBurgerClass("burger-bar clicked");
            setMenuClass("menu visible");
        } else {
            setBurgerClass("burger-bar unclicked");
            setMenuClass("menu hidden");
        }
        setIsMenuClicked(!isMenuClicked);
    }

    // Effect to add event listener for clicks outside menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                // Click is outside the menu, so hide the menu
                setBurgerClass("burger-bar unclicked");
                setMenuClass("menu hidden");
                setIsMenuClicked(false);
            }
        }

        // Adding event listener when the component mounts
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup function to remove event listener when the component unmounts
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <nav>
                <div className='burger-menu' onClick={updateMenu}>
                    <div className={burgerClass}></div>
                    <div className={burgerClass}></div>
                    <div className={burgerClass}></div>
                </div>
            </nav>

            <div ref={menuRef} className={menuClass}></div>
        </div>
    );
}

export default Navbar;
