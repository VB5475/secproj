import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, UserCircle, ArrowLeft, Smartphone } from "lucide-react";
import "./LoginShared.css";
import "./ConsumerLoginPage.css";

export default function ConsumerLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState("email");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="consumer-login">
      <div className="consumer-login__canvas">
        <div className="consumer-login__orb consumer-login__orb--1" aria-hidden="true" />
        <div className="consumer-login__orb consumer-login__orb--2" aria-hidden="true" />
      </div>

      <div className="consumer-login__wrap">
        <Link to="/" className="consumer-login__back">
          <ArrowLeft size={14} />
          Back to home
        </Link>

        <div className="consumer-login__card">
          <div className="consumer-login__avatar-ring">
            <UserCircle size={40} strokeWidth={1.25} />
          </div>

          <div className="consumer-login__header">
            <h1>Welcome back</h1>
            <p>Sign in to track requests, view status, and manage your profile.</p>
          </div>

          <div className="consumer-login__tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={mode === "email"}
              className={`consumer-login__tab ${mode === "email" ? "consumer-login__tab--active" : ""}`}
              onClick={() => setMode("email")}
            >
              Email
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "mobile"}
              className={`consumer-login__tab ${mode === "mobile" ? "consumer-login__tab--active" : ""}`}
              onClick={() => setMode("mobile")}
            >
              <Smartphone size={13} />
              Mobile
            </button>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form__fields">
              {mode === "email" ? (
                <div className="login-field">
                  <label htmlFor="consumer-email">Email address</label>
                  <input
                    id="consumer-email"
                    className="login-field__control consumer-login__input"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>
              ) : (
                <div className="login-field">
                  <label htmlFor="consumer-mobile">Mobile number</label>
                  <input
                    id="consumer-mobile"
                    className="login-field__control consumer-login__input"
                    type="tel"
                    placeholder="+91 00000 00000"
                  />
                </div>
              )}
              <div className="login-field">
                <label htmlFor="consumer-password">Password</label>
                <div className="login-field__password">
                  <input
                    id="consumer-password"
                    className="login-field__control consumer-login__input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
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
            </div>

            <div className="consumer-login__extras">
              <label className="consumer-login__remember">
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#forgot" className="consumer-login__forgot">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="login-submit consumer-login__submit">
              <LogIn size={15} />
              Continue
            </button>
          </form>

          <p className="consumer-login__signup">
            New here? <a href="#signup">Create an account</a>
          </p>
        </div>
      </div>
    </div>
  );
}
