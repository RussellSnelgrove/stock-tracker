function Navbar() {
    return <nav className="nav">
        <a href="/" className="application-title">Stock Tracker</a>
        <ul>
            <li>
                <a href="/stocks">Stocks</a>
            </li>
            <li>
                <a href="/about">About</a>
            </li>
        </ul>
    </nav>
}

export default Navbar;