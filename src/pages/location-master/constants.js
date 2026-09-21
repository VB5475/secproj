export const FORM_NAME = "LOCATION_MASTER";

/** localStorage collection key */
export const STORAGE_KEY = "demo_location_master";

export const LIST_PATH = "/dashboard/location";
export const ADD_PATH = "/dashboard/location/add";
export const EDIT_PATH = "/dashboard/location/edit";

export const PAGE_TITLE = "Location Master";
export const PAGE_SUBTITLE = "Demo CRUD — data stored in localStorage";

export const LOCATION_TYPES = [
  { value: "office", label: "Office" },
  { value: "warehouse", label: "Warehouse" },
  { value: "plant", label: "Plant" },
  { value: "store", label: "Store" },
];

export const SEED_RECORDS = [
  {
    id: "loc-seed-1",
    locationCode: "HO-001",
    locationName: "Head Office",
    locationType: "office",
    address: "100 Corporate Park, Block A",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    zipCode: "400001",
    active: true,
  },
  {
    id: "loc-seed-2",
    locationCode: "WH-12",
    locationName: "Central Warehouse",
    locationType: "warehouse",
    address: "Plot 45, MIDC",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    zipCode: "411057",
    active: true,
  },
];
