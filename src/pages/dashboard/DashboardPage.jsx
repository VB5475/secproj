import { DUMMY_STATS, DUMMY_ACTIVITY } from "../../data/navConfig";
import "./DashboardPage.css";

export default function DashboardPage() {
  return (
    <div className="dash-page">
      <div className="dash-page__stats">
        {DUMMY_STATS.map(({ label, value, tone }) => (
          <div key={label} className={`dash-stat dash-stat--${tone}`}>
            <span className="dash-stat__label">{label}</span>
            <span className="dash-stat__value">{value}</span>
          </div>
        ))}
      </div>

      <div className="dash-page__grid">
        <section className="dash-panel">
          <header className="dash-panel__header">
            <h2>Recent Activity</h2>
            <span className="dash-panel__badge">Dummy data</span>
          </header>
          <ul className="dash-activity">
            {DUMMY_ACTIVITY.map((item) => (
              <li key={item.id} className="dash-activity__item">
                <div className="dash-activity__main">
                  <span className="dash-activity__action">{item.action}</span>
                  <span className="dash-activity__module">{item.module}</span>
                </div>
                <span className="dash-activity__time">{item.time}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="dash-panel dash-panel--readonly">
          <header className="dash-panel__header">
            <h2>Quick Overview</h2>
          </header>
          <div className="dash-overview">
            <div className="dash-overview__row">
              <span>Financial Year</span>
              <strong>2025-26</strong>
            </div>
            <div className="dash-overview__row">
              <span>Active Division</span>
              <strong>Head Office</strong>
            </div>
            <div className="dash-overview__row">
              <span>Last Sync</span>
              <strong>Today, 09:42 AM</strong>
            </div>
            <div className="dash-overview__row">
              <span>Environment</span>
              <strong>Demo Mode</strong>
            </div>
          </div>
          <p className="dash-panel__hint">
            Navigate using the sidebar — all modules use dummy data for layout preview.
          </p>
        </section>
      </div>
    </div>
  );
}
