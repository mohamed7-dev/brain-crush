import { seedCategoriesService } from "@/features/categories/services/seed-categories.service";

export async function main() {
  return await seedCategoriesService();
}
main()
  .then(() => {
    console.log("Database has been seeded successfully!");
    process.exit(0);
  })
  .catch(() => {
    console.log("Error seeding database", Error);
    process.exit(1);
  });
