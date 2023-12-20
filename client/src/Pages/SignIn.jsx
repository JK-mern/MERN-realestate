
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch , useSelector}  from 'react-redux'
import { signInStart, signInFailure , singInSuccess } from "../redux/user/user.slice";

function SignIn() {
  const [formData,setFormData] = useState({})
  const {loading, error} = useSelector((state) => state.user)
  const navigate = useNavigate()
  const Dispatch = useDispatch()
  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }
  const handleSubmit = async(e) =>{
    e.preventDefault()
    try {
     Dispatch(signInStart())
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if(data.success === false){
      Dispatch(signInFailure (data.message))
      return
    }
      Dispatch(singInSuccess(data))
      navigate('/')
      
    } catch (error) {
       Dispatch(signInFailure(error.message))
     }
}
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7">Sign In</h1>
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
          {loading ? "Loading" : "SIGN IN"}
        </button>
        <button className="bg-red-700 p-3  rounded-lg  text-white">
          CONTINUE WITH GOOGLE
        </button>
      </form>
      <div className="flex gap-2 mt-5 ">
        <p>Don't Have an account ?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
      {error && <p className= 'text-red-800  mt-3 text-base font-medium'>{error}</p>}
    </div>
  );
}

export default SignIn;
