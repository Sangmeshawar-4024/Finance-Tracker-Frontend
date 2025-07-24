import React from 'react'
import '../styles/responsive-about.css';
const About = () => {
  return (
    <div className="about-container">
      <header className="about-hero">
        <h1>About Finance Tracker</h1>
        <p>Smartly track, manage, and grow your money with ease.</p>
        <p>With Finance Tracker, users can easily record income and expenses, categorize transactions, and monitor their balance in real-time.</p>
      </header>

      <section className="about-content">
        <h2>Why Finance Tracker?</h2>
        <p>
          Finance Tracker is your personal assistant for managing your income and expenses.
          Whether you're a student, professional, or family, Finance Tracker helps you take control of your
          spending and saving goals — all in one place. A Finance Tracker helps you understand where your money goes, plan better, avoid overspending, and achieve your financial goals with confidence.
        </p>

        <h2>Features</h2>
        <ul>
          <li><strong>✔️ Easy to Use:</strong> Clean interface to add, edit, and delete transactions.</li>
          <li><strong>🔒 Secure:</strong> Your data stays private and protected.</li>
          <li><strong>📊 Insights:</strong> Visualize spending patterns and plan smarter budgets.</li>
          <li><strong>🚀 Accessible:</strong> Works on mobile, tablet, and desktop seamlessly.</li>
        </ul>

        <h2>Our Mission</h2>
        <p>
          Our mission is to empower individuals to take control of their finances by providing a simple, clear, and powerful tool to track spending, manage budgets, and achieve financial freedom.
          We believe that managing money should be simple and stress-free.
          Finance Tracker empowers you with tools to build healthy financial habits for a better future.
        </p>
      </section>

      <footer className="about-footer">
        <p>© 2025 Finance Tracker | Built with ❤️ by Your C.A Sangu</p>
      </footer>
    </div>
  )
}

export default About
