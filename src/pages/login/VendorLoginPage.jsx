import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, Truck, Package, ArrowLeft } from "lucide-react";
import "./LoginShared.css";
import "./VendorLoginPage.css";

export default function VendorLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="vendor-login">
      <div className="vendor-login__brand-panel">
        <Link to="/" className="vendor-login__back">
          <ArrowLeft size={14} />
          Back
        </Link>

        <div className="vendor-login__brand-content">
          <div className="vendor-login__icon-stack">
            <Truck size={32} strokeWidth={1.5} />
            <Package size={20} strokeWidth={1.5} className="vendor-login__icon-accent" />
          </div>
          <h1>Vendor Gateway</h1>
          <p>
            Manage purchase orders, delivery schedules, and invoice submissions from one
            unified supplier workspace.
          </p>
          <ul className="vendor-login__features">
            <li>Track open POs and delivery status</li>
            <li>Submit invoices and GRN documents</li>
            <li>View payment and contract terms</li>
          </ul>
        </div>

        <div className="vendor-login__stripe" aria-hidden="true" />
      </div>

      <div className="vendor-login__form-panel">
        <div className="vendor-login__form-inner">
          <div className="vendor-login__form-header">
            <span className="vendor-login__badge">Supplier Access</span>
            <h2>Vendor Sign In</h2>
            <p>Use your vendor code and registered email to continue.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form__fields">
              <div className="login-field">
                <label htmlFor="vendor-code">Vendor Code</label>
                <input
                  id="vendor-code"
                  className="login-field__control"
                  type="text"
                  placeholder="VND-0000"
                />
              </div>
              <div className="login-field">
                <label htmlFor="vendor-email">Registered Email</label>
                <input
                  id="vendor-email"
                  className="login-field__control"
                  type="email"
                  placeholder="vendor@company.com"
                />
              </div>
              <div className="login-field">
                <label htmlFor="vendor-password">Password</label>
                <div className="login-field__password">
                  <input
                    id="vendor-password"
                    className="login-field__control"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
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

            <button type="submit" className="login-submit vendor-login__submit">
              <LogIn size={15} />
              Access Vendor Portal
            </button>
          </form>

          <p className="vendor-login__help">
            Need access? Contact your procurement administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
