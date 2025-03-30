import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    function navigateTo(symbol) {
        if (!symbol) return;
        navigate(`/stock?symbol=${encodeURIComponent(symbol.trim())}`);
    }

    return (
        <nav className="nav">
            <Link to="/" className="application-title">Stock Tracker</Link>
            <SearchTextBox searchTerm={navigateTo} />
            <ul>
                <CustomLink to="/stocks">Stocks</CustomLink>
                <CustomLink to="/about">About</CustomLink>
            </ul>
        </nav>
    )
}

export default Navbar;