export const navLinksNavbar = [
  {
    label: "Home",
    path: "/",
    roles: ["guest", "student", "instructor", "admin"],
  },
  {
    label: "Courses",
    path: "/courses",
    roles: ["guest", "student", "instructor", "admin"],
  },
  {
    label: "My Learning",
    path: "/my-learning",
    roles: ["student"],
  },
  {
    label: "Teach",
    path: "/instructor/dashboard",
    roles: ["instructor"],
  },
];
export const navLinksFooter = [
  {
    label: "Q&A",
    path: "/questions",
    roles: ["student", "instructor"],
  },
  {
    label: "Profile",
    path: "/profile",
    roles: ["student", "instructor"],
  },
  {
    label: "Admin",
    path: "/admin",
    roles: ["admin"],
  },
  {
    label: "Login",
    path: "/auth/login",
    roles: ["guest"],
  },
  {
    label: "Logout",
    path: "/auth/logout",
    roles: ["student", "instructor", "admin"],
  },
  {
    label: "Support",
    path: "/support",
    roles: ["guest", "student", "instructor"],
  },
  {
    label: "About",
    path: "/about",
    roles: ["guest", "student", "instructor"],
  },
  {
    label: "Contact",
    path: "/contact",
    roles: ["guest", "student", "instructor",],
  },
    {
    label: "Cookie Policy",
    path: "/cookie-policy",
    roles: ["guest", "student", "instructor"],
  },
    {
    label: "Terms and Conditions",
    path: "/terms-conditions",
    roles: ["guest", "student", "instructor"],
  },
];

export const SITE_NAME = "Coursely"
export const SUPPORT_EMAIL = "support@newlearning.com"
export const SUPPORT_TEL = "+1 (234) 567-890"
export const SOCIAL_LINK:Record<string,string>={
  "facebook":"https://facebook.com",
  "x":"https://x.com",
  "linkedin":"https://www.linkedin.com/"
}


export const TAX=10