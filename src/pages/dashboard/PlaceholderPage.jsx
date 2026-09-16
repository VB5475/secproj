import { useLocation } from "react-router-dom";
import "./PlaceholderPage.css";

export default function PlaceholderPage() {
  const { pathname } = useLocation();
  const moduleName = pathname.split("/").filter(Boolean).slice(1).join(" / ") || "Module";

  return (
    <div className="placeholder-page">
      <div className="placeholder-page__card">
        <span className="placeholder-page__badge">Preview</span>
        <h2>{moduleName.replace(/-/g, " ")}</h2>
        <p>
          This module page is a placeholder. The sidebar navigation and layout match IMS —
          connect your API and page components here when ready.
        </p>
        <code className="placeholder-page__path">{pathname}</code>
      </div>
    </div>
  );
}
