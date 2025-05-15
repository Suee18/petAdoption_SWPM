import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Pages.css';
import dogImage from '../assets/images/dog-please-adopt-me-fb.jpg';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Sample user credentials (in a real app, this would be server-side validation)
  const users = {
    // Regular users
    "user1": { password: "password1", role: "user", name: "John Doe" },
    "user2": { password: "password2", role: "user", name: "Jane Smith" },
    // Shelter accounts
    "happypaws": { password: "shelter123", role: "shelter", name: "Happy Paws Shelter" },
    "cairorescue": { password: "cairo456", role: "shelter", name: "Cairo Pet Rescue" }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const user = users[username];
      
      if (!user) {
        setError("Username not found");
        setLoading(false);
        return;
      }
      
      if (user.password !== password) {
        setError("Invalid password");
        setLoading(false);
        return;
      }
      
      // Successfully authenticated
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userName', user.name);
      localStorage.setItem('username', username);
      
      // Call the onLogin handler from props
      onLogin();
      
      // Redirect to appropriate dashboard based on role
      if (user.role === 'shelter') {
        window.location.href = '/shelter-dashboard';
      } else {
        window.location.href = '/profile';
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#8fc4b7" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-8 col-xl-6">
            <div className="card rounded-3">
              {/* Image */}
              <img
                src={dogImage}
                className="w-100"
                style={{
                  borderTopLeftRadius: ".3rem",
                  borderTopRightRadius: ".3rem",
                }}
                alt="Please Adopt Me!"
              />
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Login</h3>

                <form className="px-md-2" onSubmit={handleSubmit}>
                  {/* Username Input */}
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <label className="form-label" htmlFor="username">
                      Username
                    </label>
                  </div>

                  {/* Password Input */}
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-success btn-lg mb-1"
                  >
                    Login
                  </button>
                </form>
                <div className="text-center mt-4">
                  <p className="mb-0">
                    Don't have an account? <Link to="/signup" className="fw-semibold text-decoration-none">Sign up</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
