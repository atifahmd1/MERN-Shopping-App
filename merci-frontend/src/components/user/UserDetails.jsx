import React, { useState } from "react";

const UserDetails = ({ user, onSave }) => {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, name, email, phone };
    onSave(updatedUser);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="text-xl font-semibold mb-2">User Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border rounded p-2 w-full"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border rounded p-2 w-full"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          className="border rounded p-2 w-full"
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </form>
  );
};

export default UserDetails;
