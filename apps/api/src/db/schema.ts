import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const responses = sqliteTable("responses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  answers: text("answers", { mode: "json" }).notNull(),
  scores: text("scores", { mode: "json" }).notNull(),
  total: integer("total").notNull(),
  stage: text("stage").notNull(),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});
