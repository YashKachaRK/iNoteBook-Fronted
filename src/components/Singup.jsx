import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";

export default function Signup() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  const [credentials, setCredentials] = useState({
    name: "",
    emailid: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

 const showAlert = (type, message) => {
    setAlert({ type, message }); 

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.cpassword) {
      showAlert("error", "Password Not matched");

      return;
    } else if (credentials.name.trim().length < 5) {
      showAlert("error", "Make Sure length is minimum 5");

      return;
    } else if (!/\S+@\S+\.\S+/.test(credentials.emailid)) {
      showAlert("error", "Please enter a valid email address");

      return;
    } else {
      console.table(credentials);
      const response = await fetch(
        "http://localhost:5000/api/auth/addUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        },
      );
      const json = await response.json();
      if (json.success) {
        showAlert("success", "Account Created Successfully");

        setCredentials({
          name: "",
          emailid: "",
          password: "",
          cpassword: "",
        });

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        showAlert("error", json.error);
      }
    }
  };

  // Signup API Call Here
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 py-8">
      {alert && <Alert type={alert.type} message={alert.message} />}

      <div className="w-full max-w-md bg-zinc-900 p-6 sm:p-8 rounded-2xl shadow-lg border border-zinc-800">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-zinc-300 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={credentials.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 outline-none focus:border-yellow-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-zinc-300 mb-2">Email</label>
            <input
              type="email"
              name="emailid"
              value={credentials.emailid}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 outline-none focus:border-yellow-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-zinc-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 outline-none focus:border-yellow-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-zinc-300 mb-2">Confirm Password</label>
            <input
              type="password"
              name="cpassword"
              value={credentials.cpassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 outline-none focus:border-yellow-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg transition"
          >
            Create Account
          </button>

          <div className="mt-6 text-center">
            <p className="text-zinc-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-yellow-400 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
