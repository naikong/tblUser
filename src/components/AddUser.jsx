import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = 'https://j-sondb.vercel.app/users';

function AddUser() {
  const [newUser, setNewUser] = useState({ id: '', name: '', address: '', phone: '' });
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch the existing users to determine the next id
  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        setUsers(response.data);
        // Set the next ID as the length of the current users + 1
        setNewUser(prevUser => ({
          ...prevUser,
          id: (response.data.length + 1).toString(), // Auto-generate ID
        }));
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleAddUser = () => {
    axios.post(apiUrl, newUser)
      .then(response => {
        navigate('/');
      })
      .catch(error => console.error('Error adding user:', error));
  };

  return (
  <>
    <h1 className="text-4xl font-bold mb-4 text-center"> ADD USER</h1>

    <div className='shadow-xl py-8 stroke-cyan-500 rounded-xl max-w-md text-justify p-8  container mx-auto px-4 py-2' >
      <input
        type="text"
        name="id"
        value={newUser.id}
        readOnly // Make the ID field read-only since it's auto-generated
        placeholder="ID"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="name"
        value={newUser.name}
        onChange={handleInputChange}
        placeholder="Name"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="address"
        value={newUser.address}
        onChange={handleInputChange}
        placeholder="Address"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="phone"
        value={newUser.phone}
        onChange={handleInputChange}
        placeholder="Phone"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <button
        onClick={handleAddUser}
        className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-300"
      >
        Add User
      </button>
    </div>
    </>
  );
}

export default AddUser;
