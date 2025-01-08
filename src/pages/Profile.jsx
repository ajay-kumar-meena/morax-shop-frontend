import React from "react";
import { useSelector } from "react-redux";
function Profile() {
  const { user } = useSelector(state => state.auth);

  const {
    photo = {},
    name = "Unknown User",
    email = "No Email Provided",
    role = "User",
    gender = "Not Specified",
    dob = "Unknown",
  } = user;

  // Format the date of birth
  const formattedDob = new Date(dob).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-3xl h-[90vh] mt-5 mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-4">
        {/* Profile Picture */}
        <div className="w-32 h-32">
          <img
            src={photo.url}
            alt={name}
            className="w-full h-full object-cover rounded-full shadow-md"
          />
        </div>

        {/* User Name */}
        <h1 className="text-2xl font-bold text-gray-800">{name}</h1>

        {/* User Role */}
        <span
          className={`px-4 py-1 text-sm font-medium rounded-full ${
            role === "admin" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
          }`}
        >
          {role}
        </span>
      </div>

      {/* Profile Details */}
      <div className="mt-6 flex flex-col gap-4">
        {/* Email */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-medium">Email:</span>
          <span className="text-gray-800">{email}</span>
        </div>

        {/* Gender */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-medium">Gender:</span>
          <span className="text-gray-800 capitalize">{gender}</span>
        </div>

        {/* Date of Birth */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-medium">Date of Birth:</span>
          <span className="text-gray-800">{formattedDob}</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
