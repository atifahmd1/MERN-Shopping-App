import React, { useState } from "react";
import AddEditAddress from "./AddEditAddress";

const AddressList = ({ addresses, onSave }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentAddress, setCurrentAddress] = useState({});

  const handleEdit = (index) => {
    setEditingIndex(index);
    setCurrentAddress(addresses[index] || {});
  };

  console.log(addresses);

  const handleSaveAddress = (address) => {
    const updatedAddresses = [...addresses];
    if (editingIndex !== null) {
      updatedAddresses[editingIndex] = address;
    } else {
      updatedAddresses.push(address);
    }
    onSave({ address: updatedAddresses });
    setEditingIndex(null);
    setCurrentAddress({});
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Addresses</h2>
      {addresses.map((address, index) => (
        <div key={index} className="border p-2 rounded mb-2">
          <div>
            {address.street}, {address.city}, {address.state}, {address.zip},{" "}
            {address.country}
          </div>
          <button
            className="bg-green-500 text-white px-2 py-1 rounded mt-2"
            onClick={() => handleEdit(index)}
          >
            Edit
          </button>
        </div>
      ))}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => handleEdit(null)}
      >
        Add New Address
      </button>
      {editingIndex !== null && (
        <AddEditAddress address={currentAddress} onSave={handleSaveAddress} />
      )}
    </div>
  );
};

export default AddressList;
