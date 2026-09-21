import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Plus, RefreshCw, Pencil, Trash2, Search } from "lucide-react";
import {
  FORM_NAME,
  ADD_PATH,
  EDIT_PATH,
  PAGE_TITLE,
  LOCATION_TYPES,
} from "./constants";
import { clearEditRecordId, setEditRecordId } from "../../utils/editSession";
import { deleteLocation, listLocations } from "./locationMasterStore";
import "./LocationMasterPage.css";

function typeLabel(value) {
  return LOCATION_TYPES.find((t) => t.value === value)?.label ?? value;
}

export default function LocationMasterListPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(() => {
    setRows(listLocations());
  }, []);

  useEffect(() => {
    clearEditRecordId(FORM_NAME);
    load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [
        r.locationCode,
        r.locationName,
        r.city,
        r.state,
        typeLabel(r.locationType),
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [rows, search]);

  const handleRefresh = () => {
    setRefreshing(true);
    load();
    requestAnimationFrame(() => setRefreshing(false));
  };

  const handleAdd = () => {
    clearEditRecordId(FORM_NAME);
    navigate(ADD_PATH);
  };

  const handleEdit = (row) => {
    setEditRecordId(FORM_NAME, row.id);
    navigate(EDIT_PATH);
  };

  const handleDelete = (row) => {
    const label = row.locationCode || row.locationName || "this location";
    if (!window.confirm(`Delete ${label}? This cannot be undone.`)) return;
    deleteLocation(row.id);
    load();
  };

  return (
    <div className="lm-page">
      <div className="lm-panel">
        <header className="lm-panel__header">
          <div className="lm-panel__title">
            <MapPin size={14} strokeWidth={2} />
            <span>{PAGE_TITLE}</span>
          </div>
          <div className="lm-panel__toolbar">
            <label className="lm-search">
              <Search size={14} strokeWidth={2} aria-hidden />
              <input
                type="search"
                placeholder="Search locations…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search locations"
              />
            </label>
            <button type="button" className="lm-btn" onClick={handleRefresh} disabled={refreshing}>
              <RefreshCw size={14} strokeWidth={2} />
              Refresh
            </button>
            <button type="button" className="lm-btn lm-btn--primary" onClick={handleAdd}>
              <Plus size={14} strokeWidth={2} />
              Add New
            </button>
          </div>
        </header>

        <div className="lm-table-wrap">
          {filtered.length === 0 ? (
            <p className="lm-empty">
              {rows.length === 0
                ? "No locations yet. Click Add New to create one."
                : "No rows match your search."}
            </p>
          ) : (
            <table className="lm-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Status</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id}>
                    <td>{row.locationCode}</td>
                    <td>{row.locationName}</td>
                    <td>{typeLabel(row.locationType)}</td>
                    <td>{row.city}</td>
                    <td>{row.state}</td>
                    <td>
                      <span className={`lm-badge ${row.active ? "lm-badge--on" : "lm-badge--off"}`}>
                        {row.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <div className="lm-actions">
                        <button
                          type="button"
                          className="lm-btn"
                          onClick={() => handleEdit(row)}
                          aria-label={`Edit ${row.locationCode}`}
                        >
                          <Pencil size={13} strokeWidth={2} />
                          Edit
                        </button>
                        <button
                          type="button"
                          className="lm-btn lm-btn--danger"
                          onClick={() => handleDelete(row)}
                          aria-label={`Delete ${row.locationCode}`}
                        >
                          <Trash2 size={13} strokeWidth={2} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
