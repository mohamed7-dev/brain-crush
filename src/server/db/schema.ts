import { relations, sql } from "drizzle-orm";
import {
  boolean,
  decimal,
  index,
  integer,
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
};

export const assetTypeEnum = pgEnum("asset_type", ["Image", "Video", "Binary"]);

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
    creatorId: text("creator_id").notNull(),
    description: text("description"),
    coverId: uuid("cover_id").references(() => assetsTable.id, {
      onDelete: "set null",
    }),
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

export type SelectCourse = typeof coursesTable.$inferSelect;

export const attachmentsTable = pgTable(
  "attachments",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    assetId: uuid("asset_id")
      .references(() => assetsTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    courseId: uuid("course_id")
      .references(() => coursesTable.id, { onDelete: "cascade" })
      .notNull(),
    ...timestamps,
  },
  (t) => [index().on(t.courseId), index().on(t.assetId)]
);

export const chaptersTable = pgTable(
  "chapters",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    title: text("title").notNull(),
    description: text("description"),
    position: integer("position").notNull(),
    isPublished: boolean("is_published").notNull().default(false),
    isFree: boolean("is_free").notNull().default(false),
    videoId: uuid("video_id").references(() => assetsTable.id, {
      onDelete: "set null",
    }),
    courseId: uuid("course_id")
      .references(() => coursesTable.id, { onDelete: "cascade" })
      .notNull(),
    ...timestamps,
  },
  (t) => [index().on(t.courseId)]
);

export const assetsTable = pgTable("assets", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  assetType: assetTypeEnum("asset_type").notNull(),
  publicId: text("public_id").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  format: text("format").default("raw").notNull(),
  version: text("version").notNull(),
  secureURL: text("secure_url").notNull(),
  bytes: integer("bytes"),
  duration: decimal("duration", { precision: 2 }),
  width: integer("width"),
  height: integer("height"),
  ...timestamps,
});

export const userProgressTable = pgTable(
  "user_progress",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    isCompleted: boolean("is_completed").notNull().default(false),
    userId: text("user_id").notNull(),
    chapterId: uuid("chapter_id")
      .references(() => chaptersTable.id, { onDelete: "cascade" })
      .notNull(),
    ...timestamps,
  },
  (t) => [index().on(t.chapterId), unique().on(t.userId, t.chapterId)]
);

export const purchasesTable = pgTable(
  "purchases",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    userId: text("user_id").notNull(),
    courseId: uuid("course_id")
      .references(() => coursesTable.id, { onDelete: "cascade" })
      .notNull(),
    ...timestamps,
  },
  (t) => [index().on(t.courseId), unique().on(t.userId, t.courseId)]
);

export const stripeCustomersTable = pgTable("stripe_customers", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  userId: text("user_id").notNull().unique(),
  stripeCustomerId: text("stripe_customer_id").notNull().unique(),
  ...timestamps,
});

// RELATIONS
export const coursesRelations = relations(coursesTable, ({ many, one }) => ({
  attachments: many(attachmentsTable),
  chapters: many(chaptersTable),
  purchases: many(purchasesTable),
  cover: one(assetsTable, {
    fields: [coursesTable.coverId],
    references: [assetsTable.id],
  }),
  category: one(categoriesTable, {
    fields: [coursesTable.categoryId],
    references: [categoriesTable.id],
  }),
}));

export const attachmentsRelations = relations(attachmentsTable, ({ one }) => ({
  course: one(coursesTable, {
    fields: [attachmentsTable.courseId],
    references: [coursesTable.id],
  }),
  asset: one(assetsTable, {
    fields: [attachmentsTable.assetId],
    references: [assetsTable.id],
  }),
}));

export const chaptersRelations = relations(chaptersTable, ({ one, many }) => ({
  course: one(coursesTable, {
    fields: [chaptersTable.courseId],
    references: [coursesTable.id],
  }),
  video: one(assetsTable, {
    fields: [chaptersTable.videoId],
    references: [assetsTable.id],
  }),
  progresses: many(userProgressTable),
}));

export const assetsRelations = relations(assetsTable, ({ one }) => ({
  course: one(coursesTable),
  chapter: one(chaptersTable),
  attachment: one(attachmentsTable),
}));

export const categoriesRelations = relations(categoriesTable, ({ many }) => ({
  courses: many(coursesTable),
}));

export const purchasesRelations = relations(purchasesTable, ({ one }) => ({
  course: one(coursesTable, {
    fields: [purchasesTable.courseId],
    references: [coursesTable.id],
  }),
}));

export const userProgressRelations = relations(
  userProgressTable,
  ({ one }) => ({
    chapter: one(chaptersTable, {
      fields: [userProgressTable.chapterId],
      references: [chaptersTable.id],
    }),
  })
);
