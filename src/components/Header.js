import "./Header.css"

function Header() {
  return (
    <header className="header">
      <div>
        <img
          className="logo"
          src={require("./../assets/cinepiter-logo.png")}
          alt=""
        />
      </div>
      <div className="link_container">
        <a
          href="https://www.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="custom_link"
        >
          <h3 className="link">What is Web5?</h3>
        </a>
        <a
          href="https://www.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="custom_link"
        >
          <h3 className="link">Contact</h3>
        </a>
      </div>
    </header>
  );
}

export default Header;
