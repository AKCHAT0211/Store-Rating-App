import React, { useState } from "react";
import ProfileCard from "../components/ProfileCard";
import Navbar from "../components/Navbar";
import mockRatings from "../data/mockRatings";
import FilterComponent from "../components/FilterComponent"; // ✅ NEW

const OwnerDashboard = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [minRating, setMinRating] = useState(0);

  const user = {
    userId: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Owner",
    storeId: 1,
  };

  const handleSuccess = () => alert("Password updated successfully!");
  const handleError = (msg) => alert(msg);
  const handleLogout = () => {
    alert("Logged out");
    window.location.href = "/login";
  };

  const storeRatings = mockRatings.filter(
    (r) => r.storeId === user.storeId && r.rating >= minRating
  );

  const sortedRatings = [...storeRatings].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date) - new Date(a.date);
      case "oldest":
        return new Date(a.date) - new Date(b.date);
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  const averageRating =
    storeRatings.reduce((sum, r) => sum + r.rating, 0) /
    (storeRatings.length || 1);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        onToggleProfile={() => setShowProfile((prev) => !prev)}
        onLogout={handleLogout}
      />

      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Welcome, {user.name}</h1>
        <p className="text-gray-700">Manage your store and view feedback.</p>

        {showProfile && (
          <div className="flex justify-center pt-6">
            <ProfileCard
              userId={user.userId}
              name={user.name}
              email={user.email}
              role={user.role}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>
        )}

        <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/3">
          <h2 className="text-lg font-medium text-gray-800 mb-2">
            Average Rating
          </h2>
          <div className="text-3xl font-bold text-yellow-500">
            ⭐ {averageRating.toFixed(1)} / 5
          </div>
        </div>

        {/* ✅ New Filter Component */}
        <FilterComponent
          sortBy={sortBy}
          setSortBy={setSortBy}
          minRating={minRating}
          setMinRating={setMinRating}
        />

        {/* Ratings Table */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          {sortedRatings.length === 0 ? (
            <p className="text-gray-500">No ratings match your filter.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto text-sm">
                <thead>
                  <tr className="bg-gray-100 text-left text-gray-600">
                    <th className="px-4 py-2">User</th>
                    <th className="px-4 py-2">Rating</th>
                    <th className="px-4 py-2">Comment</th>
                    <th className="px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedRatings.map((r) => (
                    <tr
                      key={`${r.userId}-${r.date}`}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">{r.userName}</td>
                      <td className="px-4 py-2 text-yellow-500 font-medium">
                        ⭐ {r.rating}
                      </td>
                      <td className="px-4 py-2">{r.comment}</td>
                      <td className="px-4 py-2 text-gray-500">{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
