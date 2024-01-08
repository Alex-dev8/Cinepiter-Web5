import "./Header.css";

function Header() {
  function handleEmailClick() {
    const emailAddress = "cansal89@gmail.com";
    const subject = "Info regarding Cinepiter Web5";
    const body = "";

    const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  }

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
          href="https://developer.tbd.website/projects/web5/"
          target="_blank"
          rel="noopener noreferrer"
          className="custom_link"
        >
          <h3 className="link">What is Web5?</h3>
        </a>
        <button onClick={handleEmailClick} className="custom_button">
          <h3 className="link">Contact</h3>
        </button>
      </div>
    </header>
  );
}

export default Header;
