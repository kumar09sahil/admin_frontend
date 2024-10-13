import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ErrorPage from './ErrorPage';
import { io } from 'socket.io-client'; 

const AdminDashboard = ({ setimages, islogin, setislogin }) => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate();
  const socket = io('https://admin-dashboards.onrender.com');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://admin-dashboards.onrender.com/admin_dashboard/v1/user/getall');
      console.log('Fetched users:', response.data.data); 
      setUsers(response.data.data); 
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  useEffect(() => {
    
    fetchUsers();

   
    socket.on('newUser', (newUser) => {
      console.log('New user added via socket:', newUser);
      fetchUsers(); 
    });

   
    return () => {
      socket.off('newUser');
    };
  }, []); 

  const handleViewAllImages = (userImages) => {
    setimages(userImages);
    navigate('/user/images');
  };

  // Logout functionality
  const handleLogout = () => {
    setislogin(false);  
    navigate('/');  
  };

  return (
    <>
      {!islogin ? <ErrorPage /> : 
        <div>
         
          <div style={styles.navbar}>
            <h2>Admin Dashboard</h2>
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          </div>
          
          {/* User cards */}
          <div style={styles.cardContainer}>
            {users.map((user, index) => (
              <div key={index} style={styles.card}>
                <h3 style={styles.username}>Username: {user.Username}</h3>
                <p style={styles.socialHandle}>Social Handle: {user.SocialHandle}</p>
                <div style={styles.imageContainer}>
                  {user.images.slice(0, 5).map((img, idx) => (
                    <img key={idx} src={img} alt="User Image" style={styles.image} />
                  ))}
                </div>
                <button onClick={() => handleViewAllImages(user.images)} style={styles.button}>View All Images</button>
              </div>
            ))}
          </div>
        </div>
      }
    </>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  logoutButton: {
    backgroundColor: '#f44336', 
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px', 
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    padding: '20px',
    margin: '20px',
    borderRadius: '10px',
    backgroundColor: '#fff', 
  },
  username: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  socialHandle: {
    fontSize: '16px',
    marginBottom: '15px',
  },
  imageContainer: {
    display: 'flex',
    flexWrap: 'wrap', 
    gap: '10px', 
  },
  image: {
    width: '100px', 
    height: '100px',
    borderRadius: '5px', 
  },
  button: {
    marginTop: '10px',
    width: '130px',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default AdminDashboard;
