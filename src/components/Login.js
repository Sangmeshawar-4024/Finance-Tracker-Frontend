import React,{useState} from "react";
import { useNavigate,Link } from "react-router-dom";
import api from "../api/api";
import "../styles/responsive-auth.css";

const Login = () =>{
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('name', res.data.user.name);
      navigate('/dashboard');
      alert('Login successful !');
    } 
    catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

    return (      
        <div className="auth-container">
           <div className="auth-left">
        <h1>Thank you for register👋</h1>
        <p>
          Already have an account please login now and finance Tracker lets you easily track income, expenses, and savings, so you stay in control of your money and reach your goals faster.
        </p>
      </div>

        <div className="auth-right">
                <h1>Login To Track Your Finance</h1>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>        
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                  />
        
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    required
                  />
        
                  <button type="submit">Login</button>
                </form>
                <p>
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </div>
        </div>
    );
}

export default Login;