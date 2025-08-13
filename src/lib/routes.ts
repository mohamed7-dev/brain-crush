const APP_BASE_URL =
  process.env.NEXT_PUBLIC_APP_BASE_URL || "http://localhost:3000";

export const routes = {
  dashboard: "/dashboard",
  home: "/",
  search: "/search",
  teacher: "/teacher",
  teacherCourses: "/teacher/courses",
  teacherCourse: (id: string) => `/teacher/courses/${id}`,
  teacherCourseChapter: (courseId: string, chapterId: string) =>
    `/teacher/courses/${courseId}/chapters/${chapterId}`,
  teacherCreateCourse: "/teacher/create",
  teacherAnalytics: "/teacher/analytics",
  course: (id: string) => `/courses/${id}`,
  courseChapter: (id: string, courseId: string) =>
    `/courses/${courseId}/chapters/${id}`,
  signIn: "/sign-in",
  signUp: "/sign-up",
  stripeSuccess: (courseId: string) =>
    `${APP_BASE_URL}/courses/${courseId}?success=1`,
  stripeError: (courseId: string) =>
    `${APP_BASE_URL}/courses/${courseId}?canceled=1`,
};

export const APIRoutes = {
  getCategories: (searchParams?: string) =>
    `${APP_BASE_URL}/api/categories${searchParams ? "?" + searchParams : ""}`,
  getCourses: (searchParams?: string) =>
    `${APP_BASE_URL}/api/courses${searchParams ? "?" + searchParams : ""}`,
  browseCourses: (searchParams?: string) =>
    `${APP_BASE_URL}/api/courses/browse${
      searchParams ? "?" + searchParams : ""
    }`,
  getStudentPurchasedCourses: (searchParams?: string) =>
    `${APP_BASE_URL}/api/courses/student${
      searchParams ? "?" + searchParams : ""
    }`,
};
