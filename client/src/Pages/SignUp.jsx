import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Auth from '../Components/Auth'

function SignUp() {
  const [formData, setFormData] = useState({});
  const [err,setError] = useState(null)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if(data.success === false){
      setError(data.message)
      setLoading(false)
      return
    }
      setLoading(false)
      setError(null)
      navigate('/sign-in')
      
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
    
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="rounded-lg p-3 focus:outline-slate-700"
          onChange={handleChange}
        />
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
        <button disabled={loading} className="bg-slate-700 p-3  rounded-lg  text-white hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading' : 'SIGN UP'}
        </button>
        <Auth />
      </form>
      <div className="flex gap-2 mt-5 ">
        <p>Have an account ?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      {err && <p className= 'text-red-800  mt-3 text-base font-medium'>{err}</p>}
    </div>
  );
}

export default SignUp;
