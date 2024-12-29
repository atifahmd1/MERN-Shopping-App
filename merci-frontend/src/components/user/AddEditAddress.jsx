import React, { useState } from "react";

const AddEditAddress = ({ address = {}, onSave }) => {
  const [street, setStreet] = useState(address.street || "");
  const [city, setCity] = useState(address.city || "");
  const [state, setState] = useState(address.state || "");
  const [zip, setZip] = useState(address.zip || "");
  const [country, setCountry] = useState(address.country || "India");

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedAddress = { street, city, state, zip, country };
    onSave(updatedAddress);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          placeholder="Street"
          className="border rounded p-2 w-full"
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          className="border rounded p-2 w-full"
        />
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="State"
          className="border rounded p-2 w-full"
        />
        <input
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="ZIP Code"
          className="border rounded p-2 w-full"
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
          className="border rounded p-2 w-full"
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Address
      </button>
    </form>
  );
};

export default AddEditAddress;
