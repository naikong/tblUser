// src/components/EditUser.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = 'http://localhost:4000/users';

function EditUser() {
  const { id } = useParams();
  const [user, setUser] = useState({ id: '', name: '', address: '', phone: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${apiUrl}/${id}`)
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user:', error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleSaveChanges = () => {
    axios.put(`${apiUrl}/${id}`, user)
      .then(() => {
        navigate('/');
      })
      .catch(error => console.error('Error updating user:', error));
  };

  const handleCancelEdit = () => {
    navigate('/');
  };

  return (
    <>
    <h1 className="text-4xl font-bold mb-4 text-center">EDIT USER</h1>
    <div className='shadow-xl py-8 stroke-cyan-500 rounded-xl max-w-md text-justify p-8  container mx-auto px-4 py-2'>
       <p>ID</p>
      <input
        type="text"
        name="id"
        value={user.id}
        onChange={handleInputChange}
        placeholder="ID"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        disabled // Usually, ID should not be edited
      />
      <p>Name</p>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleInputChange}
        placeholder="Name"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
       <p>Address</p>
      <input
        type="text"
        name="address"
        value={user.address}
        onChange={handleInputChange}
        placeholder="Address"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
       <p>Phone</p>
      <input
        type="text"
        name="phone"
        value={user.phone}
        onChange={handleInputChange}
        placeholder="Phone"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <div className="flex justify-between">
        <button
          onClick={handleCancelEdit}
          className="px-4 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600 transition duration-300"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveChanges}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300"
        >
          Save Changes
        </button>
      </div>
    </div>
    </>
  );
}

export default EditUser;
