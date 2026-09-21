/** Session key pattern: `{FORM_NAME}_EDIT` → record id (string). */

export function editSessionKey(formName) {
  return `${formName}_EDIT`;
}

export function setEditRecordId(formName, id) {
  sessionStorage.setItem(editSessionKey(formName), String(id));
}

export function getEditRecordId(formName) {
  return sessionStorage.getItem(editSessionKey(formName));
}

export function clearEditRecordId(formName) {
  sessionStorage.removeItem(editSessionKey(formName));
}

/**
 * Session storage is scoped to the tab and is cleared when the tab/window is
 * closed. Clear the edit key explicitly when leaving the edit flow (save,
 * cancel, or returning to the list) via clearEditRecordId().
 */
