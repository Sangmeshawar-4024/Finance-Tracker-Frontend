import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Register from './components/Register.js';
import Login from './components/Login.js';
import Dashboard from './components/Dashboard.js';
import PrivateRoute from './components/PrivateRoute.js';
import Home from './components/Home.js';
import About from './components/About.js';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
    </Routes>
      </BrowserRouter>
  );
}

export default App;
