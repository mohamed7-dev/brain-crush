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
