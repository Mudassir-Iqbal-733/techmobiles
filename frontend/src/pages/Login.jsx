import React, { useEffect, useState } from "react";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/AuthSlice";
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, isLogin } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isLogin) {
      message.success("Login successful!");
      navigate("/");
    }
  }, [isLogin, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 border border-cyan-500 rounded bg-white shadow-lg">
        <h2 className="text-cyan-500 text-center font-semibold text-lg mb-5">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-500 text-white p-2 rounded hover:bg-cyan-600 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-center mt-5"> <span className="text-gray-600">Don't have account?
           <Link className="text-cyan-500 font-semibold" to="/signup">Signup</Link></span></div>
        {error && <p className="text-red-600 mt-3 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
