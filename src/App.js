import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserForm from './components/UserForm';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import AdminSignup from './components/AdminSignup';
import ImageCollection from './components/ImageCollection';
import ErrorPage from './components/ErrorPage';

function App() {
  const [images, setImages] = useState([]);
  const [islogin, setislogin] = useState(false);


  return (
    <Router>
      <div>
        <nav style={styles.navbar}>
          <ul style={styles.navList}>
            <li style={styles.navItem}>
              <Link to="/" style={styles.navLink}>Home</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/admin/login" style={styles.navLink}>Admin_Login</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/admin/signup" style={styles.navLink}>Admin_Signup</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/admin/login" element={<AdminLogin setislogin={setislogin}/>} />
          <Route path="/admin/signup" element={<AdminSignup setislogin={setislogin}/>} />
          <Route path="/admin/dashboard" element={islogin ? <AdminDashboard setimages={setImages} islogin={islogin} setislogin={setislogin}/> : <ErrorPage />} />
        
          <Route path="/user/images" element={<ImageCollection images={images} />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#f0f0f0', 
    padding: '10px 20px',
  },
  navList: {
    display: 'flex', 
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginRight: '20px', 
  },
  navLink: {
    color: '#4CAF50', 
    textDecoration: 'none', 
    fontSize: '18px', 
  },
};

export default App;
