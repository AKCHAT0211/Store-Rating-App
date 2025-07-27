import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
import DashboardStats from "../components/DashboardStats";
import AddUserForm from "../components/AddUserForm";
import AddStoreForm from "../components/AddStoreForm";
import UserTable from "../components/UserTable";
import StoreTable from "../components/StoreTable";
import { initialUsers, initialStores, initialRatings } from "../data/data";

const AdminDashboard = () => {
  const [users, setUsers] = useState(initialUsers);
  const [stores, setStores] = useState(initialStores);
  const [ratings, setRatings] = useState(initialRatings);

  const addUser = (user) => {
    setUsers([...users, { id: users.length + 1, ...user }]);
  };

  const addStore = (store) => {
    setStores([
      ...stores,
      {
        id: stores.length + 1,
        ...store,
        rating: parseFloat(store.rating) || 0,
      },
    ]);
  };

  const setRating = (storeId, newRating) => {
    setStores((prevStores) =>
      prevStores.map((store) =>
        store.id === storeId ? { ...store, rating: newRating } : store
      )
    );
    setRatings([...ratings, { storeId, rating: newRating }]);
  };

  const handleToggleProfile = () => {
    console.log("Profile toggled");
    // Add toggle logic here
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    // Implement logout logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar onToggleProfile={handleToggleProfile} onLogout={handleLogout} />

      <div className="p-4 md:p-8 space-y-12">
        {/* Header */}
        <header className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-blue-700 mb-1">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-sm">System Administrator Panel</p>
        </header>

        {/* Dashboard Stats */}
        <DashboardStats users={users} stores={stores} ratings={ratings} />

        {/* Add User / Store Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Add New User
            </h2>
            <AddUserForm addUser={addUser} />
          </div>

          <div className="bg-white rounded shadow p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Add New Store
            </h2>
            <AddStoreForm addStore={addStore} />
          </div>
        </section>

        {/* Users & Stores Tables */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded shadow p-6 overflow-auto">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              User List
            </h2>
            <UserTable users={users} />
          </div>

          <div className="bg-white rounded shadow p-6 overflow-auto">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Store List
            </h2>
            <StoreTable stores={stores} setRating={setRating} />
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 mt-8">
          &copy; {new Date().getFullYear()} Admin System. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default AdminDashboard;
