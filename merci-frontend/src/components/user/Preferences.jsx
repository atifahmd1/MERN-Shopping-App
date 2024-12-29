import React, { useState } from "react";

const Preferences = ({ user, onSave }) => {
  const [isAdmin, setIsAdmin] = useState(user.isAdmin || false);
  const [favourites, setFavourites] = useState(user.favourites || []);

  const handleSavePreferences = () => {
    const updatedUser = { ...user, isAdmin, favourites };
    onSave(updatedUser);
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Preferences</h2>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={() => setIsAdmin(!isAdmin)}
          className="mr-2"
        />
        <label>Admin</label>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Favourites</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favourites.map((fav, index) => (
            <div key={index} className="border p-2 rounded">
              {fav}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleSavePreferences}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Preferences
      </button>
    </div>
  );
};

export default Preferences;
