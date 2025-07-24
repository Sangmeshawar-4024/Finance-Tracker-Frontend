import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">
          💰 <span>Finance</span> Tracker
        </div>
        <div className="nav-links">
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>

      <header className="hero-section">
        <h1>Your Personal Finance Tracker</h1>
        <p>“A Finance Tracker helps you monitor your income, expenses, and savings in one place, empowering you to take control of your financial goals and build better money habits.”</p>
        <div className="cta-buttons">
          <Link to="/register" className="btn primary">Get Started</Link>
          <Link to="/login" className="btn secondary">Login</Link>
          <Link to="/about" className="btn third">About</Link>
        </div>
      </header>

      <section className="features">
        <div className="feature">
          <h3>💡 Simple</h3>
          <p>Easy to use interface for daily tracking.</p>
        </div>
        <div className="feature">
          <h3>🔒 Secure</h3>
          <p>Your data is safe & encrypted.</p>
        </div>
        <div className="feature">
          <h3>📈 Insightful</h3>
          <p>Visualize your spending patterns.</p>
        </div>         
        <div className="feature">
          <h3>📝 Custom Categories</h3>
          <p>Create your own income/expense categories.</p>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Finance Tracker | Built with ❤️ by Your C.A Sangu </p>
      </footer>
      <Outlet />
    </div>
  );
}

export default Home;

