import { useEffect, useState, useRef } from 'react'
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import SearchTextBox from "./NavbarSearch";

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
        <li className={isActive ? 'active' : ''}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}


function Navbar() {
    const [symbol, setSymbol] = useState('');
    const abortControllerRef = useRef(null);

    function searchTerm(inputString) {
        setSymbol(inputString.trim())
    };

    useEffect(() => {
        if (!symbol) return;

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;
        const signal = controller.signal;

        const debounceTimeout = setTimeout(async () => {
            try {
                const response = await fetch(`/api/stocks/symbol?ticker=${symbol}`, { signal });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Fetched data:", data);
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Error fetching data:", error.message);
                }
            }
        }, 500);
        return () => {
            clearTimeout(debounceTimeout);
            controller.abort();
        }
    }, [symbol]);

    return (
        <nav className="nav">
            <Link to="/" className="application-title">Stock Tracker</Link>
            <SearchTextBox searchTerm={searchTerm} />
            <ul>
                <CustomLink to="/stocks">Stocks</CustomLink>
                <CustomLink to="/about">About</CustomLink>
                <div>
                    <button className="login-button">Login</button>
                </div>
            </ul>
        </nav>
    )
}

export default Navbar;