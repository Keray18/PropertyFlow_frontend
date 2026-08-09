export const PROPERTY_TYPES = [
  "Apartment",
  "Villa",
  "Independent House",
  "Plot / Land",
  "Office Space",
  "Shop",
  "Warehouse",
  "Commercial Building",
] as const;

export const AMENITIES = [
  "Lift",
  "Parking",
  "Power Backup",
  "Swimming Pool",
  "Club House",
  "Gym",
  "Garden",
  "Security",
  "CCTV",
  "Visitor Parking",
  "Pet Friendly",
  "Metro Nearby",
  "School Nearby",
  "Hospital Nearby",
  "Market Nearby",
] as const;

export const PROPERTY_STATUS = [
  "Available",
  "Sold",
  "Rented",
  "Inactive",
] as const;

export const AREA_UNITS = [
  "Sq Ft",
  "Sq Yard (Gaj)",
  "Acre",
  "Bigha",
  "Kanal",
  "Marla",
  "Other",
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
