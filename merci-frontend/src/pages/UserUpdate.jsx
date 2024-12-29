import React, { useState, useContext } from "react";
import UserDetails from "../components/user/UserDetails";
import AddressList from "../components/user/AddressList";
import Preferences from "../components/user/Preferences";
import { AuthContext } from "../contexts/AuthContext";
import { updateUserDetails } from "../api/userApi";

const UserUpdate = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const [user, setUser] = useState(authState.user);

  const handleSave = async (updatedUser) => {
    try {
      const response = await updateUserDetails(user._id, updatedUser);
      console.log("response: ", response.data);
      setAuthState({ ...authState, user: response.data.user });
      setUser(response.data.user);
    } catch (error) {
      console.error("Error updating user:", error);
    }

    // console.log("user: ", user);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Update User Profile</h1>
      <UserDetails user={user} onSave={handleSave} />
      <AddressList addresses={user.address} onSave={handleSave} />
      <Preferences user={user} onSave={handleSave} />
    </div>
  );
};

export default UserUpdate;
