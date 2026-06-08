import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import { responses } from "./db/schema";
import { desc } from "drizzle-orm";

// Initialize SQLite DB
const sqlite = new Database("data.db", { create: true });
const db = drizzle(sqlite);

const app = new Elysia()
  .use(cors())
  .get("/", () => "AI Diagnostic V3 API is running")
  
  .post("/api/submit", async ({ body }) => {
    const { name, phone, company, role, answers } = body as any;
    
    // Thuật toán chấm điểm theo A(1), B(2), C(3), D(4)
    // Giả lập logic chấm điểm dựa trên số lượng câu trả lời
    const scores = {
      p1: Math.floor(Math.random() * 4) + 1,
      p2: Math.floor(Math.random() * 4) + 1,
      p3: Math.floor(Math.random() * 4) + 1,
      p4: Math.floor(Math.random() * 4) + 1,
      p5: Math.floor(Math.random() * 4) + 1,
      p6: Math.floor(Math.random() * 4) + 1,
    };
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const stage = total > 18 ? "Advanced" : total > 12 ? "Intermediate" : "Beginner";

    const result = await db.insert(responses).values({
      name,
      phone,
      company,
      role,
      answers: answers,
      scores: scores,
      total,
      stage,
      createdAt: new Date().toISOString()
    }).returning();

    return { success: true, data: result[0] };
  })

  .get("/api/admin/responses", async ({ headers, set }) => {
    // Simple Hardcode Auth
    if (headers["authorization"] !== "Bearer VIBE_CODING_2026") {
      set.status = 401;
      return { success: false, message: "Unauthorized" };
    }
    const allResponses = await db.select().from(responses).orderBy(desc(responses.id));
    return { success: true, data: allResponses };
  })

  .listen(process.env.PORT || 3001);

console.log(
  `🦊 API is running at ${app.server?.hostname}:${app.server?.port}`
);
