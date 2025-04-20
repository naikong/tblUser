// src/components/ViewUser.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { Card } from "flowbite-react";
import axios from 'axios';

const apiUrl = 'http://localhost:4000/users';

function ViewUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${apiUrl}/${id}`)
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user:', error));
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <h1 className="text-4xl font-bold mb-4 text-center">UserDetail</h1>
      <div className='shadow-xl py-8 stroke-cyan-500 rounded-xl max-w-md text-justify container mx-auto'>
        <p className=' mt-6 ms-8'><strong na>ID: </strong> {user.id}</p>
        <p className=' mt-6 ms-8'><strong>Name:</strong> {user.name}</p>
        <p className=' mt-6 ms-8' ><strong>Address:</strong> {user.address}</p>
        <p className=' mt-6 ms-8'><strong>Phone:</strong> {user.phone}</p>
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-200 transition duration-300 hover:text-red-500 mt-6 ms-8"
        >
          Back to List
        </button>
      </div>
      </>
  );
}

export default ViewUser;
