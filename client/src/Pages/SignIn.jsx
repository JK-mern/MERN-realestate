
import { useState } from "react";
import { Link } from "react-router-dom";

function SignIn() {
  const [formData,setFormData] = useState({})
  const [loading,setLoading] = useState(false)
  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }
  const handleSubmit = (e) =>[
    e.preventDefault()
  ]
console.log(formData)
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Email"
          id="email"
          className="rounded-lg p-3  focus:outline-slate-700"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="rounded-lg p-3  focus:outline-slate-700"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 p-3  rounded-lg  text-white hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading" : "SIGN UP"}
        </button>
        <button className="bg-red-700 p-3  rounded-lg  text-white">
          CONTINUE WITH GOOGLE
        </button>
      </form>
      <div className="flex gap-2 mt-5 ">
        <p>Don't Have an account ?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
