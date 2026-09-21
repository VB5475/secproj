import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import {
  FORM_NAME,
  LIST_PATH,
  LOCATION_TYPES,
  PAGE_TITLE,
} from "./constants";
import { clearEditRecordId, getEditRecordId } from "../../utils/editSession";
import {
  createLocation,
  getLocationById,
  updateLocation,
  validateLocationPayload,
} from "./locationMasterStore";
import "./LocationMasterPage.css";

const EMPTY = {
  locationCode: "",
  locationName: "",
  locationType: "office",
  address: "",
  city: "",
  state: "",
  country: "India",
  zipCode: "",
  active: true,
};

export default function LocationMasterFormPage({ mode }) {
  const isAdd = mode === "add";
  const navigate = useNavigate();
  const [recordId, setRecordId] = useState(null);
  const [values, setValues] = useState(EMPTY);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loadError, setLoadError] = useState(null);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    if (isAdd) {
      setRecordId(null);
      setValues(EMPTY);
      setLoadError(null);
      return;
    }

    const id = getEditRecordId(FORM_NAME);
    if (!id) {
      navigate(LIST_PATH, { replace: true });
      return;
    }

    const record = getLocationById(id);
    if (!record) {
      clearEditRecordId(FORM_NAME);
      setLoadError("Record not found. It may have been deleted.");
      return;
    }

    setRecordId(id);
    setValues({
      locationCode: record.locationCode ?? "",
      locationName: record.locationName ?? "",
      locationType: record.locationType ?? "office",
      address: record.address ?? "",
      city: record.city ?? "",
      state: record.state ?? "",
      country: record.country ?? "",
      zipCode: record.zipCode ?? "",
      active: Boolean(record.active),
    });
    setLoadError(null);
  }, [isAdd, navigate]);

  const title = useMemo(
    () => (isAdd ? `Add ${PAGE_TITLE}` : `Edit ${PAGE_TITLE}`),
    [isAdd]
  );

  const goList = () => {
    clearEditRecordId(FORM_NAME);
    navigate(LIST_PATH);
  };

  const setField = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaveError(null);
    const errors = validateLocationPayload(values, { excludeId: recordId });
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      if (isAdd) {
        createLocation(values);
      } else if (recordId) {
        updateLocation(recordId, values);
      } else {
        setSaveError("Missing edit context. Open the record from the list again.");
        return;
      }
      goList();
    } catch (err) {
      setSaveError(err?.message || "Failed to save.");
    }
  };

  if (!isAdd && loadError) {
    return (
      <div className="lm-form-page">
        <div className="lm-alert lm-alert--error">{loadError}</div>
        <button type="button" className="lm-btn" onClick={goList}>
          <ArrowLeft size={14} strokeWidth={2} />
          Back to list
        </button>
      </div>
    );
  }

  return (
    <div className="lm-form-page">
      <header className="lm-form-header">
        <div>
          <h2>{title}</h2>
          <p>
            {isAdd
              ? "Create a location — saved to localStorage."
              : "Update location — edit id is kept in sessionStorage, not the URL."}
          </p>
        </div>
        <button type="button" className="lm-btn" onClick={goList}>
          <ArrowLeft size={14} strokeWidth={2} />
          Back to list
        </button>
      </header>

      {saveError && <div className="lm-alert lm-alert--error">{saveError}</div>}

      <form onSubmit={handleSave}>
        <div className="lm-form">
          <Field
            label="Location code"
            required
            error={fieldErrors.locationCode}
          >
            <input
              className={`lm-form-input ${fieldErrors.locationCode ? "lm-form-input--error" : ""}`}
              value={values.locationCode}
              onChange={(e) => setField("locationCode", e.target.value)}
              autoComplete="off"
            />
          </Field>

          <Field label="Location name" required error={fieldErrors.locationName}>
            <input
              className={`lm-form-input ${fieldErrors.locationName ? "lm-form-input--error" : ""}`}
              value={values.locationName}
              onChange={(e) => setField("locationName", e.target.value)}
            />
          </Field>

          <Field label="Location type" required error={fieldErrors.locationType}>
            <select
              className="lm-form-select"
              value={values.locationType}
              onChange={(e) => setField("locationType", e.target.value)}
            >
              {LOCATION_TYPES.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Active">
            <div className="lm-checkbox-row">
              <input
                id="lm-active"
                type="checkbox"
                checked={values.active}
                onChange={(e) => setField("active", e.target.checked)}
              />
              <label htmlFor="lm-active" className="lm-form-label">
                Location is active
              </label>
            </div>
          </Field>

          <Field label="Address" className="lm-form-row--full">
            <input
              className="lm-form-input"
              value={values.address}
              onChange={(e) => setField("address", e.target.value)}
            />
          </Field>

          <Field label="City">
            <input
              className="lm-form-input"
              value={values.city}
              onChange={(e) => setField("city", e.target.value)}
            />
          </Field>

          <Field label="State">
            <input
              className="lm-form-input"
              value={values.state}
              onChange={(e) => setField("state", e.target.value)}
            />
          </Field>

          <Field label="Country">
            <input
              className="lm-form-input"
              value={values.country}
              onChange={(e) => setField("country", e.target.value)}
            />
          </Field>

          <Field label="Zip / PIN">
            <input
              className="lm-form-input"
              value={values.zipCode}
              onChange={(e) => setField("zipCode", e.target.value)}
            />
          </Field>
        </div>

        <footer className="lm-form-footer">
          <button type="submit" className="lm-btn lm-btn--primary">
            <Save size={14} strokeWidth={2} />
            Save
          </button>
          <button type="button" className="lm-btn" onClick={goList}>
            Cancel
          </button>
        </footer>
      </form>
    </div>
  );
}

function Field({ label, required, error, className = "", children }) {
  return (
    <div className={`lm-form-row ${className}`}>
      <span className={`lm-form-label ${required ? "lm-form-label--required" : ""}`}>
        {label}
      </span>
      {children}
      {error && <span className="lm-form-error">{error}</span>}
    </div>
  );
}
