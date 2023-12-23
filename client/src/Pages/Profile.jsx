import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-center  font-semibold text-3xl my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input type="file" accept="image/*" hidden />
        <img
          src={currentUser.avatar}
          className="rounded-full w-24 h-24 self-center object-cover cursor-pointer mt-2"
        />
        <input
          type="text"
          id="username"
          value={currentUser.username}
          className="rounded-lg p-3"
        />
        <input
          type="text"
          id="email"
          value={currentUser.email}
          className="rounded-lg p-3"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="rounded-lg p-3"
        />
        <button className="p-3 bg-slate-700 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
        <button className="p-3 bg-green-700 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80">
          create Listing
        </button>
      </form>
      <div className="mt-5 flex justify-between">
        <span className="text-red-700 cursor-pointer">Delete Account </span>
        <span className="text-red-700 cursor-pointer">Sign out </span>
      </div>
    </div>
  );
}

export default Profile;
