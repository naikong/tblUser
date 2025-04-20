// src/components/UserList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ConfirmDeleteUser from './ConfirmDeleteUser';

const apiUrl = 'https://j-sondb.vercel.app/users';
function UserList() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  useEffect(() => {
    axios.get(apiUrl)
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      axios.delete(`${apiUrl}/${userToDelete.id}`)
        .then(() => {
          setUsers(users.filter(user => user.id !== userToDelete.id));
          setIsModalOpen(false);
          setUserToDelete(null);
        })
        .catch(error => {
          console.error('Error deleting user:', error);
          setIsModalOpen(false);
          setUserToDelete(null);
        });
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  return (

     <div className="container mx-auto p-4 ">
          <h1 className="text-4xl font-bold mb-4 text-center"> USER MANAGEMENT</h1>

          <Link to="/add" className="mb-4 inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300">
        Add User
      </Link>
      
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Address</th>
              <th className="px-4 py-2 border-b">Phone</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{user.id}</td>
                <td className="px-4 py-2 border-b">{user.name}</td>
                <td className="px-4 py-2 border-b">{user.address}</td>
                <td className="px-4 py-2 border-b">{user.phone}</td>
                <td className="px-4 py-2 border-b flex space-x-2">
                  <Link to={`/view/${user.id}`} className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-300">
                    View
                  </Link>
                  <Link to={`/edit/${user.id}`} className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition duration-300">
                    Edit
                  </Link>
                  {/* <button
                   onClick={()=> han}
                  /> */}

               
                  <button
                    // onClick={() => handleDeleteClick(user)}
                    onClick={() => handleDeleteClick(user)}
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmDeleteUser
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleDeleteConfirm}
        itemName={userToDelete ? userToDelete.name : ''}
        user={userToDelete}
      />
    </div>
  );
}

export default UserList;
