import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  PanelLeftClose,
  PanelLeft,
  Search,
  X,
  ChevronDown,
  ChevronRight,
  Menu,
  LogOut,
  Clock,
} from "lucide-react";
import { NAV_SECTIONS } from "../data/navConfig";
import "./AppShell.css";

function isNavItemActive(pathname, to, end) {
  if (end) return pathname === to;
  return pathname === to || pathname.startsWith(`${to}/`);
}

function findSectionForPath(pathname) {
  const match = NAV_SECTIONS.find((section) =>
    section.items.some(({ to, end }) => isNavItemActive(pathname, to, end))
  );
  return match?.label ?? NAV_SECTIONS[0]?.label ?? null;
}

function renderNavItem(item, { onNavigate } = {}) {
  const { to, icon: Icon, label, end } = item;
  return (
    <NavLink
      key={to}
      to={to}
      end={end}
      className={({ isActive }) =>
        `ent-sidebar__link ${isActive ? "ent-sidebar__link--active" : ""}`
      }
      onClick={onNavigate}
    >
      <span className="ent-sidebar__link-icon">
        <Icon size={16} strokeWidth={1.5} />
      </span>
      <span>{label}</span>
    </NavLink>
  );
}

function renderSectionItems(items, renderOpts) {
  return items.map((item, index) => {
    const rendered = renderNavItem(item, renderOpts);
    const isLast = index === items.length - 1;
    if (isLast) return rendered;
    return (
      <div key={`${item.to}-group`}>
        {rendered}
        <div className="ent-sidebar__divider" role="separator" />
      </div>
    );
  });
}

export default function AppShell({ children, title = "Dashboard", subtitle }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [navSearch, setNavSearch] = useState("");
  const location = useLocation();
  const [openSection, setOpenSection] = useState(() => findSectionForPath(location.pathname));
  const [flyout, setFlyout] = useState(null);
  const flyoutCloseTimer = useRef(null);
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      if (!prev) setNavSearch("");
      return !prev;
    });
  };

  const isSearching = navSearch.trim().length > 0;

  const filteredNavSections = useMemo(() => {
    const query = navSearch.trim().toLowerCase();
    if (!query) return NAV_SECTIONS;
    return NAV_SECTIONS.map((section) => ({
      ...section,
      items: section.items.filter((item) => item.label.toLowerCase().includes(query)),
    })).filter((section) => section.items.length > 0);
  }, [navSearch]);

  const cancelFlyoutClose = () => {
    if (flyoutCloseTimer.current) {
      clearTimeout(flyoutCloseTimer.current);
      flyoutCloseTimer.current = null;
    }
  };

  const scheduleFlyoutClose = () => {
    cancelFlyoutClose();
    flyoutCloseTimer.current = setTimeout(() => setFlyout(null), 150);
  };

  const openFlyout = (section, targetEl) => {
    cancelFlyoutClose();
    const rect = targetEl.getBoundingClientRect();
    const viewportMargin = 12;
    const maxHeight = Math.max(120, window.innerHeight - rect.top - viewportMargin);
    setFlyout({
      label: section.label,
      items: section.items,
      style: {
        position: "fixed",
        top: `${rect.top}px`,
        left: `${rect.right + 8}px`,
        maxHeight: `${maxHeight}px`,
        overflowY: "auto",
        zIndex: 2147483647,
      },
    });
  };

  useEffect(() => {
    if (!collapsed) setFlyout(null);
  }, [collapsed]);

  useEffect(() => {
    setFlyout(null);
    setMobileNavOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    setOpenSection(findSectionForPath(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMobileNavOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileNavOpen]);

  const handleOpenMobileNav = () => {
    setCollapsed(false);
    setMobileNavOpen(true);
  };

  return (
    <div
      className={`ent-shell ${collapsed ? "ent-shell--collapsed" : ""} ${mobileNavOpen ? "ent-shell--mobile-nav-open" : ""}`}
    >
      {mobileNavOpen && (
        <div
          className="ent-mobile-backdrop"
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className="ent-sidebar">
        <div className="ent-sidebar__header">
          <button
            type="button"
            className="ent-sidebar__brand"
            onClick={() => navigate("/dashboard")}
            title="Go to Dashboard"
          >
            <div className="ent-sidebar__logo">
              <span className="ent-sidebar__logo-mark">NP</span>
            </div>
            {!collapsed && <div className="ent-sidebar__name">NewProj</div>}
          </button>
          <button
            type="button"
            className="ent-sidebar__collapse"
            onClick={toggleCollapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeft size={14} /> : <PanelLeftClose size={14} />}
          </button>
          <button
            type="button"
            className="ent-sidebar__mobile-close"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close navigation"
          >
            <PanelLeftClose size={14} />
          </button>
        </div>

        {!collapsed && (
          <div className="ent-sidebar__search">
            <Search size={13} strokeWidth={2} />
            <input
              type="text"
              placeholder="Search navigation…"
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              aria-label="Search navigation"
            />
            {navSearch && (
              <button
                type="button"
                className="ent-sidebar__search-clear"
                onClick={() => setNavSearch("")}
                aria-label="Clear search"
              >
                <X size={12} strokeWidth={2.5} />
              </button>
            )}
          </div>
        )}

        <nav className="ent-sidebar__nav">
          {filteredNavSections.map((section) => {
            const sectionOpen = isSearching || openSection === section.label;
            const sectionActive = section.items.some(({ to, end }) =>
              isNavItemActive(location.pathname, to, end)
            );
            const sectionLabelClass = `ent-sidebar__section-label ${sectionActive ? "ent-sidebar__section-label--active" : ""}`;

            return (
              <div
                key={section.label}
                className="ent-sidebar__section"
                onMouseEnter={collapsed ? (e) => openFlyout(section, e.currentTarget) : undefined}
                onMouseLeave={collapsed ? scheduleFlyoutClose : undefined}
              >
                {!collapsed &&
                  (isSearching ? (
                    <div className={sectionLabelClass}>{section.label}</div>
                  ) : (
                    <button
                      type="button"
                      className="ent-sidebar__section-header"
                      onClick={() =>
                        setOpenSection((prev) => (prev === section.label ? null : section.label))
                      }
                      aria-expanded={sectionOpen}
                    >
                      <span className={sectionLabelClass}>{section.label}</span>
                      {sectionOpen ? (
                        <ChevronDown size={12} strokeWidth={2.5} />
                      ) : (
                        <ChevronRight size={12} strokeWidth={2.5} />
                      )}
                    </button>
                  ))}

                {collapsed ? (
                  <div
                    className={`ent-sidebar__rail-icon ${sectionActive ? "ent-sidebar__rail-icon--active" : ""}`}
                    title={section.label}
                  >
                    <section.icon size={18} strokeWidth={1.75} />
                  </div>
                ) : (
                  sectionOpen && renderSectionItems(section.items)
                )}
              </div>
            );
          })}
          {!collapsed && navSearch && filteredNavSections.length === 0 && (
            <div className="ent-sidebar__search-empty">No matching modules.</div>
          )}
        </nav>

        {collapsed &&
          flyout &&
          createPortal(
            <div
              className="ent-sidebar__flyout"
              style={flyout.style}
              onMouseEnter={cancelFlyoutClose}
              onMouseLeave={scheduleFlyoutClose}
            >
              <div className="ent-sidebar__flyout-label">{flyout.label}</div>
              {renderSectionItems(flyout.items, { onNavigate: () => setFlyout(null) })}
            </div>,
            document.body
          )}

        {!collapsed && (
          <div className="ent-sidebar__footer">
            <span className="ent-sidebar__version">v1.0.0 · Demo</span>
          </div>
        )}
      </aside>

      <div className="ent-main">
        <header className="ent-topbar">
          <div className="ent-topbar__left">
            <button
              type="button"
              className="ent-topbar__hamburger"
              onClick={handleOpenMobileNav}
              aria-label="Open navigation"
            >
              <Menu size={18} strokeWidth={2} />
            </button>
            <div className="ent-topbar__titles">
              <h1 className="ent-topbar__title">{title}</h1>
              {subtitle && <p className="ent-topbar__subtitle">{subtitle}</p>}
            </div>
          </div>
          <div className="ent-topbar__actions">
            <div className="ent-autologout-timer" title="Session timer (demo)">
              <Clock size={13} strokeWidth={2} />
              <span>14:32</span>
            </div>
            <div className="ent-topbar__divider" />
            <div className="ent-topbar__profile-menu">
              <div className="ent-topbar__profile">
                <div className="ent-topbar__profile-text">
                  <span className="ent-topbar__profile-name">Demo User</span>
                  <span className="ent-topbar__profile-role">ADMIN</span>
                </div>
                <div className="ent-topbar__avatar">D</div>
              </div>
              <div className="ent-topbar__profile-dropdown">
                <div className="ent-topbar__profile-dropdown-panel">
                  <button
                    type="button"
                    className="ent-topbar__profile-dropdown-logout"
                    onClick={() => navigate("/")}
                  >
                    <LogOut size={14} strokeWidth={1.75} />
                    Log out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="ent-content">{children}</main>
      </div>
    </div>
  );
}
