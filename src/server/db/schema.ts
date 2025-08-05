import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  pgTable,
  real,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
};

export const categoriesTable = pgTable(
  "categories",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    name: text("name").notNull(),
    ...timestamps,
  },
  (t) => [uniqueIndex().on(t.name)]
);

export const coursesTable = pgTable(
  "courses",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    title: text("title").notNull(),
    description: text("description"),
    imageUrl: text("image_url"),
    price: real("price"),
    isPublished: boolean("is_published").notNull().default(false),
    categoryId: uuid("category_id").references(() => categoriesTable.id, {
      onDelete: "restrict",
    }),
    ...timestamps,
  },
  (table) => [
    index().on(table.categoryId),
    index("title_search_index").using(
      "gin",
      sql`to_tsvector('english', ${table.title})`
    ),
  ]
);

export const attachmentsTable = pgTable(
  "attachments",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    name: text("name").notNull(),
    courseId: uuid("course_id")
      .references(() => coursesTable.id, { onDelete: "cascade" })
      .notNull(),
    ...timestamps,
  },
  (t) => [index().on(t.courseId)]
);
