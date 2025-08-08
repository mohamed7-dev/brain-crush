import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
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
    imageUrl: text("image_url"),
    imageName: text("image_name"),
    imageType: text("image_type"),
    imageSize: real("image_size"),
    imageKey: text("image_key"),
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
    url: text("url").notNull(),
    type: text("type").notNull(),
    size: real("size").notNull(),
    key: text("key").notNull(),
    courseId: uuid("course_id")
      .references(() => coursesTable.id, { onDelete: "cascade" })
      .notNull(),
    ...timestamps,
  },
  (t) => [index().on(t.courseId)]
);

export const chaptersTable = pgTable(
  "chapters",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    title: text("title").notNull(),
    description: text("description"),
    videoUrl: text("video_url"),
    position: integer("position").notNull(),
    isPublished: boolean("is_published").notNull().default(false),
    isFree: boolean("is_free").notNull().default(false),
    courseId: uuid("course_id")
      .references(() => coursesTable.id, { onDelete: "cascade" })
      .notNull(),
    ...timestamps,
  },
  (t) => [index().on(t.courseId)]
);

export const muxDataTable = pgTable(
  "mux_data",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    assetId: text("asset_id").notNull(),
    playbackId: text("playback_id"),
    chapterId: uuid("chapter_id")
      .references(() => chaptersTable.id, { onDelete: "cascade" })
      .notNull(),
    ...timestamps,
  },
  (t) => [index().on(t.chapterId)]
);

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
export const coursesRelations = relations(coursesTable, ({ many }) => ({
  attachments: many(attachmentsTable),
  chapters: many(chaptersTable),
}));

export const attachmentsRelations = relations(attachmentsTable, ({ one }) => ({
  course: one(coursesTable, {
    fields: [attachmentsTable.courseId],
    references: [coursesTable.id],
  }),
}));

export const chaptersRelations = relations(chaptersTable, ({ one }) => ({
  course: one(coursesTable, {
    fields: [chaptersTable.courseId],
    references: [coursesTable.id],
  }),
  muxData: one(muxDataTable),
}));

export const muxDataRelations = relations(muxDataTable, ({ one }) => ({
  course: one(chaptersTable, {
    fields: [muxDataTable.chapterId],
    references: [chaptersTable.id],
  }),
}));
