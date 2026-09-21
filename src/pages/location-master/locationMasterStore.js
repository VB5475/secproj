import { STORAGE_KEY, SEED_RECORDS } from "./constants";

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function writeAll(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function ensureSeeded() {
  let records = readAll();
  if (!records) {
    records = SEED_RECORDS.map((r) => ({ ...r, updatedAt: Date.now() }));
    writeAll(records);
  }
  return records;
}

function newId() {
  return `loc-${crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`}`;
}

export function listLocations() {
  return [...ensureSeeded()].sort((a, b) =>
    String(a.locationCode).localeCompare(String(b.locationCode))
  );
}

export function getLocationById(id) {
  return ensureSeeded().find((r) => r.id === id) ?? null;
}

export function createLocation(payload) {
  const records = ensureSeeded();
  const now = Date.now();
  const record = {
    id: newId(),
    locationCode: payload.locationCode?.trim() ?? "",
    locationName: payload.locationName?.trim() ?? "",
    locationType: payload.locationType ?? "office",
    address: payload.address?.trim() ?? "",
    city: payload.city?.trim() ?? "",
    state: payload.state?.trim() ?? "",
    country: payload.country?.trim() ?? "",
    zipCode: payload.zipCode?.trim() ?? "",
    active: Boolean(payload.active),
    updatedAt: now,
  };
  records.push(record);
  writeAll(records);
  return record;
}

export function updateLocation(id, payload) {
  const records = ensureSeeded();
  const index = records.findIndex((r) => r.id === id);
  if (index === -1) return null;
  const updated = {
    ...records[index],
    locationCode: payload.locationCode?.trim() ?? "",
    locationName: payload.locationName?.trim() ?? "",
    locationType: payload.locationType ?? "office",
    address: payload.address?.trim() ?? "",
    city: payload.city?.trim() ?? "",
    state: payload.state?.trim() ?? "",
    country: payload.country?.trim() ?? "",
    zipCode: payload.zipCode?.trim() ?? "",
    active: Boolean(payload.active),
    updatedAt: Date.now(),
  };
  records[index] = updated;
  writeAll(records);
  return updated;
}

export function deleteLocation(id) {
  const records = ensureSeeded();
  const next = records.filter((r) => r.id !== id);
  if (next.length === records.length) return false;
  writeAll(next);
  return true;
}

export function validateLocationPayload(payload, { excludeId } = {}) {
  const errors = {};
  const code = payload.locationCode?.trim() ?? "";
  const name = payload.locationName?.trim() ?? "";

  if (!code) errors.locationCode = "Location code is required.";
  if (!name) errors.locationName = "Location name is required.";
  if (!payload.locationType) errors.locationType = "Location type is required.";

  const all = listLocations();
  const codeTaken = all.some(
    (r) => r.locationCode.toLowerCase() === code.toLowerCase() && r.id !== excludeId
  );
  if (code && codeTaken) errors.locationCode = "This location code already exists.";

  return errors;
}
