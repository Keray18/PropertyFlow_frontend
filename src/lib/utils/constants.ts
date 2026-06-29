export const PROPERTY_TYPES = [
  "Apartment",
  "Villa",
  "Independent House",
  "Plot",
  "Commercial",
  "Office Space",
  "Shop",
] as const;

export const BHK_OPTIONS = ["1", "2", "3", "4", "5+"] as const;

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: "Dashboard" },
  { label: "Properties", href: "/properties", icon: "HomeWork" },
  { label: "Leads", href: "/leads", icon: "People" },
  { label: "Settings", href: "/settings", icon: "Settings" },
  { label: "Profile", href: "/profile", icon: "Person" },
  { label: "System Health", href: "/settings/system-health", icon: "MonitorHeart" },
] as const;

export const ENABLED_QUESTION_OPTIONS = [
  { value: "buyRent", label: "Buy or Rent" },
  { value: "propertyType", label: "Property Type" },
  { value: "budget", label: "Budget" },
  { value: "city", label: "City" },
  { value: "locality", label: "Locality" },
  { value: "bhk", label: "BHK" },
  { value: "facing", label: "Facing" },
  { value: "floor", label: "Floor" },
  { value: "builder", label: "Builder" },
  { value: "propertyAge", label: "Property Age" },
  { value: "possessionDate", label: "Possession Date" },
] as const;

export const LEAD_TEMPERATURE_OPTIONS = ["cold", "warm", "hot"] as const;
