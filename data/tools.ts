import type { ToolGroup } from "@/types";

export const TOOL_GROUPS: ToolGroup[] = [
  {
    title: "AI & Agents",
    tools: [
      "LangGraph",
      "Claude Agent SDK",
      "Claude API",
      "LangChain",
      "Google Gemini",
      "OpenAI embeddings",
      "Chroma",
      "RAG",
      "n8n",
      "Firecrawl",
      "Apify",
    ],
  },
  { title: "Languages", tools: ["TypeScript", "JavaScript", "Python", "SQL", "Java"] },
  { title: "Frontend", tools: ["React", "Next.js", "Tailwind CSS", "Vite", "Material UI", "Streamlit"] },
  {
    title: "Backend",
    tools: ["Node.js", "NestJS", "FastAPI", "Django + DRF", "Flask", "REST APIs", "JWT / RBAC"],
  },
  { title: "Data", tools: ["PostgreSQL", "Supabase", "Prisma", "Redis", "SQLite", "MySQL"] },
  { title: "ML", tools: ["TensorFlow", "Keras", "OpenCV", "Pandas", "NumPy"] },
  { title: "Cloud & DevOps", tools: ["AWS", "Docker", "GitHub Actions", "Vercel", "Render", "Azure", "Git"] },
];

/** The everyday tools — rendered with stronger styling than the long tail. */
export const CORE_TOOLS = new Set([
  "TypeScript",
  "Python",
  "React",
  "Next.js",
  "Node.js",
  "FastAPI",
  "Django + DRF",
  "REST APIs",
  "PostgreSQL",
  "Supabase",
  "LangGraph",
  "Claude API",
]);
