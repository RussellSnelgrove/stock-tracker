function CustomLink({ href, children, ...props }) {
    const path = window.location.pathname;
    return (
        <li className={path === href ? 'active' : ''}>
            <a href={href} {...props}>
                {children}
            </a>
        </li>
    )
}

function Navbar() {
    return <nav className="nav">
        <a href="/" className="application-title">Stock Tracker</a>
        <ul>
            <CustomLink href="/stocks">Stocks</CustomLink>
            <CustomLink href="/about">About</CustomLink>
        </ul>
    </nav>
}

export default Navbar;