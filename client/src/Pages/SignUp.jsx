import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="rounded-lg p-3 focus:outline-slate-700"
        />
        <input
          type="text"
          placeholder="Email"
          id="email"
          className="rounded-lg p-3  focus:outline-slate-700"
        />
        <input
          type="text"
          placeholder="Password"
          id="password"
          className="rounded-lg p-3  focus:outline-slate-700"
        />
        <button className="bg-slate-700 p-3  rounded-lg  text-white hover:opacity-95 disabled:opacity-80">
          SIGN UP
        </button>
        <button className="bg-red-700 p-3  rounded-lg  text-white">
          CONTINUE WITH GOOGLE
        </button>
      </form>
      <div className="flex gap-2 mt-5 ">
        <p>Have an account ?</p>
        <Link to={"/sign-in"}> 
        <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
