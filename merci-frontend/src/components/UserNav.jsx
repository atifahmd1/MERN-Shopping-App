import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const UserNav = () => {
  const { authState } = useContext(AuthContext);
  return (
    <div className="flex items-center space-x-4">
      <img
        className="w-12 h-12 rounded-full"
        src={authState.user?.avatar}
        alt="user avatar"
      />
      <p className="text-white text-xl font-bold">{authState.user?.name}</p>
    </div>
  );
};
