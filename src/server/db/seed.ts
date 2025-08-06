import { db } from "./index";
import { categoriesTable } from "./schema";

export async function main() {
  try {
    return await db
      .insert(categoriesTable)
      .values([{ name: "Computer Science" }, { name: "Engineering" }])
      .then(() => console.log("Categories have been inserted successfully!"));
  } catch (error) {
    console.log("Error inserting categories", error);
  }
}
main()
  .then(() => console.log("Database has been seeded successfully!"))
  .catch(() => console.log("Error seeding database", Error));
