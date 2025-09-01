import {
  FaTachometerAlt,
  FaUser,
  FaBook,
  FaPlus,
  FaWallet,
  FaUsers,
  FaLayerGroup,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

export interface SidebarLink {
  label: string;
  path: string;
  icon: React.ComponentType;
  role: ("admin" | "instructor")[];
}

export const sidebarNavLinks: SidebarLink[] = [
  // ------- Common Links -------
  {
    label: "Dashboard",
    path: "/admin/dashboard", // admin version
    icon: FaTachometerAlt,
    role: ["admin"],
  },
  {
    label: "Dashboard",
    path: "/instructor/dashboard", // instructor version
    icon: FaTachometerAlt,
    role: ["instructor"],
  },
  {
    label: "Profile",
    path: "/profile", // same for both
    icon: FaUser,
    role: ["admin", "instructor"],
  },
    {
    label: "Site Settings",
    path: "/admin/settings",
    icon: FaCog,
    role: ["admin"],
  },
    {
    label: "Site Settings",
    path: "/instructor/settings",
    icon: FaCog,
    role: ["instructor"]
  },

  // ------- Instructor Links -------
  {
    label: "My Courses",
    path: "/instructor/courses",
    icon: FaBook,
    role: ["instructor"],
  },
  {
    label: "Create Course",
    path: "/instructor/create-course",
    icon: FaPlus,
    role: ["instructor"],
  },
  {
    label: "Earnings",
    path: "/instructor/earnings",
    icon: FaWallet,
    role: ["instructor"],
  },

  // ------- Admin Links -------
  {
    label: "Manage Users",
    path: "/admin/users",
    icon: FaUsers,
    role: ["admin"],
  },
  {
    label: "Manage Courses",
    path: "/admin/courses",
    icon: FaLayerGroup,
    role: ["admin"],
  },
  {
    label: "Reports",
    path: "/admin/reports",
    icon: FaChartBar,
    role: ["admin"],
  },
  {
    label: "Site Settings",
    path: "/admin/settings",
    icon: FaCog,
    role: ["admin"],
  },
];
