import { useState } from "react";

export default function Profile() {
  const [user] = useState({
    name: localStorage.getItem("name") || "User Name",
    emailid: localStorage.getItem("emailid") || "user@example.com",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white flex items-center justify-center px-4">
      
      <div className="w-full max-w-md bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-28 relative">
          
          {/* Avatar */}
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
            <div className="w-20 h-20 rounded-full bg-zinc-900 border-4 border-zinc-900 flex items-center justify-center text-2xl font-bold text-yellow-400 shadow-lg">
              {user.name?.charAt(0)?.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="pt-14 pb-8 px-6 text-center">
          
          <h2 className="text-xl font-bold text-white">
            {user.name}
          </h2>

          <p className="text-sm text-zinc-400 mb-6">
            Frontend Developer • React Enthusiast
          </p>

          {/* Info Card */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-left space-y-3">
            
            <div className="flex justify-between">
              <span className="text-zinc-400">Name</span>
              <span className="text-white font-medium">{user.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-400">Email</span>
              <span className="text-white font-medium">{user.emailid}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-400">Status</span>
              <span className="text-green-400 font-medium">Active</span>
            </div>

          </div>

          {/* Button
          <button className="mt-6 w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 rounded-xl transition duration-300">
            Edit Profile
          </button> */}
        </div>
      </div>
    </div>
  );
}