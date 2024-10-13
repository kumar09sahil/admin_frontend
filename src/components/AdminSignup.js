import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSignup = ({setislogin}) => {
  const [Username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [Privacy_key, setPrivacy_key] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://admin-dashboards.onrender.com/admin_dashboard/v1/auth/signup', {
        Username,
        password,
        confirmPassword,
        Privacy_key
      });
      console.log(response.data);
      setislogin(true)
      navigate('/admin/dashboard');
    } catch (error) {
        const mess = error.response.data.message
        alert(mess)
        console.error('Error submitting form', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <form onSubmit={handleSubmit}>
          <h2>Admin Signup</h2>
          <div style={styles.inputGroup}>
            <label>Username:</label>
            <input type="text" value={Username} onChange={(e) => setUsername(e.target.value)} required style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label>Confirm Password:</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label>Privacy_key:</label>
            <input type="string" value={Privacy_key} onChange={(e) => setPrivacy_key(e.target.value)} required style={styles.input} />
          </div>
          <button type="submit" style={styles.button}>Signup</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: 'white',
    padding: '65px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '90%', 
    maxWidth: '400px', 
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '95%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default AdminSignup;
