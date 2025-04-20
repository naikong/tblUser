// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import ViewUser from './components/ViewUser';

function App() {
  return (
  <>
    <div className="container mx-auto p-4">
    
     <Routes>
        <Route path="/" element={<UserList />} />
         <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
        <Route path="/view/:id" element={<ViewUser />} />
     </Routes>
     </div>
    
      </>
  );
}

export default App;
