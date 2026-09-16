import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, Shield, ArrowLeft } from "lucide-react";
import "./LoginShared.css";
import "./AdminLoginPage.css";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="admin-login">
      <div className="admin-login__bg" aria-hidden="true">
        <div className="admin-login__grid" />
        <div className="admin-login__glow admin-login__glow--1" />
        <div className="admin-login__glow admin-login__glow--2" />
      </div>

      <div className="admin-login__panel">
        <Link to="/" className="admin-login__back">
          <ArrowLeft size={14} />
          Back to home
        </Link>

        <div className="admin-login__brand">
          <div className="admin-login__logo">
            <Shield size={24} strokeWidth={1.75} />
          </div>
          <div>
            <h1>Admin Portal</h1>
            <p className="admin-login__tagline">System administration access</p>
          </div>
        </div>

        <div className="admin-login__card">
          <div className="admin-login__card-header">
            <h2>Sign in</h2>
            <p>Enter your administrator credentials to access the control panel.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form__fields">
              <div className="login-field">
                <label htmlFor="admin-id">Admin ID</label>
                <input
                  id="admin-id"
                  className="login-field__control"
                  type="text"
                  placeholder="admin.user"
                  autoComplete="username"
                />
              </div>
              <div className="login-field">
                <label htmlFor="admin-password">Password</label>
                <div className="login-field__password">
                  <input
                    id="admin-password"
                    className="login-field__control"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="login-field__toggle"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="login-field">
                <label htmlFor="admin-division">Division</label>
                <select id="admin-division" className="login-field__control">
                  <option>Head Office</option>
                  <option>North Region</option>
                  <option>South Region</option>
                </select>
              </div>
            </div>

            <button type="submit" className="login-submit admin-login__submit">
              <LogIn size={15} />
              Sign in as Admin
            </button>
          </form>

          <p className="admin-login__notice">
            Restricted access — authorized personnel only
          </p>
        </div>

        <footer className="admin-login__footer">NewProj · Horizon Enterprise</footer>
      </div>
    </div>
  );
}
