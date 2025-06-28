export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1>🎧 DropDeck</h1>
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
