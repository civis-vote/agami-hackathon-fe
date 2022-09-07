import "./Navbar.css";

const Navbar = () => {
  return <div className="navbar">
    <div>
      <img src="/civis-logo.svg" alt="Civis logo" />
    </div>
    <div className="navbar-title-container">
      <span className="navbar-title">Legal Text Summariser</span>
    </div>
  </div>
};

export default Navbar;