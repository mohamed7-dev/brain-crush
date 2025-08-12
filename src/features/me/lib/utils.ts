export function checkIsTeacher(userId: string) {
  return userId === process.env.NEXT_PUBLIC_TEACHER_ID;
}
