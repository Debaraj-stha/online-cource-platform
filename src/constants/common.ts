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
    roles: ["student", "instructor", "admin"],
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
    label: "Sign Up",
    path: "auth/signup",
    roles: ["guest"],
  },
  {
    label: "Logout",
    path: "/logout",
    roles: ["student", "instructor", "admin"],
  },
  {
    label: "Support",
    path: "/support",
    roles: ["guest", "student", "instructor", "admin"],
  },
  {
    label: "About",
    path: "/about",
    roles: ["guest", "student", "instructor", "admin"],
  },
  {
    label: "Contact",
    path: "/contact",
    roles: ["guest", "student", "instructor", "admin"],
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