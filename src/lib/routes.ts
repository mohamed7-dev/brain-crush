export const routes = {
  dashboard: "/dashboard",
  home: "/",
  teacher: "/teacher",
  teacherCourses: "/teacher/courses",
  teacherCourse: (id: string) => `/teacher/courses/${id}`,
  teacherCreateCourse: "/teacher/create",
  teacherAnalytics: "/teacher/analytics",
  signIn: "/sign-in",
  signUp: "/sign-up",
};

const APP_BASE_URL =
  process.env.NEXT_PUBLIC_APP_BASE_URL || "http://localhost:3000";

export const APIRoutes = {
  getCategories: (searchParams?: string) =>
    `${APP_BASE_URL}/api/categories${searchParams ? "?" + searchParams : ""}`,
};
