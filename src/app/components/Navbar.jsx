import { Link, useMatch, useResolvedPath } from "react-router-dom";

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
    return <nav className="nav">
        <Link to="/" className="application-title">Stock Tracker</Link>
        <ul>
            <CustomLink to="/stocks">Stocks</CustomLink>
            <CustomLink to="/about">About</CustomLink>
            <div className="login">login</div>
        </ul>
    </nav>
}

export default Navbar;