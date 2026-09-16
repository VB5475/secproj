import {
  LayoutDashboard,
  BarChart3,
  ShoppingCart,
  Package,
  Wrench,
  Database,
  Settings,
  Users,
  Shield,
  Building2,
  MapPin,
  Truck,
  FileText,
  Receipt,
  PackageCheck,
  Gauge,
  MessageSquareWarning,
  ClipboardList,
  Landmark,
  TrendingDown,
  Upload,
  FileSpreadsheet,
} from "lucide-react";

/** Dummy navigation — mirrors IMS section structure for visual parity. */
export const NAV_SECTIONS = [
  {
    label: "Home",
    icon: LayoutDashboard,
    items: [
      { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard", end: true },
      { to: "/dashboard/analytics", icon: BarChart3, label: "Analytics Overview", end: false },
    ],
  },
  {
    label: "Purchase",
    icon: ShoppingCart,
    items: [
      { to: "/dashboard/purchase-indent", icon: ClipboardList, label: "Purchase Indent", end: false },
      { to: "/dashboard/purchase-order", icon: ShoppingCart, label: "Purchase Order", end: false },
      { to: "/dashboard/goods-received", icon: PackageCheck, label: "Goods Received Note", end: false },
      { to: "/dashboard/purchase-voucher", icon: Receipt, label: "Purchase Voucher", end: false },
    ],
  },
  {
    label: "Finance",
    icon: Landmark,
    items: [
      { to: "/dashboard/depreciation", icon: TrendingDown, label: "Depreciation", end: false },
      { to: "/dashboard/far", icon: Landmark, label: "Fixed Asset Register", end: false },
    ],
  },
  {
    label: "Assets",
    icon: Package,
    items: [
      { to: "/dashboard/asset-issue", icon: Package, label: "Asset Issue", end: false },
      { to: "/dashboard/asset-return", icon: Package, label: "Asset Return", end: false },
      { to: "/dashboard/gate-pass", icon: FileText, label: "Gate Pass", end: false },
    ],
  },
  {
    label: "Maintenance",
    icon: Wrench,
    items: [
      { to: "/dashboard/maintenance", icon: Gauge, label: "Maintenance Dashboard", end: false },
      { to: "/dashboard/complaints", icon: MessageSquareWarning, label: "Complaint Register", end: false },
    ],
  },
  {
    label: "Master",
    icon: Database,
    items: [
      { to: "/dashboard/location", icon: MapPin, label: "Location Master", end: false },
      { to: "/dashboard/department", icon: Building2, label: "Department Master", end: false },
      { to: "/dashboard/supplier", icon: Truck, label: "Supplier Master", end: false },
      { to: "/dashboard/item", icon: Package, label: "Item Master", end: false },
    ],
  },
  {
    label: "Admin",
    icon: Settings,
    items: [
      { to: "/dashboard/users", icon: Users, label: "User Master", end: false },
      { to: "/dashboard/groups", icon: Shield, label: "User Group", end: false },
    ],
  },
  {
    label: "Utility",
    icon: Upload,
    items: [
      { to: "/dashboard/upload", icon: Upload, label: "Excel Upload", end: false },
      { to: "/dashboard/export", icon: FileSpreadsheet, label: "Data Export", end: false },
    ],
  },
];

export const DUMMY_STATS = [
  { label: "Active Assets", value: "2,847", tone: "primary" },
  { label: "Open POs", value: "34", tone: "accent" },
  { label: "Pending GRNs", value: "12", tone: "warning" },
  { label: "Maintenance Calls", value: "8", tone: "success" },
];

export const DUMMY_ACTIVITY = [
  { id: 1, action: "Purchase Order approved", module: "Purchase", time: "10 min ago" },
  { id: 2, action: "Asset issued to Warehouse B", module: "Assets", time: "25 min ago" },
  { id: 3, action: "Complaint #1042 registered", module: "Maintenance", time: "1 hr ago" },
  { id: 4, action: "Supplier Master updated", module: "Master", time: "2 hr ago" },
  { id: 5, action: "GRN posted for PO-8821", module: "Purchase", time: "3 hr ago" },
];
