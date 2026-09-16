import { Link } from "react-router-dom";
import {
  Shield,
  Truck,
  UserCircle,
  ArrowRight,
  LayoutDashboard,
  Package,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import "./LandingPage.css";

const PORTALS = [
  {
    to: "/login/admin",
    icon: Shield,
    title: "Admin",
    description: "Full system control, user management, and enterprise configuration.",
    accent: "primary",
  },
  {
    to: "/login/vendor",
    icon: Truck,
    title: "Vendor",
    description: "Purchase orders, deliveries, invoices, and supplier workflows.",
    accent: "orange",
  },
  {
    to: "/login/consumer",
    icon: UserCircle,
    title: "Consumer",
    description: "Track requests, view status updates, and manage your profile.",
    accent: "sky",
  },
];

const CAPABILITIES = [
  { icon: LayoutDashboard, label: "Unified dashboard with real-time KPIs" },
  { icon: Package, label: "Asset lifecycle from procurement to disposal" },
  { icon: BarChart3, label: "Reports and analytics across all modules" },
];

export default function LandingPage() {
  return (
    <div className="landing">
      <header className="landing__nav">
        <div className="landing__nav-inner">
          <div className="landing__logo">
            <span className="landing__logo-mark">NP</span>
            <span className="landing__logo-text">NewProj</span>
          </div>
          <nav className="landing__nav-links">
            <a href="#portals">Portals</a>
            <a href="#capabilities">Platform</a>
            <Link to="/dashboard" className="landing__nav-cta">
              View Demo
              <ChevronRight size={14} />
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="landing__hero">
          <div className="landing__hero-bg" aria-hidden="true">
            <div className="landing__hero-shape landing__hero-shape--1" />
            <div className="landing__hero-shape landing__hero-shape--2" />
            <div className="landing__hero-grid" />
          </div>

          <div className="landing__hero-inner">
            <div className="landing__hero-copy">
              <span className="landing__eyebrow">Horizon Enterprise Platform</span>
              <h1>
                Operations
                <span className="landing__hero-accent"> built </span>
                for scale
              </h1>
              <p>
                A modern enterprise workspace derived from IMS — same trusted navy
                palette, same precision tooling, tailored for your next project.
              </p>
              <div className="landing__hero-actions">
                <a href="#portals" className="landing__btn landing__btn--primary">
                  Choose your portal
                  <ArrowRight size={16} />
                </a>
                <Link to="/dashboard" className="landing__btn landing__btn--ghost">
                  Explore dashboard
                </Link>
              </div>
            </div>

            <div className="landing__hero-visual">
              <div className="landing__preview">
                <div className="landing__preview-topbar">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="landing__preview-body">
                  <div className="landing__preview-sidebar" />
                  <div className="landing__preview-content">
                    <div className="landing__preview-stat" />
                    <div className="landing__preview-stat" />
                    <div className="landing__preview-stat landing__preview-stat--wide" />
                    <div className="landing__preview-grid">
                      <div />
                      <div />
                      <div />
                      <div />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="portals" className="landing__portals">
          <div className="landing__section-inner">
            <div className="landing__section-head">
              <h2>Three portals, one platform</h2>
              <p>Each role gets a purpose-built entry point with the same enterprise DNA.</p>
            </div>

            <div className="landing__portal-grid">
              {PORTALS.map(({ to, icon: Icon, title, description, accent }) => (
                <Link
                  key={to}
                  to={to}
                  className={`landing__portal-card landing__portal-card--${accent}`}
                >
                  <div className="landing__portal-icon">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span className="landing__portal-link">
                    Sign in
                    <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="capabilities" className="landing__capabilities">
          <div className="landing__section-inner landing__capabilities-grid">
            <div className="landing__capabilities-copy">
              <h2>Built on IMS foundations</h2>
              <p>
                Every screen inherits the Horizon Enterprise design system — navy sidebar
                navigation, cool-blue data surfaces, and compact 13px enterprise density.
              </p>
            </div>
            <ul className="landing__cap-list">
              {CAPABILITIES.map(({ icon: Icon, label }) => (
                <li key={label}>
                  <Icon size={18} strokeWidth={1.5} />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="landing__footer">
        <span>NewProj · Derived from IMS Horizon Enterprise</span>
        <span>Design tokens preserved · v1.0.0</span>
      </footer>
    </div>
  );
}
