import { Wallet } from "lucide-react";

function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#home" className="logo">
          <span className="logo-icon"><Wallet size={20} /></span>
          Expense Tracker
        </a>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
