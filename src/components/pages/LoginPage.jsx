// src/components/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/apiService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async  () => {
    try{
      const payload = {
        login: email,
        password: password
      }
      const res = await api.post("/api/users/login", payload);
      localStorage.setItem("isAuthenticated", true)
      localStorage.setItem("userData", JSON.stringify(res.data.user));
      navigate("/profile-overview");
    }catch(err){
      console.log("Error: ", err.message);
      alert(`Invalid Credentails: ${err.message}`)
    }
    // if (username === "user" && password === "password") {
    //   localStorage.setItem("isAuthenticated", "true");
    //   navigate("/profile-overview");
    // } else {
    //   alert("Invalid credentials!");
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md w-80">
        <h2 className="mb-4 text-2xl font-bold text-center">Login</h2>
        <input
          type="text"
          placeholder="Email"
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
